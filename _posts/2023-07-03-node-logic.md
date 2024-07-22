---
# 제목
title: "Node 구성 설계 로직 설명!"
# 부가 내용 미리보기
excerpt: "Node 구성 설계 로직 설명에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Node
# 태그 
tags:
  - [node, logic]

# 
permalink: /node/logic/

toc: true
toc_sticky: false

date: 2023-07-03
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 Node 구성 설계 로직

## 폴더 구조

```
src 
ㄴ-    app.js - 앱 시작점
ㄴ-    api - Express 라우트 컨트롤(app 의 모든 endpoint)
ㄴ-    config - 환경변수 및 구성 관련 설정
ㄴ-    jobs - agenda.js 를 위한 Jobs 정의
ㄴ-    loaders - 시작 프로세스 모델 분리
ㄴ-    models - 데이터베이스 모델
ㄴ-    services - 비즈니스 로직
ㄴ-    subscrivers - 이벤트 핸들러(비동기)
ㄴ-    types - 타입 정의 파일
```

## 3계층 설계
관심사 분리 원칙(principle of separation of concerns) 적용을 위한 비즈니스로직을 node.js 의 api routes 와 분리해준다.





Controller 에는 비즈니스 로직을 넣지 않는다!

바로 express.js controllers 단에 애플리케이션의 비즈니스 로직을 구현하면, 스파게티 코드가 되기 쉽다.

유닛테스트를 작성하다보면 수많은 req, res 를 다룰 예정이다.



언제 response data 를 클라이언트에게 보낼지, 프로세스를 백그라운드에서 실행할지 구분하는 것이 매우 어려워 지기 때문이다.

## Service 계층
비즈니스 로직은 서비스 단에 위치해야한다.

이유는 분명한 목적이 있는 클래스의 집합이며, SOLID 원칙을 적용한 모습으로 보면된다.



주의 사항

이 계층에는 SQL query 형태의 코드가 있어서는 안된다. => data access 계층에서 작성해야한다.

코드를 express.js router 에서 분리해라

service 계층에는 req, res 객체를 전달하지 마라

상태 코드 또는 headers 와 같은 HTTP 전송 계층과 관련된것들을 반환하지 마라
```js
route.post('/', 
  validators.userSignup, // this middleware take care of validation
  async (req, res, next) => {
    // The actual responsability of the route layer.
    const userDTO = req.body;

    // Call to service layer.
    // Abstraction on how to access the data layer and the business logic.
    const { user, company } = await UserService.Signup(userDTO);

    // Return a response to client.
    return res.json({ user, company });
  });
```

```js
import UserModel from '../models/user';
import CompanyModel from '../models/company';

export default class UserService() {

  async Signup(user) {
    const userRecord = await UserModel.create(user);
    const companyRecord = await CompanyModel.create(userRecord); // needs userRecord to have the database id 
    const salaryRecord = await SalaryModel.create(userRecord, companyRecord); // depends on user and company to be created
    
    ...whatever
    
    await EmailService.startSignupSequence(userRecord)

    ...do more stuff

    return { user: userRecord, company: companyRecord };
  }
}
```

## Pub/Sub 계층 
pub/sub 패턴은 전형적인 3계층을 넘어서지만 매우 유용하다.

간단한 node.js API endpoint 에서 사용자를 생성한뒤, third-party 서비스를 호출하거나, 서비스 분석을 시도하거나, 이메일 전송과 같은 작업을 하고 싶은 수 있다. 이렇게 간단한 create 작업이 여러가지 일을 시작하며, 하나의 함수 안에 수만줄이 넘어가는 코드가 생긴다.



이는 단일 책임의 원칙을 위배한다. (principle of single reponsibility)



책임들을 분리하면 코드를 간결하게 유지 가능하다.
```js
import UserModel from '../models/user';
import CompanyModel from '../models/company';
import SalaryModel from '../models/salary';

export default class UserService() {

  async Signup(user) {
    const userRecord = await UserModel.create(user);
    const companyRecord = await CompanyModel.create(user);
    const salaryRecord = await SalaryModel.create(user, salary);

    eventTracker.track(
      'user_signup',
      userRecord,
      companyRecord,
      salaryRecord
    );

    intercom.createUser(
      userRecord
    );

    gaAnalytics.event(
      'user_signup',
      userRecord
    );
    
    await EmailService.startSignupSequence(userRecord)

    ...more stuff

    return { user: userRecord, company: companyRecord };
  }

}
```

독립적인 서비스를 직접호출하는것은 최선이 아니다.

