---
# 제목
title: "클릭을 방지하는 위젯"
# 부가 내용 미리보기
excerpt: "클릭을 방지하는 위젯에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Flutter
# 태그 
tags:
  - [flutter, prevent, click, widget]

# 
permalink: /flutter/prevent-click-widget/

toc: true
toc_sticky: false

date: 2023-06-02
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 클릭을 방지하는 위젯


## 클릭을 방지하는 위젯이 뭐 없을까?

짧은 기간안에 데이터를 전송하는 버튼을 연타하는 경우가 생길 상황을 우려해서 Debounce 와 button display 중 둘 중 하나를 고민을 하다가,

디바운스는 프로젝트에 적응한 다음 버튼 함수에다가 디바운스를 거는것보단 데이터 fetcing 하는 함수들 모두 범용성이 있게 작업을 해보자! 라는 생각을 가졌고,

최종적으론 편리하게 클릭을 방지하는 위젯을 찾아보게 되었다.

## Flutter 에서 위젯 터치 이벤트 무시하는 방법!! 뚜둔
### 방법 1 )
#### IgnorePointer()
[코드]
``` dart
IgnorePointer(
	ignoring: true, // Boolean 
	child: ElevatedButton(
    		onPressed: () {print('클릭!')}, 
            child: Text('버튼'),
     ),
)
```
[설명]
IgnorePointer() 위젯의 속성 ignoring 이 true 라면?
child 의 터치 이벤트를 무시하고,
IgnorePointer() 위젯의 속성 ignoring 이 false 라면?
child 의 터치 이벤트를 허용한다.

### 방법 2 )
#### AbsorbPointer()
[코드]
``` dart
AbsorbPointer(
	absorbing: true, // Boolean 
	child: ElevatedButton(
    		onPressed: () {print('클릭!')}, 
            child: Text('버튼'),
     ),
)
```
[설명]
AbsorbPointer() 위젯의 속성 absorbing 이 true 라면?
child 의 터치 이벤트를 흡수하고,
AbsorbPointer() 위젯의 속성 absorbing 이 false 라면?
child 의 터치 이벤트를 흡수하지 않는다.

### 그렇다면 둘의 차이점은 ?
둘의 사용법과 액션은 매우 비슷하다못해 똑같다. 

https://www.woolha.com/tutorials/flutter-using-ignorepointer-absorbpointer-examples


이 부분은 코드와 할께 잘 생각해봐야한다.

버튼들을 따로 쓰면 당연히 같은 동작 처럼 보이겠지만, Stack 위에서 쓰면 동작이 다른것이 확실하게 보인다.
Ignore 은 무시하고 밑의 레이어를 클릭가능하고 
Absorb 는 흡수하고 밑의 레이어를 클릭 못하게 한다.

```
//Ignore => 최상위 alert() 실행되고 맨 아래레이어 alert() 도 실행된다. (최초 클릭시 IgnorePointer 가 true 가 되어  재차 클릭시 맨아래 레이어 버튼을 클릭할 수있다.) 
Stack(
	children: [
    	ElevatedButton(onPressed: () {
        	alert('맨아래 레이어 클릭')
	        }, child: Text('맨아래 레이어'),
        ),
        IgnorePointer(
        	ignoring: _ignoring,
            onPressed: () {
            	alert('최상위 레이어 클릭')
                _ignoring = true;
            }
        ),        
    ]
) 
```

``` dart
//Absorb => 최상위 alert() 만 실행된다. (최초 클릭시 AbsorbPointer 가 true 가 되어 맨아래 레이어 버튼을 클릭 안된다. AbsorbPointer 가 최상위에서 클릭 흡수하기때문!)
Stack(
	children: [
    	ElevatedButton(onPressed: () {
        	alert('맨아래 레이어 클릭')
	        }, child: Text('맨아래 레이어'),
        ),
        AbsorbPointer(
        	Absorbing: _absorbing,
            onPressed: () {
            	alert('최상위 레이어 클릭')
                _absorbing = true;
            }
        ),        
    ]
) 
```

