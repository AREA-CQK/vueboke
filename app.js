const express = require('express');

const path = require('path')
const bodyParse = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const router = require('./server/route')
var fs = require('fs');
const setting = require('./setting');
const app = express();
const sio = require('socket.io');




//路径拼接
const resolve = file => path.resolve(__dirname, file)

app.use('/dist', express.static(resolve('./dist')))
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: true }))

app.use(router)

// session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'boke',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    maxAge: 2592000000
  },
  store: new MongoStore({
    url: setting.dburl
  })
}))

app.get('*', function (req, res) {
  
  let html = fs.readFileSync(resolve('./' + 'index.html'), 'utf-8')
  res.send(html)
})

const server = app.listen(3300, function () {
  console.log('访问地址为 localhost:3300')
})
let io = sio.listen(server);
io.on('connection', function(client){
  console.log(client)
  client.on('sendMsg', function(data){
    console.log(data)
  });
  client.emit('sendMsg','hello')
  client.on('disconnect', function(){});
});

