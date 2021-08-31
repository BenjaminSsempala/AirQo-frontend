import 'package:json_annotation/json_annotation.dart';

part 'site.g.dart';

@JsonSerializable()
class Site {
  @JsonKey(required: true, name: '_id')
  final String id;

  @JsonKey(required: true)
  final double latitude;

  @JsonKey(required: true)
  final double longitude;

  @JsonKey(required: true)
  final String district;

  @JsonKey(required: true)
  final String country;

  @JsonKey(required: true)
  final String name;

  @JsonKey(required: false, defaultValue: '')
  final String description;

  @JsonKey(required: false, defaultValue: 0.0)
  final double distance;

  String getName() {
    if (description == '') {
      return name;
    }
    return description;
  }

  String getLocation() {
    if (description == '') {
      return name;
    }
    return '$district $country';
  }

  Site(this.name,
      {required this.id,
      required this.latitude,
      required this.longitude,
      required this.district,
      required this.country,
      required this.description,
      required this.distance});

  factory Site.fromJson(Map<String, dynamic> json) => _$SiteFromJson(json);

  Map<String, dynamic> toJson() => _$SiteToJson(this);

  static String createTableStmt() =>
      'CREATE TABLE IF NOT EXISTS ${sitesDbName()}('
      '${dbId()} TEXT PRIMARY KEY, '
      '${dbCountry()} TEXT, '
      '${dbDistrict()} TEXT, '
      '${dbLongitude()} REAL, '
      '${dbLatitude()} REAL, '
      '${dbDescription()} TEXT, '
      '${dbSiteName()} TEXT )';

  // static String latestMeasurementsTableCreateStmt() =>
  //     'CREATE TABLE IF NOT EXISTS ${latestMeasurementsDb()}('
  //         '${Site.dbId()} TEXT PRIMARY KEY, ${Site.dbLatitude()} REAL, '
  //         '${Site.dbSiteName()} TEXT, ${Site.dbLongitude()} REAL, '
  //         '${dbTime()} TEXT, ${dbPm25()} REAL, ${Site.dbCountry()} TEXT, '
  //         '${dbPm10()} REAL, ${dbAltitude()} REAL, '
  //         '${dbSpeed()} REAL, ${dbTemperature()} REAL, '
  //         '${dbHumidity()} REAL, ${Site.dbDistrict()} TEXT, '
  //         '${Site.dbDescription()} TEXT )';

  static String dbCountry() => 'country';

  static String dbDescription() => 'description';

  static String dbDistance() => 'distance';

  static String dbDistrict() => 'district';

  static String dbId() => 'site_id';

  static String dbLatitude() => 'latitude';

  static String dbLongitude() => 'longitude';

  static String sitesDbName() => 'sites';

  static String dbSiteName() => 'site_name';

  static String dropTableStmt() => 'DROP TABLE IF EXISTS ${sitesDbName()}';

  static Map<String, dynamic> fromDbMap(Map<String, dynamic> json) => {
        'name': json['${dbSiteName()}'] as String,
        'description': json['${dbDescription()}'] as String,
        '_id': json['${dbId()}'] as String,
        'country': json['${dbCountry()}'] as String,
        'district': json['${dbDistrict()}'] as String,
        'latitude': json['${dbLatitude()}'] as double,
        'longitude': json['${dbLongitude()}'] as double,
      };

  static Map<String, dynamic> toDbMap(Site site) => {
        '${dbSiteName()}': site.name,
        '${dbDescription()}': site.description,
        '${dbId()}': site.id,
        '${dbCountry()}': site.country,
        '${dbDistrict()}': site.district,
        '${dbLatitude()}': site.latitude,
        '${dbLongitude()}': site.longitude
      };

  static List<Site> parseSites(dynamic jsonBody) {
    var sites = <Site>[];

    var jsonArray = jsonBody['sites'];
    for (var jsonElement in jsonArray) {
      try {
        var site = Site.fromJson(jsonElement);
        sites.add(site);
      } catch (e) {
        print('Error parsing sites : $e');
      }
    }
    return sites;
  }
}

@JsonSerializable()
class Sites {
  final List<Site> sites;

  Sites({
    required this.sites,
  });

  factory Sites.fromJson(Map<String, dynamic> json) => _$SitesFromJson(json);

  Map<String, dynamic> toJson() => _$SitesToJson(this);
}