좋은 접근 방법은 이벤트를 발생시키는 게 하고, 리스터들이 역할에 책임을 지게하는 방법이다.
```js
import UserModel from '../models/user';
import CompanyModel from '../models/company';
import SalaryModel from '../models/salary';

export default class UserService() {

  async Signup(user) {
    const userRecord = await this.userModel.create(user);
    const companyRecord = await this.companyModel.create(user);
    this.eventEmitter.emit('user_signup', { user: userRecord, company: companyRecord })
    return userRecord
  }
}
```
여기서 이벤트 핸들러/ 리스너를 여러파일로 나눌수 있다.
```js
eventEmitter.on('user_signup', ({ user, company }) => {

  eventTracker.track(
    'user_signup',
    user,
    company,
  );

  intercom.createUser(
    user
  );

  gaAnalytics.event(
    'user_signup',
    user
  );
})
```
```js
eventEmitter.on('user_signup', async ({ user, company }) => {
  const salaryRecord = await SalaryModel.create(user, company);
})
```
```js
eventEmitter.on('user_signup', async ({ user, company }) => {
  await EmailService.startSignupSequence(user)
})
```
의존성 주입
의존선 주입 또는 제어의 역전은 구조화 할때 많이 사용하는데, 생성자클래스를 통해서 함수의 의존성을 전달해주는 방식이다.



의존성을 주입함으로써 유연하게 코드를 유지가능하다.

서비스 단에서 유닛테스트를 작성하거나 다른 context 에서 코드를 사용할때도 도움이 된다.



의존성을 주입하지 않은 예
```js
import UserModel from '../models/user';
import CompanyModel from '../models/company';
import SalaryModel from '../models/salary';  
class UserService {
  constructor(){}
  Sigup(){
    // Caling UserMode, CompanyModel, etc
    ...
  }
}
```
의존성을 주입한 예
```js
export default class UserService {
  constructor(userModel, companyModel, salaryModel){
    this.userModel = userModel;
    this.companyModel = companyModel;
    this.salaryModel = salaryModel;
  }
  getMyUser(userId){
    // models available throug 'this'
    const user = this.userModel.findById(userId);
    return user;
  }
}
```
직접 주입한 부분
```js
import UserService from '../services/user';
import UserModel from '../models/user';
import CompanyModel from '../models/company';
const salaryModelMock = {
  calculateNetSalary(){
    return 42;
  }
}
const userServiceInstance = new UserService(userModel, companyModel, salaryModelMock);
const user = await userServiceInstance.getMyUser('12346');
```

서비스가 가질 수 있는 종속성의 양은 무한대이며 새 인스턴스를 추가할 때 서비스의 모든 인스턴스화를 리팩토링 하는것은 힘들고 오타로 인한 오류가 많이 발생한다.

그래서 의존성 주입 프레임워크가 생기게 되었는데, Service Loadtor 를 호출하기만 하면 된다.

node.js 에서 의존성을 사용할 수 있게 만든 npm 라이브러리 이다. [typedi]



Node.js (Express.js) 에서 의존성 주입하기 

Routing 계층
```js
route.post('/', 
  async (req, res, next) => {
    const userDTO = req.body;

    const userServiceInstance = Container.get(UserService) // Service locator

    const { user, company } = userServiceInstance.Signup(userDTO);

    return res.json({ user, company });
  });
```
## Unit Testing
위의 계층 구조를 가지고 있으면 유닛 테스트는 매우 쉬워진다.

해당 res/req 객체들과 require 을 호출할 필요가 없어진다.
```js
import UserService from '../../../src/services/user';

describe('User service unit tests', () => {
  describe('Signup', () => {
    test('Should create user record and emit user_signup event', async () => {
      const eventEmitterService = {
        emit: jest.fn(),
      };

      const userModel = {
        create: (user) => {
          return {
            ...user,
            _id: 'mock-user-id'
          }
        },
      };

      const companyModel = {
        create: (user) => {
          return {
            owner: user._id,
            companyTaxId: '12345',
          }
        },
      };

      const userInput= {
        fullname: 'User Unit Test',
        email: 'test@example.com',
      };

      const userService = new UserService(userModel, companyModel, eventEmitterService);
      const userRecord = await userService.SignUp(teamId.toHexString(), userInput);

      expect(userRecord).toBeDefined();
      expect(userRecord._id).toBeDefined();
      expect(eventEmitterService.emit).toBeCalled();
    });
  })
})
```

## 스케줄링 및 반복 작업
위의 서비스단이 캡슐화가 되어있으므로, 스케쥴링 작업들도 쉽게 가능하다.

흔히 아는 코드를 지연시킬때 사용하는 setTImeout 같은 원시적인 방법을 사용하면 안된다.

