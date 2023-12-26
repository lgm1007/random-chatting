<h1 align="center">
    Socket Chattings 앱
</h1>

## 📝기획노트
### 기능
* 랜덤 대상 채팅 애플리케이션
* 채팅 데이터는 DB 상에 저장 관리한다.
### 기술 스택
* Nest.js
* MongoDB

## 💾Installation

```bash
$ npm install
```

## 🚀Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 🧪Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## DB Struct
* socket_model
```
{
    id: socket.id,
    userName: 사용자 이름
}
```

* chattings_model
```
{
    _id: 1120978jdk391012u (ObjectId),
    user: {
        _id: dalkshjdkj30192323j (ObjectId),
        id: socket.id,
        userName: 사용자 이름
    },
    chat: 채팅 내용
}
```

## Application ScreenShot
![screenshot](https://github.com/lgm1007/random-chatting/assets/57981691/052cb6ec-d181-4376-8bfc-4e4ffabc9c28)

## 📜License

Nest is [MIT licensed](LICENSE).
