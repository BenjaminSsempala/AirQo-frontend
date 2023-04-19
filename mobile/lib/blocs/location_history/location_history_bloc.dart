import 'dart:async';

import 'package:app/models/models.dart';
import 'package:app/services/services.dart';
import 'package:equatable/equatable.dart';
import 'package:hydrated_bloc/hydrated_bloc.dart';

part 'location_history_event.dart';

class LocationHistoryBloc
    extends HydratedBloc<LocationHistoryEvent, List<LocationHistory>> {
  LocationHistoryBloc() : super([]) {
    on<SyncLocationHistory>(_onSyncLocationHistory);
    on<AddLocationHistory>(_onAddLocationHistory);
    on<DeleteLocationHistory>(_onDeleteLocationHistory);
  }

  void _onDeleteLocationHistory(
    DeleteLocationHistory _,
    Emitter<List<LocationHistory>> emit,
  ) {
    emit([]);
  }

  Set<LocationHistory> _updateAirQuality(Set<LocationHistory> data) {
    List<AirQualityReading> airQualityReadings =
        HiveService().getAirQualityReadings();

    return Set.of(data).map((place) {
      try {
        AirQualityReading airQualityReading = airQualityReadings
            .firstWhere((element) => element.referenceSite == place.site);

        return place.copyWith(airQualityReading: airQualityReading);
      } catch (e) {
        return place;
      }
    }).toSet();
  }

  Future<void> _onAddLocationHistory(
    AddLocationHistory event,
    Emitter<List<LocationHistory>> emit,
  ) async {
    Set<LocationHistory> locationHistory = state.toSet();
    locationHistory
        .add(LocationHistory.fromAirQualityReading(event.airQualityReading));

    locationHistory = _updateAirQuality(locationHistory);

    emit(locationHistory.toList());

    await CloudStore.updateLocationHistory(locationHistory.toList());
  }

  Future<void> _onSyncLocationHistory(
    SyncLocationHistory _,
    Emitter<List<LocationHistory>> emit,
  ) async {
    List<LocationHistory> cloudLocationHistory =
        await CloudStore.getLocationHistory();

    Set<LocationHistory> locationHistory = state.toSet();
    locationHistory.addAll(cloudLocationHistory);

    locationHistory = _updateAirQuality(locationHistory);

    emit(locationHistory.toList());

    Set<LocationHistory> updatedLocationHistory = {};
    for (final place in locationHistory) {
      final nearestSite = await LocationService.getNearestSite(
        place.latitude,
        place.longitude,
      );

      if (nearestSite != null) {
        updatedLocationHistory
            .add(place.copyWith(site: nearestSite.referenceSite));
      } else {
        updatedLocationHistory.add(place);
      }
    }

    updatedLocationHistory = _updateAirQuality(updatedLocationHistory);

    emit(updatedLocationHistory.toList());
    await CloudStore.updateLocationHistory(updatedLocationHistory.toList());
  }

  @override
  List<LocationHistory>? fromJson(Map<String, dynamic> json) {
    List<LocationHistory> locationHistory =
        LocationHistoryList.fromJson(json).data;
    locationHistory = _updateAirQuality(locationHistory.toSet()).toList();

    return locationHistory;
  }

  @override
  Map<String, dynamic>? toJson(List<LocationHistory> state) {
    return LocationHistoryList(data: state).toJson();
  }
}