데이터베이스에서 작업을 유지하고 실행하는 프레임워크를 사용해야한다. 

node.js dml 테스크매니져인 agenda.js 를 사용해야한다.

## 설정 및 시크릿 파일
Twelve-Factor APP 의 battle-tested 의 개념에 따라 node.js 에서는API Key 와 데이터 베이스 연결과 관련된 설정은 dotenv 를 사용하는 것이다.

.env 는 중요 키가 적혀있기에, 원격 저장소에 커밋하면 안된다.

npm 패키지인 dotenv 는 .env 파일을 로드해 안의 값들을 node.js 의 process.env 객체에 대입한다.

추가적으로 config/index.ts 파일에서 npm 패키지의 dotenv가 .env 파일을 로드하고 객체를 사용해 변수들을 저장한다. 

이를 통해 구조화가 가능하고 자동완성을 사용할 수 있다.


```js
// config/index.js

const dotenv = require('dotenv');
// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();

export default {
  port: process.env.PORT,
  databaseURL: process.env.DATABASE_URI,
  paypal: {
    publicKey: process.env.PAYPAL_PUBLIC_KEY,
    secretKey: process.env.PAYPAL_SECRET_KEY,
  },
  paypal: {
    publicKey: process.env.PAYPAL_PUBLIC_KEY,
    secretKey: process.env.PAYPAL_SECRET_KEY,
  },
  mailchimp: {
    apiKey: process.env.MAILCHIMP_API_KEY,
    sender: process.env.MAILCHIMP_SENDER,
  }
}
```

위의 방법으로 process.env.MY_RANDOM_VAR 무차별 난무하는것을 방지하고 코드 자동완성으로 env 변수명을 다시 작성할 필요가 없어진다.



## Loaders
node.js 서비스의 시작 프로세스를 테스트 가능한 모듈로 나눌 수 있다.

전형적인 express.js app 시작 부분을 보자
```js
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const errorhandler = require('errorhandler');
const app = express();

app.get('/status', (req, res) => { res.status(200).end(); });
app.head('/status', (req, res) => { res.status(200).end(); });
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json(setupForStripeWebhooks));
app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));
app.use(session({ secret: process.env.SECRET, cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

require('./config/passport');
require('./models/user');
require('./models/company');
app.use(require('./routes'));
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});


... more stuff 

... maybe start up Redis

... maybe add more middlewares

async function startServer() {    
  app.listen(process.env.PORT, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Your server is ready !`);
  });
}

// Run the async function to start our server
startServer();
위의 코드는 매우 지저분한데, 효과적으로 다시 정리해보자!

const loaders = require('./loaders');
const express = require('express');

async function startServer() {

  const app = express();

  await loaders.init({ expressApp: app });

  app.listen(process.env.PORT, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Your server is ready !`);
  });
}

startServer();
```

loaders 는 간단한 목적이 있는 작은 파일이다.
loaders/index.js

```js 
import expressLoader from './express';
import mongooseLoader from './mongoose';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  console.log('MongoDB Intialized');
  await expressLoader({ app: expressApp });
  console.log('Express Intialized');

  // ... more loaders can be here

  // ... Initialize agenda
  // ... or Redis, or whatever you want
}
```

loaders/express.js

```js
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

export default async ({ app }: { app: express.Application }) => {

  app.get('/status', (req, res) => { res.status(200).end(); });
  app.head('/status', (req, res) => { res.status(200).end(); });
  app.enable('trust proxy');

  app.use(cors());
  app.use(require('morgan')('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));

  // ...More middlewares

  // Return the express app
  return app;
});
```

loaders/mongoose.js
```js
import * as mongoose from 'mongoose'
export default async (): Promise<any> => {
  const connection = await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
  return connection.connection.db;
}
```

## 요약
- 3 계층 구조를 사용해라

- 비즈니스 로직은 express.js 의 controlelr 단에 작성하지 마라!

- 백그라운드 작업은 PubSub 패턴을 사용하고 이벤트를 발생시켜라

- 의존성을 주입시켜 사용해라

- 패스워트 Api key 등 중요한 것들은 노출시키지 않게 주의하고 configuration manager를 사용해라

- node.js 서버파일은 설정파일을 작은 모듈로 분리해 독립적으로 로드가능하게 만들어라!

## 참조 

[Bulletproof node.js project architecture 🛡️](https://www.softwareontheroad.com/ideal-nodejs-project-structure/)



[GitHub - santiq/bulletproof-nodejs: Implementation of a bulletproof node.js API 🛡️](https://github.com/santiq/bulletproof-nodejs)


