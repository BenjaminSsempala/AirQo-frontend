import 'package:app/blocs/account/account_bloc.dart';
import 'package:app/models/models.dart';
import 'package:app/services/services.dart';
import 'package:app/themes/theme.dart';
import 'package:app/widgets/widgets.dart';
import 'package:auto_size_text/auto_size_text.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:firebase_dynamic_links/firebase_dynamic_links.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_cache_manager/flutter_cache_manager.dart';
import 'package:flutter_svg/svg.dart';
import 'package:scrollable_positioned_list/scrollable_positioned_list.dart';

import '../home_page.dart';
import 'kya_final_page.dart';
import 'kya_widgets.dart';

class KyaLessonsPage extends StatefulWidget {
  const KyaLessonsPage(
    this.kya, {
    super.key,
  });
  final Kya kya;

  @override
  State<KyaLessonsPage> createState() => _KyaLessonsPageState();
}

class _KyaLessonsPageState extends State<KyaLessonsPage> {
  final ItemScrollController itemScrollController = ItemScrollController();
  final ItemPositionsListener itemPositionsListener =
      ItemPositionsListener.create();

  double _tipsProgress = 0.1;
  int currentIndex = 0;
  late Kya kya;
  final List<GlobalKey> _globalKeys = <GlobalKey>[];

  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;

    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        elevation: 0,
        backgroundColor: CustomColors.appBodyColor,
        centerTitle: false,
        titleSpacing: 0,
        title: Row(
          children: [
            InkWell(
              onTap: () {
                if (Navigator.of(context).canPop()) {
                  Navigator.of(context).pop();
                } else {
                  Navigator.pushAndRemoveUntil(
                    context,
                    MaterialPageRoute(builder: (context) {
                      return const HomePage();
                    }),
                    (r) => false,
                  );
                }
              },
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 7),
                child: SvgPicture.asset(
                  'assets/icon/close.svg',
                  height: 20,
                  width: 20,
                ),
              ),
            ),
            Expanded(
              child: LinearProgressIndicator(
                color: CustomColors.appColorBlue,
                value: _tipsProgress,
                backgroundColor: CustomColors.appColorBlue.withOpacity(0.2),
              ),
            ),
            FutureBuilder<ShortDynamicLink>(
              future: ShareService.createShareLink(kya: widget.kya),
              builder: (context, snapshot) {
                if (snapshot.hasError) {
                  // TODO implement this functionality
                }
                if (snapshot.hasData) {
                  return InkWell(
                    onTap: () async {
                      ShortDynamicLink? link = snapshot.data;
                      if (link != null) {
                        await ShareService.shareLink(
                          link: link,
                          kya: kya,
                        );
                      }
                    },
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 7),
                      child: SvgPicture.asset(
                        'assets/icon/share_icon.svg',
                        color: CustomColors.greyColor,
                        height: 16,
                        width: 16,
                      ),
                    ),
                  );
                }

