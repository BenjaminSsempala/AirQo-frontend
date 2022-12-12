import 'package:app/blocs/blocs.dart';
import 'package:app/models/models.dart';
import 'package:app/services/services.dart';
import 'package:app/themes/theme.dart';
import 'package:app/utils/utils.dart';
import 'package:app/widgets/widgets.dart';
import 'package:auto_size_text/auto_size_text.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_cache_manager/flutter_cache_manager.dart';
import 'package:flutter_svg/svg.dart';
import 'package:geolocator/geolocator.dart';
import 'package:hive_flutter/hive_flutter.dart';

import '../kya/kya_title_page.dart';
import '../kya/kya_widgets.dart';
import '../search/search_page.dart';

class DashboardLocationButton extends StatelessWidget {
  const DashboardLocationButton(this.error, {super.key});
  final NearbyAirQualityError error;
  @override
  Widget build(BuildContext context) {
    return OutlinedButton(
      onPressed: () async {
        if (error == NearbyAirQualityError.locationDenied) {
          await Geolocator.openAppSettings();
        } else if (error == NearbyAirQualityError.locationDisabled) {
          await Geolocator.openLocationSettings();
        }
      },
      style: OutlinedButton.styleFrom(
        elevation: 2,
        shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.all(Radius.circular(8))),
        backgroundColor: CustomColors.appColorBlue,
        padding: const EdgeInsets.symmetric(
          vertical: 12,
          horizontal: 14,
        ),
      ),
      child: Text(
        error.message,
        textAlign: TextAlign.center,
        style: const TextStyle(
          color: Colors.white,
          fontSize: 14,
          height: 22 / 14,
          letterSpacing: 16 * -0.022,
        ),
      ),
    );
  }
}

class DashboardTopCard extends StatelessWidget {
  const DashboardTopCard({
    super.key,
    required this.widgetKey,
    required this.title,
    required this.children,
    required this.toolTipType,
    required this.nextScreenClickHandler,
  });

  final GlobalKey widgetKey;
  final String title;
  final List<Widget> children;
  final ToolTipType toolTipType;
  final VoidCallback nextScreenClickHandler;

  double getWidth(int length) {
    if (length <= 1) {
      return 31.9;
    }

    if (length <= 2) {
      return 40.0;
    }

    return 46.0;
  }

