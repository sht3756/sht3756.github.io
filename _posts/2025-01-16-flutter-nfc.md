---
# 제목
title: "NFC 사용"
# 부가 내용 미리보기
excerpt: "NFC 너란 놈 정복해보겠어"

# 해당 카테고리
categories:
  - Flutter
# 태그
tags:
  - [flutter, nfc]

#
permalink: /flutter/nfc/

toc: true
toc_sticky: false

date: 2025-01-16
# last_modified_at: 0000-00-00

# true 활성 (default), false 비활성
published: false
---

# 🦥 nfc 연동해보겠다.

## 준비

- nfc 연동을 위한 준비

```bash
  // pubspec.yaml
   flutter_nfc_kit: ^3.5.2
   dependency_overrides:
   js: "^0.6.4"
```

DOCUMENT에 따라서 설정을 해주자
![nfc1](https://github.com/user-attachments/assets/24bab511-3dba-4ee9-a283-283951b1bbf4)

### 1. XCode 권한 추가

NFC 기능을 활성화하기 위해 프로젝트의 entitlements파일에 권한을 추가해줘야한다.

- xcode 열기
- Signing & Capabilities 탭 클릭
- +Capability 클릭
- Near Field Communication Tag Reading 클릭

![nfc2](https://github.com/user-attachments/assets/452654b9-14ec-41fa-bfed-21982b80a5a5)

### 2. 앱이 NFC를 사용한다고 사용자에게 표시된다.

```
//info.plist
<key>NFCReaderUsageDescription</key>
<string>This app uses NFC to read data.</string>
```

### 3. iOS 14.5 이하 버전을 위한 추가 설정

iOS 14.5 이하 버전에서는 NFC 관련 설정이 누락되면 기기가 재부팅 전까지 NFC 기능이 비활성화될 수 있다. 이를 방지하기 위해 아래 키를 추가한다.

```
<key>com.apple.developer.nfc.readersession.felica.systemcodes</key>
<array>
  <string>D2760000850101</string>
</array>
<key>com.apple.developer.nfc.readersession.iso7816.select-identifiers</key>
<array>
  <string>A0000002471001</string>
</array>

```

## 이슈

> Doc 권한 설정 안하면 나는 이슈이니 잘 따라해주자!

```bash
flutter: start polling
flutter: PlatformException(500, Generic NFC Error, The operation couldn’t be completed. (NFCError error 4099.), null), #0      StandardMethodCodec.decodeEnvelope (package:flutter/src/services/message_codecs.dart:648:7)
#1      MethodChannel._invokeMethod (package:flutter/src/services/platform_channel.dart:334:18)
<asynchronous suspension>
#2      FlutterNfcKit.poll (package:flutter_nfc_kit/flutter_nfc_kit.dart:332:25)
<asynchronous suspension>
#3      _MyAppState.build.<anonymous closure> (package:nfc_test/main.dart:122:40)
<asynchronous suspension>
```

## 결과

| 이미지                                                                                                                      | 설명                                                                               |
| --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| <img height=300 width=300 src="https://github.com/user-attachments/assets/d2d58b9e-0f58-4082-bdbf-eef32c29f81c" alt='nfc3'> | <b>Start Polling을 클릭시 나오는 화면(바텀시트모달이 열리고 스캔준비라고 출력)</b> |
| <img height=300 width=300 src="https://github.com/user-attachments/assets/586fd33a-92a3-4734-9e1c-e34257665988" alt='nfc4'> | <b>스캔시 완료시 나오는 화면(NFC태그후 뜨는 바텀시트모달) </b>                     |
| <img height=300 width=300 src="https://github.com/user-attachments/assets/55c4ce13-5fe1-41b6-8a9c-85deeebac495" alt='nfc5'> | <b>결과 스크린(NFC태그 후 나온 결과) </b>                                          |

## 코드

```dart
// main.dart
import 'dart:async';
import 'dart:io' show Platform, sleep;

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_nfc_kit/flutter_nfc_kit.dart';
import 'package:logging/logging.dart';
import 'package:ndef/ndef.dart' as ndef;
import 'package:ndef/utilities.dart';

import 'raw_record_setting.dart';
import 'text_record_setting.dart';
import 'uri_record_setting.dart';

void main() {
  Logger.root.level = Level.ALL;
  Logger.root.onRecord.listen((record) {
    print('${record.level.name} : ${record.time} : ${record.message}');
  });

  runApp(
    MaterialApp(
      theme: ThemeData(useMaterial3: true),
      home: const MyApp(),
    ),
  );
}

class MyApp extends StatefulWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> with SingleTickerProviderStateMixin {
  // 플랫폼 버전 정보
  String _platformVersion = '';

  // NFC 사용 가능 여부
  NFCAvailability _availability = NFCAvailability.not_supported;

  // 현재 NFC 태그 정보
  NFCTag? _tag;

  // NFC 작업 결과를 담는 변수
  String? _result, _writeResult, _mifareResult;

  // 탭 컨트롤러
  late TabController _tabController;

  // NFC 레코드 리스트
  List<ndef.NDEFRecord>? _records = [];

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);

    if (!kIsWasm) {
      _platformVersion =
          '${Platform.operatingSystem} ${Platform.operatingSystemVersion}';
    } else {
      _platformVersion = 'Web';
      initPlatformState();
      _records = [];
    }
  }

  Future<void> initPlatformState() async {
    NFCAvailability availability;
    try {
      availability = await FlutterNfcKit.nfcAvailability;
    } on PlatformException {
      availability = NFCAvailability.not_supported;
    }

    if (!mounted) return;
    setState(() {
      _availability = availability;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('NFC Flutter Kit Example App'),
          bottom: TabBar(
            tabs: const [
              Tab(text: 'Read'),
              Tab(text: 'Write'),
            ],
            controller: _tabController,
          ),
        ),
        body: TabBarView(
          controller: _tabController,
          children: [
            // 읽기 탭
            Scrollbar(
                child: SingleChildScrollView(
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const SizedBox(height: 20),
                    Text('Running on : $_platformVersion\nNFC: $_availability'),
                    const SizedBox(height: 10),
                    ElevatedButton(
                      onPressed: () async {
                        try {
                          print('start polling');
                          NFCTag tag = await FlutterNfcKit.poll();
                          setState(() {
                            _tag = tag;
                          });
                          print('tag $tag');
                          // iOS 알림 메세지 설정
                          await FlutterNfcKit.setIosAlertMessage(
                              'Working on it...');
                          _mifareResult = null;
                          print('tag.standard : ${tag.standard}\ntag.type: ${tag.type}\ntag.ndefAvailable: ${tag.ndefAvailable}');
                          if (tag.standard == 'ISO 14443-4 (Type B)') {
                            String result1 =
                                await FlutterNfcKit.transceive('00B0950000');
                            String result2 = await FlutterNfcKit.transceive(
                                '00A4040009A00000000386980701');
                            setState(() {
                              _result = '1 : $result1\n2: $result2\n';
                            });
                          } else if (tag.type == NFCTagType.iso18092) {
                            String result1 =
                                await FlutterNfcKit.transceive('060080080100');
                            setState(() {
                              _result = '1 : $result1\n';
                            });
                          } else if (tag.ndefAvailable ?? false) {
                            var ndefRecords =
                                await FlutterNfcKit.readNDEFRecords();
                            var ndefString = '';
                            for (int i = 0; i < ndefRecords.length; i++) {
                              ndefString += '${i + 1}: ${ndefRecords[i]}\n';
                            }
                            setState(() {
                              _result = ndefString;
                            });
                          } else if (tag.type == NFCTagType.webusb) {
                            var r = await FlutterNfcKit.transceive(
                                '00A4040006D27600012401');
                            print(r);
                          }
                        } catch (e,s) {
                          print('$e, $s');
                          setState(() {
                            _result = 'error : $e';
                          });
                        }

                        if (!kIsWeb) sleep(const Duration(seconds: 1));
                        await FlutterNfcKit.finish(
                            iosAlertMessage: 'Finished!');
                      },
                      child: const Text('Start polling'),
                    ),
                    const SizedBox(height: 10),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 20),
                      child: _tag != null
                          ? Text(
                              'ID : ${_tag!.id}\nStandard: ${_tag!.standard}\nType: ${_tag!.type}\nATQA: ${_tag!.atqa}\nSAK: ${_tag!.sak}\nHistorical Bytes: ${_tag!.historicalBytes}\nProtocol Info: ${_tag!.protocolInfo}\nApplication Data: ${_tag!.applicationData}\nHigher Layer Response: ${_tag!.hiLayerResponse}\nManufacturer: ${_tag!.manufacturer}\nSystem Code: ${_tag!.systemCode}\nDSF ID: ${_tag!.dsfId}nNDEF Available: ${_tag!.ndefAvailable}\nNDEF Type: ${_tag!.ndefType}\nNDEF Writable: ${_tag!.ndefWritable}\nNDEF Can Make Read Only: ${_tag!.ndefCanMakeReadOnly}\nNDEF Capacity: ${_tag!.ndefCapacity}\nMifare Info:${_tag!.mifareInfo} Transceive Result:\n$_result\n\nBlock Message:\n$_mifareResult')
                          : const Text('No tag polled yet'),
                    ),
                  ],
                ),
              ),
            )),
            Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  const SizedBox(height: 20),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      ElevatedButton(
                        onPressed: () async {
                          if (_records!.length != 0) {
                            try {
                              NFCTag tag = await FlutterNfcKit.poll();
                              setState(() {
                                _tag = tag;
                              });
                              if (tag.type == NFCTagType.mifare_ultralight ||
                                  tag.type == NFCTagType.mifare_classic ||
                                  tag.type == NFCTagType.iso15693) {
                                await FlutterNfcKit.writeNDEFRecords(_records!);
                                setState(() {
                                  _writeResult = 'OK';
                                });
                              } else {
                                setState(() {
                                  _writeResult =
                                      'error: NDEF not supported: ${tag.type}';
                                });
                              }
                            } catch (e, s) {
                              setState(() {
                                _writeResult = 'error :$e';
                              });
                              print(s);
                            } finally {
                              await FlutterNfcKit.finish();
                            }
                          } else {
                            setState(() {
                              _writeResult = 'error: No record';
                            });
                          }
                        },
                        child: const Text('Start writing'),
                      ),
                      ElevatedButton(
                        onPressed: () {
                          showDialog(
                            context: context,
                            builder: (context) {
                              return SimpleDialog(
                                title: const Text('Record Type'),
                                children: [
                                  SimpleDialogOption(
                                    child: const Text('Text Record'),
                                    onPressed: () async {
                                      Navigator.pop(context);
                                      final result = await Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                              builder: (context) =>
                                                  NDEFTextRecordSetting()));

                                      if (result != null) {
                                        if (result is ndef.TextRecord) {
                                          setState(() {
                                            _records!.add(result);
                                          });
                                        }
                                      }
                                    },
                                  ),
                                  SimpleDialogOption(
                                    child: const Text('Uri Record'),
                                    onPressed: () async {
                                      Navigator.pop(context);
                                      final result = await Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                              builder: (context) =>
                                                  NDEFUriRecordSetting()));
                                      if (result != null) {
                                        if (result is ndef.UriRecord) {
                                          setState(() {
                                            _records!.add(result);
                                          });
                                        }
                                      }
                                    },
                                  ),
                                  SimpleDialogOption(
                                    child: const Text('Raw Record'),
                                    onPressed: () async {
                                      Navigator.pop(context);
                                      final result = await Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                              builder: (context) =>
                                                  NDEFRecordSetting()));
                                      if (result != null) {
                                        if (result is ndef.NDEFRecord) {
                                          setState(() {
                                            _records!.add(result);
                                          });
                                        }
                                      }
                                    },
                                  )
                                ],
                              );
                            },
                          );
                        },
                        child: const Text('Add record'),
                      )
                    ],
                  ),
                  const SizedBox(height: 10),
                  Text('Result: $_writeResult'),
                  const SizedBox(height: 10),
                  Expanded(
                    flex: 1,
                    child: ListView(
                      shrinkWrap: true,
                      children: List.generate(
                        _records!.length,
                        (index) => GestureDetector(
                          child: Padding(
                            padding: const EdgeInsets.all(10),
                            child: Text(
                                'id:${_records![index].idString}\ntnf:${_records![index].tnf}\ntype:${_records![index].type?.toHexString()}\npayload:${_records![index].payload?.toHexString()}\n'),
                          ),
                          onTap: () async {
                            final result = await Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => NDEFRecordSetting(
                                        record: _records![index])));

                            if (result != null) {
                              if (result is ndef.NDEFRecord) {
                                setState(() {
                                  _records![index] = result;
                                });
                              } else if (result is String &&
                                  result == 'Delete') {
                                _records!.removeAt(index);
                              }
                            }
                          },
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

```

```dart
// raw_record_setting.dart
import 'package:flutter/material.dart';

import 'package:ndef/ndef.dart' as ndef;
import 'package:ndef/utilities.dart';

class NDEFRecordSetting extends StatefulWidget {
  final ndef.NDEFRecord record;

  NDEFRecordSetting({Key? key, ndef.NDEFRecord? record})
      : record = record ?? ndef.NDEFRecord(),
        super(key: key);

  @override
  _NDEFRecordSetting createState() => _NDEFRecordSetting();
}

class _NDEFRecordSetting extends State<NDEFRecordSetting> {
  final GlobalKey _formKey = GlobalKey<FormState>();
  late TextEditingController _identifierController;
  late TextEditingController _payloadController;
  late TextEditingController _typeController;
  late int _dropButtonValue;

  @override
  initState() {
    super.initState();

    if (widget.record.id == null) {
      _identifierController =
          TextEditingController.fromValue(const TextEditingValue(text: ""));
    } else {
      _identifierController = TextEditingController.fromValue(
          TextEditingValue(text: widget.record.id!.toHexString()));
    }
    if (widget.record.payload == null) {
      _payloadController =
          TextEditingController.fromValue(const TextEditingValue(text: ""));
    } else {
      _payloadController = TextEditingController.fromValue(
          TextEditingValue(text: widget.record.payload!.toHexString()));
    }
    if (widget.record.encodedType == null &&
        widget.record.decodedType == null) {
      // bug in ndef package (fixed in newest version)
      _typeController =
          TextEditingController.fromValue(const TextEditingValue(text: ""));
    } else {
      _typeController = TextEditingController.fromValue(
          TextEditingValue(text: widget.record.type!.toHexString()));
    }
    _dropButtonValue = ndef.TypeNameFormat.values.indexOf(widget.record.tnf);
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Set Record'),
        ),
        body: Center(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10),
            child: Form(
              key: _formKey,
              autovalidateMode: AutovalidateMode.always,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                children: <Widget>[
                  DropdownButton(
                    value: _dropButtonValue,
                    items: const [
                      DropdownMenuItem(
                        child: Text('empty'),
                        value: 0,
                      ),
                      DropdownMenuItem(
                        child: Text('nfcWellKnown'),
                        value: 1,
                      ),
                      DropdownMenuItem(
                        child: Text('media'),
                        value: 2,
                      ),
                      DropdownMenuItem(
                        child: Text('absoluteURI'),
                        value: 3,
                      ),
                      DropdownMenuItem(child: Text('nfcExternal'), value: 4),
                      DropdownMenuItem(child: Text('unchanged'), value: 5),
                      DropdownMenuItem(
                        child: Text('unknown'),
                        value: 6,
                      ),
                    ],
                    onChanged: (value) {
                      setState(() {
                        _dropButtonValue = value as int;
                      });
                    },
                  ),
                  TextFormField(
                    decoration: const InputDecoration(labelText: 'identifier'),
                    validator: (v) {
                      return v!.trim().length % 2 == 0
                          ? null
                          : 'length must be even';
                    },
                    controller: _identifierController,
                  ),
                  TextFormField(
                    decoration: const InputDecoration(labelText: 'type'),
                    validator: (v) {
                      return v!.trim().length % 2 == 0
                          ? null
                          : 'length must be even';
                    },
                    controller: _typeController,
                  ),
                  TextFormField(
                    decoration: const InputDecoration(labelText: 'payload'),
                    validator: (v) {
                      return v!.trim().length % 2 == 0
                          ? null
                          : 'length must be even';
                    },
                    controller: _payloadController,
                  ),
                  ElevatedButton(
                    child: const Text('OK'),
                    onPressed: () {
                      if ((_formKey.currentState as FormState).validate()) {
                        Navigator.pop(
                            context,
                            ndef.NDEFRecord(
                                tnf: ndef
                                    .TypeNameFormat.values[_dropButtonValue],
                                type: (_typeController.text).toBytes(),
                                id: (_identifierController.text).toBytes(),
                                payload: (_payloadController.text).toBytes()));
                      }
                    },
                  ),
                  ElevatedButton(
                    child: const Text('Delete'),
                    onPressed: () {
                      if ((_formKey.currentState as FormState).validate()) {
                        Navigator.pop(context, 'Delete');
                      }
                    },
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

```

```dart
// text_record_setting.dart
import 'package:flutter/material.dart';

import 'package:ndef/ndef.dart' as ndef;

class NDEFTextRecordSetting extends StatefulWidget {
  final ndef.TextRecord record;

  NDEFTextRecordSetting({Key? key, ndef.TextRecord? record})
      : record = record ?? ndef.TextRecord(language: 'en', text: ''),
        super(key: key);

  @override
  _NDEFTextRecordSetting createState() => _NDEFTextRecordSetting();
}

class _NDEFTextRecordSetting extends State<NDEFTextRecordSetting> {
  final GlobalKey _formKey = new GlobalKey<FormState>();
  late TextEditingController _languageController;
  late TextEditingController _textController;
  late int _dropButtonValue;

  @override
  initState() {
    super.initState();

    _languageController = new TextEditingController.fromValue(
        TextEditingValue(text: widget.record.language!));
    _textController = TextEditingController.fromValue(
        TextEditingValue(text: widget.record.text!));
    _dropButtonValue = ndef.TextEncoding.values.indexOf(widget.record.encoding);
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Set Record'),
        ),
        body: Center(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10),
            child: Form(
              key: _formKey,
              autovalidateMode: AutovalidateMode.always,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                children: <Widget>[
                  DropdownButton(
                    value: _dropButtonValue,
                    items: const [
                      DropdownMenuItem(value: 0, child: Text('UTF-8')),
                      DropdownMenuItem(value: 1, child: Text('UTF-16')),
                    ],
                    onChanged: (value) {
                      setState(() {
                        _dropButtonValue = value as int;
                      });
                    },
                  ),
                  TextFormField(
                    decoration: const InputDecoration(labelText: 'language'),
                    validator: (v) {
                      return v!.trim().length % 2 == 0
                          ? null
                          : 'length must not be blank';
                    },
                    controller: _languageController,
                  ),
                  TextFormField(
                    decoration: const InputDecoration(labelText: 'text'),
                    controller: _textController,
                  ),
                  ElevatedButton(
                    child: const Text('OK'),
                    onPressed: () {
                      if ((_formKey.currentState as FormState).validate()) {
                        Navigator.pop(
                            context,
                            ndef.TextRecord(
                                encoding:
                                    ndef.TextEncoding.values[_dropButtonValue],
                                language: (_languageController.text),
                                text: (_textController.text)));
                      }
                    },
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

```

```dart
// uri_record_setting.dart
import 'package:flutter/material.dart';

import 'package:ndef/ndef.dart' as ndef;

class NDEFUriRecordSetting extends StatefulWidget {
  final ndef.UriRecord record;

  NDEFUriRecordSetting({super.key, ndef.UriRecord? record})
      : record = record ?? ndef.UriRecord(prefix: '', content: '');

  @override
  _NDEFUriRecordSetting createState() => _NDEFUriRecordSetting();
}

class _NDEFUriRecordSetting extends State<NDEFUriRecordSetting> {
  final GlobalKey _formKey = new GlobalKey<FormState>();
  late TextEditingController _contentController;
  String? _dropButtonValue;

  @override
  initState() {
    super.initState();

    _contentController = new TextEditingController.fromValue(
        TextEditingValue(text: widget.record.content!));
    _dropButtonValue = widget.record.prefix;
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Set Record'),
        ),
        body: Center(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10),
            child: Form(
              key: _formKey,
              autovalidateMode: AutovalidateMode.always,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                children: <Widget>[
                  DropdownButton(
                    value: _dropButtonValue,
                    items: ndef.UriRecord.prefixMap.map((value) {
                      return DropdownMenuItem<String>(
                          value: value, child: Text(value));
                    }).toList(),
                    onChanged: (String? value) {
                      setState(() {
                        _dropButtonValue = value;
                      });
                    },
                  ),
                  TextFormField(
                    decoration: const InputDecoration(labelText: 'content'),
                    controller: _contentController,
                  ),
                  ElevatedButton(
                    child: const Text('OK'),
                    onPressed: () {
                      if ((_formKey.currentState as FormState).validate()) {
                        Navigator.pop(
                            context,
                            ndef.UriRecord(
                              prefix: _dropButtonValue,
                              content: (_contentController.text),
                            ));
                      }
                    },
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

```