                return const LoadingIcon(radius: 14);
              },
            ),
          ],
        ),
      ),
      body: Container(
        color: CustomColors.appBodyColor,
        child: Column(
          children: [
            const Spacer(),
            SizedBox(
              height: 400,
              child: ScrollablePositionedList.builder(
                padding: EdgeInsets.zero,
                scrollDirection: Axis.horizontal,
                itemCount: kya.lessons.length,
                physics: const NeverScrollableScrollPhysics(),
                itemBuilder: (context, index) {
                  return Padding(
                    padding: const EdgeInsets.only(
                      left: 19,
                      right: 19,
                      bottom: 10,
                    ),
                    child: SizedBox(
                      width: screenSize.width * 0.9,
                      child: _kyaCard(kya.lessons[index], index),
                    ),
                  );
                },
                itemPositionsListener: itemPositionsListener,
                itemScrollController: itemScrollController,
              ),
            ),
            const Spacer(),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Visibility(
                    visible: currentIndex > 0,
                    child: GestureDetector(
                      onTap: () => scrollToCard(-1),
                      child: const CircularKyaButton(
                        icon: 'assets/icon/previous_arrow.svg',
                      ),
                    ),
                  ),
                  GestureDetector(
                    onTap: () => scrollToCard(1),
                    child: const CircularKyaButton(
                      icon: 'assets/icon/next_arrow.svg',
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(
              height: 40,
            ),
          ],
        ),
      ),
    );
  }

  @override
  void initState() {
    super.initState();
    kya = widget.kya;
    currentIndex = 0;
    var index = 0;
    while (index != widget.kya.lessons.length) {
      _globalKeys.add(
        GlobalKey(),
      );
      index++;
    }
    itemPositionsListener.itemPositions.addListener(scrollListener);
  }

  void scrollListener() {
    Future.delayed(
      const Duration(milliseconds: 500),
      setTipsProgress,
    );
  }

  @override
  void dispose() {
    itemPositionsListener.itemPositions.removeListener(scrollListener);
    super.dispose();
  }

  void scrollToCard(int direction) {
    if (direction == -1) {
      setState(() => currentIndex = currentIndex - 1);
      itemScrollController.scrollTo(
        index: currentIndex,
        duration: const Duration(milliseconds: 500),
        curve: Curves.easeInOutCubic,
      );
    } else {
      setState(() => currentIndex = currentIndex + 1);
      if (currentIndex < kya.lessons.length) {
        itemScrollController.scrollTo(
          index: currentIndex,
          duration: const Duration(milliseconds: 500),
          curve: Curves.easeInOutCubic,
        );
      } else {
        kya.progress = currentIndex;
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (context) {
              return KyaFinalPage(kya);
            },
          ),
        );
      }
    }
    context
        .read<AccountBloc>()
        .add(UpdateKyaProgress(kya: kya, progress: currentIndex));
  }

  void setTipsProgress() {
    if (mounted) {
      setState(() => _tipsProgress = (currentIndex + 1) / kya.lessons.length);
    }
  }

  Widget _kyaCard(KyaLesson kyaItem, int index) {
    return Card(
      color: Colors.white,
      elevation: 5,
      margin: EdgeInsets.zero,
      shadowColor: CustomColors.appBodyColor,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
      ),
      child: RepaintBoundary(
        key: _globalKeys[index],
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Padding(
              padding: const EdgeInsets.only(
                left: 8.0,
                right: 8.0,
                top: 8.0,
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: CachedNetworkImage(
                  fit: BoxFit.fill,
                  placeholder: (context, url) => const SizedBox(
                    child: ContainerLoadingAnimation(
                      height: 180,
                      radius: 8,
                    ),
                  ),
                  imageUrl: kyaItem.imageUrl,
                  errorWidget: (context, url, error) => Icon(
                    Icons.error_outline,
                    color: CustomColors.aqiRed,
                  ),
                  cacheKey: kyaItem.imageUrlCacheKey(kya),
                  cacheManager: CacheManager(
                    CacheService.cacheConfig(
                      kyaItem.imageUrlCacheKey(kya),
                    ),
                  ),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(left: 36, right: 36, top: 12.0),
              child: AutoSizeText(
                kyaItem.title,
                maxLines: 2,
                minFontSize: 20,
                overflow: TextOverflow.ellipsis,
                textAlign: TextAlign.center,
                style: CustomTextStyle.headline9(context),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(left: 16, right: 16, top: 8.0),
              child: AutoSizeText(
                kyaItem.body,
                maxLines: 3,
                overflow: TextOverflow.ellipsis,
                textAlign: TextAlign.center,
                minFontSize: 16,
                style: Theme.of(context).textTheme.subtitle1?.copyWith(
                      color: CustomColors.appColorBlack.withOpacity(0.5),
                    ),
              ),
            ),
            const Spacer(),
            SvgPicture.asset(
              'assets/icon/tips_graphics.svg',
              semanticsLabel: 'tips_graphics',
            ),
            const SizedBox(
              height: 30,
            ),
          ],
        ),
      ),
    );
  }
}
