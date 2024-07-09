---
# 제목
title: "Docker 를 사용한 예제!"
# 부가 내용 미리보기
excerpt: "Docker 를 사용해 Dart, Php, MySql, Docker에 연동에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Docker
# 태그 
tags:
  - [docker, example]

# 
permalink: /docker/example/

toc: true
toc_sticky: false

date: 2023-02-28
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 

#  📖 설치 
[설치하러가기](https://docs.docker.com/desktop/install/mac-install/)

설치 완료하면, 튜토리얼도 잘알려준다.
``` bash
docker run --name repo alpine/git clone https://github.com/docker/getting-started.git
docker cp repo:/git/getting-started/ .
```
``` bash
cd getting-started                            
docker build -t docker100tutorial .
```
```bash
docker run -d -p 80:80 --name docker-tutorial docker101tutorial
```
``` bash
docker tag docker101tutorial 아이디/docker101tutorial
docker push 아이디/docker101tutorial
```


# 세팅
![](https://velog.velcdn.com/images/sht-3756/post/7a43fd74-0be0-4e2a-b916-5b3218285590/image.png)

파일 생성 1) dockerfile
``` php
// 우분투 18.04 버전으로 
FROM ubuntu:18.04

ARG DEBIAN_FROMTEND=noninteractive
// Run 명령어로 apt-get update 실행하고,
// 리눅스를 설치한 직후에 패키지 관리자를 최신 버전으로 업데이트하겠다.
// &&그리고 apt-get을 통해서 apcahe2 와 software-properties-common 를 설치하는데 중간에 물어보는게 있으면 -y yes 하겠다.
RUN apt-get update && apt-get -y install apache2 software-properties-common

// 언어는 모두 UTF-8 로 해주고, add-apt-repository 와 ppa:ondrej/php 를 해야지 php 설치할수 있다.
RUN LC_ALL=C.UTF-8 add-apt-repository ppa:ondrej/php

// 윗줄에서 새로운 레퍼지토리를 추가했으니 다시 업데이트하고, 
// libapache2-mod-php7.0 을 설치,
// php7.0 설치, 
// php7.0-cli 설치, 
// php7.0-mysql 설치
RUN apt-get update && apt-get install -y libapache2-mod-php7.0 php7.0 php7.0-cli php7.0-mysql

RUN a2enmod rewrite
// 80 포트 열어주고
EXPOSE 80
// 아파치 백그라운드로 실행시켜주고,
CMD apachectl -D FOREGROUND
```
파일 생성 2) docker-componse.yml
``` php
// 도커 컴포즈버전 3.3 을 사용할것이다.
version: "3.3"

// 서비스안에 웹서버(php) 와 mysql 을 사용하겠다. 그래서 같은 폴더안에 두었다.
services:
  webserver:
    build: . // 현재 디렉토리에있는 도커 파일 찾아 빌드하겠다.
    ports: // 포트는 9001 번을사용하면 php 의 80포트와 연결이 되게하겠다.
      - "9001:80"
    links: // 하단에 있는 services.mysql와 같은 다른 컨테이너와 연결하려고 
      - mysql:mysql
    restart: always // 항상 재시작하게 
    volumes: // php 에서 만들어지면 내부에 html php 코드를  로컬 폴더의 html 폴더와 연결을 하겠다.
    // 생성된 컨테이너 내부에 들어가서 파일을 올리는 것이 아닌!  우리 로컬pc 에다가 작업을 하면 연결이 돼서 자동으로 보게 하겠다.
      - ./html:/var/www/html/
    depends_on: // 하단의 mysql을 의존하게 하겠다. DB가 만들어진 다음 서버가 실행되게 하겠다. 
      - mysql

  mysql:
    image: mysql:5.7 // 버전은 5.7버전 사용 하겠다.
    platform: linux/amd64 // m1 맥북은 꼭 추가해야할 것!
    environment: // mysql 을 설치 후 루트 계정을 만들어야 하는데, 그 정보를 미리 작성한 것
      MYSQL_ROOT_PASSWORD: "json"
      MYSQL_USER: "shin"
      MYSQL_PASSWORD: "json"
      MYSQL_DATABASE: "myDB"
    volumes: // mysql db 가 저장되는 볼륨을 로컬 pc 의 data 로 세팅 
      - ./data:/var/lib/mysql
    ports: // mysql의 기본 포트는 3306이다. 
    // 로컬에서 사용할때 52000으로 사용하겠다.
      - "52000:3306"

```

