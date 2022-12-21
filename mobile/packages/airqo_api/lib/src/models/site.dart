import 'package:json_annotation/json_annotation.dart';

part 'site.g.dart';

@JsonSerializable()
class Site {
  factory Site.fromJson(Map<String, dynamic> json) => _$SiteFromJson(json);

  const Site({
    required this.id,
    required this.latitude,
    required this.longitude,
    required this.country,
    required this.name,
    required this.locationName,
    required this.searchName,
    required this.description,
    required this.region,
    required this.tenant,
    required this.shareImage,
  });

  @JsonKey(name: '_id')
  final String id;
  final double latitude;
  final double longitude;
  final String country;
  final String name;
  final String description;
  @JsonKey(name: 'search_name', defaultValue: '', required: false)
  final String searchName;
  @JsonKey(name: 'location_name', defaultValue: '', required: false)
  final String locationName;
  final String region;
  @JsonKey(defaultValue: 'AirQo', required: false)
  final String tenant;
  @JsonKey(name: 'share_image', defaultValue: '', required: false)
  final String shareImage;
}