  @override
  Widget build(BuildContext context) {
    return Expanded(
      key: widgetKey,
      child: GestureDetector(
        onTap: nextScreenClickHandler,
        child: Container(
          height: 56,
          padding: const EdgeInsets.all(12.0),
          decoration: const BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.all(
              Radius.circular(8.0),
            ),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              SizedBox(
                height: 32,
                width: getWidth(children.length),
                child: Stack(
                  children: children,
                ),
              ),
              const SizedBox(
                width: 8,
              ),
              Text(
                title,
                style: CustomTextStyle.bodyText4(context)?.copyWith(
                  color: CustomColors.appColorBlue,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class FavouritePlaceDashboardAvatar extends StatelessWidget {
  const FavouritePlaceDashboardAvatar({
    super.key,
    required this.rightPadding,
    required this.favouritePlace,
  });

  final double rightPadding;
  final FavouritePlace favouritePlace;

  @override
  Widget build(BuildContext context) {
    return Positioned(
      right: rightPadding,
      child: ValueListenableBuilder<Box<AirQualityReading>>(
        valueListenable: Hive.box<AirQualityReading>(HiveBox.airQualityReadings)
            .listenable(keys: [favouritePlace.referenceSite]),
        builder: (context, box, widget) {
          final airQualityReading = box.get(favouritePlace.referenceSite);
          if (airQualityReading == null) {
            return const CircularLoadingAnimation(
              size: 32,
            );
          }

          return Container(
            height: 32.0,
            width: 32.0,
            padding: const EdgeInsets.all(2.0),
            decoration: BoxDecoration(
              border: Border.fromBorderSide(
                BorderSide(
                  color: CustomColors.appBodyColor,
                  width: 2,
                ),
              ),
              color: Pollutant.pm2_5.color(
                airQualityReading.pm2_5,
              ),
              shape: BoxShape.circle,
            ),
            child: Center(
              child: Text(
                '${airQualityReading.pm2_5}',
                style: TextStyle(
                  fontSize: 7,
                  color: Pollutant.pm2_5.textColor(
                    value: airQualityReading.pm2_5,
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}

class KyaDashboardAvatar extends StatelessWidget {
  const KyaDashboardAvatar({
    super.key,
    required this.kya,
    required this.rightPadding,
  });
  final Kya kya;
  final double rightPadding;

  @override
  Widget build(BuildContext context) {
    return Positioned(
      right: rightPadding,
      child: Container(
        height: 32.0,
        width: 32.0,
        padding: const EdgeInsets.all(2.0),
        decoration: BoxDecoration(
          border: Border.fromBorderSide(
            BorderSide(
              color: CustomColors.appBodyColor,
              width: 2,
            ),
          ),
          color: CustomColors.greyColor,
          shape: BoxShape.circle,
          image: DecorationImage(
            fit: BoxFit.cover,
            image: CachedNetworkImageProvider(
              kya.imageUrl,
              cacheKey: kya.imageUrlCacheKey(),
              cacheManager: CacheManager(
                CacheService.cacheConfig(
                  kya.imageUrlCacheKey(),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class DashboardTopBar extends StatelessWidget implements PreferredSizeWidget {
  const DashboardTopBar({super.key});

  @override
  PreferredSizeWidget build(BuildContext context) {
    return AppBar(
      automaticallyImplyLeading: false,
      title: Container(
        padding: const EdgeInsets.only(top: 24),
        child: Row(
          children: [
            SvgPicture.asset(
              'assets/icon/airqo_logo.svg',
              height: 40,
              width: 58,
              semanticsLabel: 'AirQo',
            ),
            const Spacer(),
            GestureDetector(
              onTap: () async {
                await Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) {
                      return const SearchPage();
                    },
                  ),
                );
              },
              child: Container(
                height: 40,
                width: 40,
                padding: const EdgeInsets.all(10),
                decoration: const BoxDecoration(
                  color: Colors.white,
                  shape: BoxShape.rectangle,
                  borderRadius: BorderRadius.all(
                    Radius.circular(10.0),
                  ),
                ),
                child: SvgPicture.asset(
                  'assets/icon/search.svg',
                  semanticsLabel: 'Search',
                ),
              ),
            ),
          ],
        ),
      ),
      elevation: 0,
      toolbarHeight: 65,
      backgroundColor: CustomColors.appBodyColor,
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(72);
}

class DashboardKyaProgressBar extends StatefulWidget {
  const DashboardKyaProgressBar(this.kya, {super.key});
  final Kya kya;

  @override
  State<DashboardKyaProgressBar> createState() =>
      _DashboardKyaProgressBarState();
}

class _DashboardKyaProgressBarState extends State<DashboardKyaProgressBar> {
  double progress = 0.1;

  @override
  void initState() {
    super.initState();
    progress = widget.kya.progress == -1 ||
            widget.kya.progress == widget.kya.lessons.length
        ? 1
        : widget.kya.progress / widget.kya.lessons.length;
  }

  @override
  Widget build(BuildContext context) {
    return Visibility(
      visible: progress != 1 && progress != 0,
      child: SizedBox(
        height: 4,
        child: LinearProgressIndicator(
          color: CustomColors.appColorBlue,
          value: progress,
          backgroundColor: CustomColors.appColorDisabled.withOpacity(0.2),
        ),
      ),
    );
  }
}

class DashboardKyaCard extends StatelessWidget {
  const DashboardKyaCard(this.kya, {super.key});
  final Kya kya;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () async {
        if (kya.progress >= kya.lessons.length) {
          context.read<AccountBloc>().add(UpdateKyaProgress(
                kya: kya,
                progress: -1,
              ));
        } else {
          await Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) {
                return KyaTitlePage(kya);
              },
            ),
          );
        }
      },
      child: BlocBuilder<AccountBloc, AccountState>(
        buildWhen: (previous, current) {
          return previous.kya.totalProgress() != current.kya.totalProgress();
        },
        builder: (context, state) {
          final viewKya =
              state.kya.firstWhere((element) => element.id == kya.id);

          return Container(
            padding: const EdgeInsets.fromLTRB(16.0, 8.0, 8.0, 8.0),
            decoration: const BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.all(
                Radius.circular(16.0),
              ),
            ),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Expanded(
                  child: Column(
                    children: [
                      SizedBox(
                        height: 40,
                        child: AutoSizeText(
                          viewKya.title,
                          maxLines: 3,
                          overflow: TextOverflow.ellipsis,
                          style: CustomTextStyle.headline8(context),
                        ),
                      ),
                      const SizedBox(
                        height: 28,
                      ),
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          KyaMessage(
                            kya: viewKya,
                          ),
                          const SizedBox(
                            width: 6,
                          ),
                          SvgPicture.asset(
                            'assets/icon/more_arrow.svg',
                            semanticsLabel: 'more',
                            height: 6.99,
                            width: 4,
                          ),
                        ],
                      ),
                      SizedBox(
                        height: getKyaMessage(kya: viewKya).toLowerCase() ==
                                'continue'
                            ? 2
                            : 0,
                      ),
                      DashboardKyaProgressBar(viewKya),
                    ],
                  ),
                ),
                const SizedBox(
                  width: 16,
                ),
                ClipRRect(
                  borderRadius: BorderRadius.circular(8.0),
                  child: CachedNetworkImage(
                    fit: BoxFit.cover,
                    width: 104,
                    height: 104,
                    placeholder: (context, url) => const SizedBox(
                      width: 104,
                      height: 104,
                      child: ContainerLoadingAnimation(height: 104, radius: 8),
                    ),
                    imageUrl: viewKya.imageUrl,
                    errorWidget: (context, url, error) => Icon(
                      Icons.error_outline,
                      color: CustomColors.aqiRed,
                    ),
                    cacheKey: kya.imageUrlCacheKey(),
                    cacheManager: CacheManager(
                      CacheService.cacheConfig(
                        viewKya.imageUrlCacheKey(),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}

List<Widget> completeKyaWidgets(List<Kya> completeKya) {
  final widgets = <Widget>[];

  try {
    switch (completeKya.length) {
      case 0:
        widgets.add(
          SvgPicture.asset(
            'assets/icon/add_avator.svg',
          ),
        );
        break;
      case 1:
        widgets.add(
          KyaDashboardAvatar(rightPadding: 0, kya: completeKya.first),
        );
        break;
      case 2:
        widgets
          ..add(KyaDashboardAvatar(rightPadding: 0, kya: completeKya.first))
          ..add(
            KyaDashboardAvatar(rightPadding: 7, kya: completeKya[1]),
          );
        break;
      default:
        if (completeKya.length >= 3) {
          widgets
            ..add(KyaDashboardAvatar(rightPadding: 0, kya: completeKya.first))
            ..add(KyaDashboardAvatar(rightPadding: 7, kya: completeKya[1]))
            ..add(
              KyaDashboardAvatar(rightPadding: 14, kya: completeKya[2]),
            );
        }
        break;
    }
  } catch (exception, stackTrace) {
    logException(exception, stackTrace);
  }

  return widgets;
}

List<Widget> favouritePlacesWidgets(List<FavouritePlace> favouritePlaces) {
  final widgets = <Widget>[];

  try {
    switch (favouritePlaces.length) {
      case 0:
        widgets.add(
          SvgPicture.asset(
            'assets/icon/add_avator.svg',
          ),
        );
        break;
      case 1:
        widgets.add(
          FavouritePlaceDashboardAvatar(
            rightPadding: 0,
            favouritePlace: favouritePlaces.first,
          ),
        );
        break;
      case 2:
        widgets
          ..add(FavouritePlaceDashboardAvatar(
            rightPadding: 0,
            favouritePlace: favouritePlaces.first,
          ))
          ..add(
            FavouritePlaceDashboardAvatar(
              rightPadding: 7,
              favouritePlace: favouritePlaces[1],
            ),
          );
        break;
      default:
        if (favouritePlaces.length >= 3) {
          widgets
            ..add(FavouritePlaceDashboardAvatar(
              rightPadding: 0,
              favouritePlace: favouritePlaces.first,
            ))
            ..add(FavouritePlaceDashboardAvatar(
              rightPadding: 7,
              favouritePlace: favouritePlaces[1],
            ))
            ..add(
              FavouritePlaceDashboardAvatar(
                rightPadding: 14,
                favouritePlace: favouritePlaces[2],
              ),
            );
        }
        break;
    }
  } catch (exception, stackTrace) {
    logException(exception, stackTrace);
  }

  return widgets;
}
