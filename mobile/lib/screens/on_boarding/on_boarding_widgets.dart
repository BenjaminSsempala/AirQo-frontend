import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';

import '../../constants/config.dart';
import '../../models/profile.dart';
import '../../widgets/text_fields.dart';

class OnBoardingAppBar extends StatelessWidget implements PreferredSizeWidget {
  const OnBoardingAppBar({Key? key}) : super(key: key);

  @override
  PreferredSizeWidget build(BuildContext context) {
    return AppBar(
      automaticallyImplyLeading: false,
      elevation: 0,
      toolbarHeight: 0,
      backgroundColor: Config.appBodyColor,
    );
  }

  @override
  Size get preferredSize => Size.zero;
}

class OnBoardingLocationIcon extends StatelessWidget {
  const OnBoardingLocationIcon({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Stack(
      alignment: AlignmentDirectional.center,
      children: [
        Image.asset(
          'assets/icon/floating_bg.png',
          fit: BoxFit.fitWidth,
          width: double.infinity,
        ),
        Image.asset(
          'assets/icon/enable_location_icon.png',
          height: 221,
        ),
      ],
    );
  }
}

class OnBoardingNotificationIcon extends StatelessWidget {
  const OnBoardingNotificationIcon({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Stack(
      alignment: AlignmentDirectional.center,
      children: [
        Image.asset(
          'assets/icon/floating_bg.png',
          fit: BoxFit.fitWidth,
          width: double.infinity,
        ),
        SvgPicture.asset(
          'assets/icon/enable_notifications_icon.svg',
          height: 221,
        ),
      ],
    );
  }
}

class ProfileSetupNameInputField extends StatelessWidget {
  final Function(String) nameChangeCallBack;
  final Function(bool) showTileOptionsCallBack;
  final TextEditingController? controller;
  const ProfileSetupNameInputField(
      {Key? key,
      required this.nameChangeCallBack,
      required this.showTileOptionsCallBack,
      this.controller})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      onTap: () => showTileOptionsCallBack(false),
      onEditingComplete: () async {
        FocusScope.of(context).requestFocus(FocusNode());
        Future.delayed(const Duration(milliseconds: 250), () {
          showTileOptionsCallBack(true);
        });
      },
      enableSuggestions: false,
      cursorWidth: 1,
      cursorColor: Config.appColorBlue,
      keyboardType: TextInputType.name,
      onChanged: nameChangeCallBack,
      validator: (value) {
        if (value == null || value.isEmpty) {
          return 'Please enter your name';
        }
        return null;
      },
      decoration: InputDecoration(
        contentPadding: const EdgeInsets.fromLTRB(16, 12, 0, 12),
        focusedBorder: OutlineInputBorder(
          borderSide: BorderSide(color: Config.appColorBlue, width: 1.0),
          borderRadius: BorderRadius.circular(8.0),
        ),
        enabledBorder: OutlineInputBorder(
          borderSide: BorderSide(color: Config.appColorBlue, width: 1.0),
          borderRadius: BorderRadius.circular(8.0),
        ),
        border: OutlineInputBorder(
            borderSide: BorderSide(color: Config.appColorBlue, width: 1.0),
            borderRadius: BorderRadius.circular(8.0)),
        hintText: 'Enter your name',
        errorStyle: const TextStyle(
          fontSize: 0,
        ),
        suffixIcon: GestureDetector(
          onTap: () => nameChangeCallBack(''),
          child: const TextInputCloseButton(),
        ),
      ),
    );
  }
}

class TitleDropDown extends StatelessWidget {
  final Function(bool) showTileOptionsCallBack;
  final Profile profile;
  const TitleDropDown(
      {Key? key, required this.showTileOptionsCallBack, required this.profile})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => showTileOptionsCallBack(true),
      child: Container(
          width: 70,
          padding:
              const EdgeInsets.only(left: 10, right: 10, top: 15, bottom: 15),
          decoration: BoxDecoration(
              color: const Color(0xffF4F4F4),
              borderRadius: BorderRadius.circular(8)),
          child: Center(
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text('${profile.title.substring(0, 2)}.'),
                const Icon(
                  Icons.keyboard_arrow_down_sharp,
                  color: Colors.black,
                ),
              ],
            ),
          )),
    );
  }
}