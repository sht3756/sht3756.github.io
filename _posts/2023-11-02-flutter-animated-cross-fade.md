---
# 제목
title: "AnimatedCrossFade!"
# 부가 내용 미리보기
excerpt: "애니메이션 연속으로 Fade 하기에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Flutter
# 태그 
tags:
  - [flutter, AnimatedCrossFade]

# 
permalink: /flutter/animated-cross-fade/

toc: true
toc_sticky: false

date: 2023-11-02
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 애니메이션 연속으로 Fade 하기

```dart
class WidgetTest extends StatefulWidget {
  const WidgetTest({Key? key}) : super(key: key);

  @override
  State<WidgetTest> createState() => _WidgetTestState();
}

class _WidgetTestState extends State<WidgetTest> {
  bool isBool = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            TextButton(
              onPressed: () {
                setState(() {
                  isBool = !isBool;
                });
              },
              child: Text('클릭'),
            ),
            AnimatedCrossFade(
              firstChild: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    color: Colors.red,
                    height: 50,
                    width: 50,
                  ),
                  Container(
                    color: Colors.orange,
                    height: 50,
                    width: 50,
                  ),
                ],
              ),
              secondChild: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    color: Colors.green,
                    height: 50,
                    width: 50,
                  ),
                ],
              ),
              crossFadeState: isBool ? CrossFadeState.showFirst : CrossFadeState.showSecond,
              duration: Duration(milliseconds: 300),
            ),
          ],
        ),
      ),
    );
  }
}
```
<img width="80%" src="https://github.com/sht3756/sht3756.github.io/blob/main/assets/images/posts_img/flutter/animated-cross-fade.mov">

