# [CS496_Week4]
## Project Name: ERS+ (Egyptian Rat Screw +)
### Team: [James Sejoon Huh](https://github.com/kebobojames), [SeungMin Lee](https://github.com/iamlsm97)

## 1. frontend
- Vue.js, vue-socket.io
- Code dependencies
    - vue, vue-router,
    - vuex, vuex-router-sync,
    - axios, vue-axios,
    - socket.io-client, vue-socket.io,
    - bootstrap, bootstrap-vue,
    - jquery

Install dependencies:
```bash
$ npm install
```
Run web application:
```bash
$ npm run dev
```
Then, open http://localhost:8080 on browser

## 2. backend
- Node.JS, mongoDB, socket.io
- Code dependencies: express, mongoose, socket.io
- Server host: http://localhost:3000 default

Install dependencies:
```bash
$ npm install
```
Run server:
```bash
$ npm start
```

### RESTful API
- GET /
- GET /roomlist
- POST /roomlist
- PUT /roomlist/:id
- DELETE /roomlist/:id

## 3. Code Structure

- backend/
    - bin/
        - www : server code with socket.io
    - models/
        - schema.js : mongoDB Schema
    - routes/
        - api.js : response to RESTful API
        - index.js
    - views/
        - index.jade
    - app.js: main JavaScript Server code
    - package.json : include code dependencies
- frontend/
    - config/
        - index.js : proxyTable :8080/api => :3000/api
    - src/
        - components/
            - Chat.vue : chat area vue component
            - Game.vue : main game area vue component
            - Layout.vue : main layout
            - MainPage.vue : login page
            - RoomList.vue : roomlist showing vue component
        - router/
            - index.js : vue-router code
        - store/
            - index.js : vuex code
        - App.vue : root vue component
        - main.js : root vue code
    - static/
        - cards/ 
        - egypt.jpg 
        - typo.png 
    - index.html : root html including `<head></head>` of html
    - package.json : include code dependencies