명령어 실행
```
docker-compose build // 도커 컴포즈의 설정을 활용해 빌드를 수행
docker-compose up -d //백그라운드에서 실행
```
이렇게 폴더가 두개 생기고!
![](https://velog.velcdn.com/images/sht-3756/post/f0392de2-0c5c-4554-8223-7a3051c2f70a/image.png)

도커 대쉬보드에서도 컨테이너 실행되는것 확인! 
![](https://velog.velcdn.com/images/sht-3756/post/06a34b63-9aa2-4821-b947-ad717e2d3668/image.png)
웹으로 접속가능! 아직은 아무것도 없음
![](https://velog.velcdn.com/images/sht-3756/post/712bf361-ec03-41f6-8452-5c736a68ea0c/image.png)

php 잘 설치되었는지 확인!
main > db_setup.php 생성
``` php
<?php>
phpinfo();
?>
```
![](https://velog.velcdn.com/images/sht-3756/post/eb94813c-8160-4755-addd-dc8fc452b765/image.png)

데이터 베이스 설정도 확인 해보기 위한 확장 설치
![](https://velog.velcdn.com/images/sht-3756/post/44315a06-f35c-40f5-9d36-fc687eb4035c/image.png)

database 확장 프로그램 클릭하면, 열리는 창이다. 컴포즈에 설정한데로 설정하고 커넥트!
![](https://velog.velcdn.com/images/sht-3756/post/aa8c6dbf-f6a0-4293-8300-30c83ce9e1ad/image.png)

그러면 밑의 그림 처럼 폴더가 생긴다.
![](https://velog.velcdn.com/images/sht-3756/post/db679b49-ef38-4fe4-8f72-197443cd99ac/image.png)

테이블 생성!
``` table
CREATE TABLE board(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Create Time',
    content VARCHAR(255) COMMENT 'content',
    name VARCHAR(255)
) COMMENT '';
```
결과로 테이블 잘생긴거 볼 수 있고, Generate Mock Data 를 클릭하면 mock 데이터를 추가할수있다.
![](https://velog.velcdn.com/images/sht-3756/post/aab6c987-0a31-4eb3-a14b-0cf9ff869320/image.png)

이렇게 mock data가 들어간걸 확인가능, 
![](https://velog.velcdn.com/images/sht-3756/post/8981e687-4eb6-4648-84e2-f16c99948634/image.png)

디비 확인끝!


## 데이터베이스 연결
``` php
<?php
$mysql_hostname = 'host.docker.internal';

$mysql_username = 'shin';
$mysql_password = 'json1';
$mysql_database = 'myDB';
$mysql_port = '52000';
$mysql_charset = 'UTF8';

$conn = new mysqli($mysql_hostname, $mysql_username, $mysql_password, $mysql_database, $mysql_port, $mysql_charset);

if($conn->connect_errno) {
    echo '[연결 실패...] : '.$conn->connect_error.'';    
}

echo 'Hello World';

?>

```
![](https://velog.velcdn.com/images/sht-3756/post/784cfa1b-b8c6-47f8-8c67-63f3c138afc4/image.png)

html > query.php 생성
``` php
<?php 
// db_setup.php을 사용하겠다.
include('db_setup.php');

// 배열만든다.
$results = array();

// 쿼리 실행 (board 테이블 전체조회)
$result = $conn->query("SELECT * FROM board");
// while 반복문 한 행씩 가져온다. fetch_array : array 있는 데이터를 페치해서 가져온다. 옵션(컬럼명을 알아서 테이블의 타이틀로 자동으로 써준다.)
while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
// 한 행에 add 가 된다.
    $results[] = $row;
}

// 리턴 
header('Content-type: application/json');
// db 에서 가져온걸 json 형태로 바꿔준다. 옵션(integer 값을 알아서 int 로 처리)
echo json_encode($results, JSON_NUMERIC_CHECK);

$conn->close();

?>
```

## 등록 기능 
html > insert.php 
```php
<?php
include('db_setup.php');
// Get 메소드로 가져온다.
$content = $_GET[content];
// sql 문
$sql = "INSERT INTO board (content) VALUES ('$content')";

// 쿼리 수행한다. 
if($conn->query($sql)) {
// 성공시 출력
    echo 'Insert New Record';    
} else {
// 실패시 에러 출력
    echo $conn->error;
}

// 디비 닫기
$conn->close();
?>
```
![](https://velog.velcdn.com/images/sht-3756/post/cd80b1ef-870b-4a3c-8a59-77ed11c71a97/image.png)


![](https://velog.velcdn.com/images/sht-3756/post/b8e553f6-46e6-4c95-90e2-c7fa59ba345d/image.png)

query.php 가서 리스트의 맨마지막 확인해보면? 
![](https://velog.velcdn.com/images/sht-3756/post/2ae8fd5c-417a-4cdf-aa68-4f14bc07209d/image.png)


## 수정 기능 
html > update.php
```php
<?php
include('db_setup.php');

$id = $_GET[id];
$content = $_GET[content];

$sql = "UPDATE board SET content='$content', create_time=CURRENT_TIMESTAMP WHERE id=$id";

if($conn->query($sql)) {
    echo 'Updated';    
} else {
    header("HTTP/1.1 400 Not Found");
    echo $conn->error;
}

$conn->close();
?>
```

![](https://velog.velcdn.com/images/sht-3756/post/d29821bc-dac8-413b-bc51-04e5246df749/image.png)

db timezone 설정을 안해서 그렇지 잘 업데이트 되었다.
![](https://velog.velcdn.com/images/sht-3756/post/bfe2504c-1cae-4c94-8d50-af7a23793eb3/image.png)

## 삭제 기능 
html > delete.php
``` php
<?php
include('db_setup.php');

$id = $_GET[id];

$sql = "DELETE FROM board WHERE id=$id";

if($conn->query($sql)) {
    echo 'Deleted';    
} else {
    header("HTTP/1.1 400 Not Found");
    echo $conn->error;
}

$conn->close();
?>
```

# 플러터 앱을 만들어서 연동
``` dart
dependencies:
	 http: ^0.13.4
	freezed_annotation: ^1.1.0
	provider: ^6.0.2
	json_annotation: ^4.5.0
    
dev_dependencies:
  freezed: ^1.1.1
  json_serializable: ^6.1.5
  build_runner: ^2.1.8
```

api 연동 해주고, data-model 작업, repsotiroy, MVVM 에 맞게 작업을 해주면, 완료! 
``` dart
class BoardApi {
  final http.Client _client;

  // 10.0.2.2
  static const baseUrl = 'http://10.0.2.2:9001';

  BoardApi({http.Client? client}) : _client = (client ?? http.Client());

  Future<http.Response> query() async {
    return await _client.get(Uri.parse('$baseUrl/query.php'));
  }

  Future<http.Response> insert(String content) async {
    return await _client.get(Uri.parse('$baseUrl/insert.php?content=$content'));
  }

  Future<http.Response> update(int id, String content) async {
    return await _client.get(Uri.parse('$baseUrl/update.php?id=$id&content=$content'));
  }

  Future<http.Response> delete(int id) async {
    return await _client.get(Uri.parse('$baseUrl/delete.php?id=$id'));
  }
}
```
굳이 추가적으로 진행한 코드는 작성하지 않겠다. 
도커, php 언어 사용, mysql 로 백엔드를 작업한 것에 의미를 두자!