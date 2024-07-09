---
# 제목
title: "Dockerfile 명령어!"
# 부가 내용 미리보기
excerpt: "Dockerfile 명령어에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Docker
# 태그 
tags:
  - [docker, command]

# 
permalink: /docker/command/

toc: true
toc_sticky: false

date: 2023-02-26
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 Dockerfile 기본 명령어 

이미지를 만드는 데 사용한 Dockerfile의 기본적인 명령어를 살펴보겠습니다.
```
FROM
FROM <image>:<tag>
FROM ubuntu:16.04
```
베이스 이미지를 지정합니다. 반드시 지정해야 하며 어떤 이미지도 베이스 이미지가 될 수 있습니다. tag는 될 수 있으면 latest(기본값)보다 구체적인 버전(16.04등)을 지정하는 것이 좋습니다. 이미 만들어진 다양한 베이스 이미지는 Docker hub에서 확인할 수 있습니다.
```
MAINTAINER
MAINTAINER <name>
MAINTAINER subicura@subicura.com
```
Dockerfile을 관리하는 사람의 이름 또는 이메일 정보를 적습니다. 빌드에 딱히 영향을 주지는 않습니다.
```
COPY
COPY <src>... <dest>
COPY . /usr/src/app
```
파일이나 디렉토리를 이미지로 복사합니다. 일반적으로 소스를 복사하는 데 사용합니다. target디렉토리가 없다면 자동으로 생성합니다.
```
ADD
ADD <src>... <dest>
ADD . /usr/src/app
```
COPY 명령어와 매우 유사하나 몇가지 추가 기능이 있습니다. src에 파일 대신 URL을 입력할 수 있고 src에 압축 파일을 입력하는 경우 자동으로 압축을 해제하면서 복사됩니다.
```
RUN
RUN <command>
RUN ["executable", "param1", "param2"]
RUN bundle install
```
가장 많이 사용하는 구문입니다. 명령어를 그대로 실행합니다. 내부적으로 /bin/sh -c 뒤에 명령어를 실행하는 방식입니다.
```
CMD
CMD ["executable","param1","param2"]
CMD command param1 param2
CMD bundle exec ruby app.rb
```
도커 컨테이너가 실행되었을 때 실행되는 명령어를 정의합니다. 빌드할 때는 실행되지 않으며 여러 개의 CMD가 존재할 경우 가장 마지막 CMD만 실행됩니다. 한꺼번에 여러 개의 프로그램을 실행하고 싶은 경우에는 run.sh 파일을 작성하여 데몬으로 실행하거나 supervisord나 forego와 같은 여러 개의 프로그램을 실행하는 프로그램을 사용합니다.
```
WORKDIR
WORKDIR /path/to/workdir
```
RUN, CMD, ADD, COPY등이 이루어질 기본 디렉토리를 설정합니다. 각 명령어의 현재 디렉토리는 한 줄 한 줄마다 초기화되기 때문에 RUN cd /path를 하더라도 다음 명령어에선 다시 위치가 초기화 됩니다. 같은 디렉토리에서 계속 작업하기 위해서 WORKDIR을 사용합니다.
```
EXPOSE
EXPOSE <port> [<port>...]
EXPOSE 4567
Shell
도커 컨테이너가 실행되었을 때 요청을 기다리고 있는(Listen) 포트를 지정합니다. 여러개의 포트를 지정할 수 있습니다.
```
VOLUME
VOLUME ["/data"]
```
컨테이너 외부에 파일시스템을 마운트 할 때 사용합니다. 반드시 지정하지 않아도 마운트 할 수 있지만, 기본적으로 지정하는 것이 좋습니다.
```
ENV
ENV <key> <value>
ENV <key>=<value> ...
ENV DB_URL mysql
```
컨테이너에서 사용할 환경변수를 지정합니다. 컨테이너를 실행할 때 -e옵션을 사용하면 기존 값을 오버라이딩 하게 됩니다.

여기까지 Dockerfile에서 가장 많이 사용하는 명령어에 대해 알아보았습니다. 모든 명령어가 궁금하신 분은 공식문서를 참고하세요.