---
# 제목
title: "이미지 슬라이드!"
# 부가 내용 미리보기
excerpt: "이미지 슬라이드에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Flutter
# 태그 
tags:
  - [flutter, image, slide]

# 
permalink: /flutter/image-slide/

toc: true
toc_sticky: false

date: 2023-03-29
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 이미지 슬라이드

## 코드
``` dart
import 'dart:async';

import 'package:flutter/material.dart';
import 'package:safe_riding_safe_return/utils/widget/custom_snack_bar.dart';

class RidingScreen extends StatefulWidget {
  const RidingScreen({Key? key}) : super(key: key);

  @override
  State<RidingScreen> createState() => _RidingScreenState();
}

class _RidingScreenState extends State<RidingScreen> {
  late Timer _timer;
  List images = [
    'https://images.unsplash.com/photo-1617330070571-60434437a26c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80',
    'https://images.unsplash.com/photo-1564276418402-ec12dc900882?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1497671954146-59a89ff626ff?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1611095560192-ccc932f617e1?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
    'https://images.unsplash.com/photo-1612831819448-f6cae53d3dcf?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1233&q=80',
    'https://images.unsplash.com/photo-1587614222490-3497ae026130?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=974&q=80',
  ];

  int currentPage = 0;

  final PageController _pageController = PageController(initialPage: 0);

  @override
  void initState() {
    super.initState();
    if (mounted) {
      _timer = Timer.periodic(const Duration(seconds: 5), (timer) {
        if (currentPage < images.length - 1) {
          setState(() {
            currentPage++;
          });
        } else {
          setState(() {
            currentPage = 0;
          });
        }
        _pageController.animateToPage(currentPage,
            duration: const Duration(milliseconds: 350), curve: Curves.easeIn);
      });
    }
  }

  @override
  void dispose() {
    _timer?.cancel();
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AspectRatio(
      aspectRatio: 1 / 1,
      child: Stack(
        children: [
          PageView.builder(
            physics: const NeverScrollableScrollPhysics(),
            controller: _pageController,
            itemBuilder: (context, index) {
              return InkWell(
                onTap: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    customSnackBar(text: '${index + 1} 탭하였습니다.'),
                  );
                },
                child: Image.network(
                  '${images[index % images.length]}',
                  fit: BoxFit.cover,
                ),
              );
            },
          ),
          Align(
            alignment: Alignment.bottomRight,
            child: Container(
              color: Colors.black.withOpacity(0.5),
              padding:
                  const EdgeInsets.symmetric(vertical: 8.0, horizontal: 12.0),
              child: Text(
                '${currentPage + 1} / ${images.length}',
                style: const TextStyle(
                  color: Colors.white,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

```
## 결과 
![](https://velog.velcdn.com/images/sht-3756/post/f99bcfcd-c09d-4084-907a-9ca16a7c96c5/image.png)
