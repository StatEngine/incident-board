const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto');

const port = process.env.PORT || 3100;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || '12345';

const app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Declare a json parser, which also verifies the sender
var jsonParser = bodyParser.json({
  verify: (req, res, buf, encoding) => {
    const calculatedSignature = `sha1=${crypto.createHmac('sha1', WEBHOOK_SECRET).update(buf, 'utf8').digest('hex')}`;
    if (calculatedSignature !== req.header('X-StatEngine-Signature')) throw new Error('Invalid Signature');
  }
})

// Define Routes
// simple page showing incidents
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

// incoming webhook route
app.post('/incoming-webhook', jsonParser, (req, res) => {
  io.emit('webhook-fired', req.body);

  console.dir('emitting')
  res.sendStatus(204);
})

io.on('connection', function(socket){
  console.log('a viewer connected');
});

// start listening
http.listen(port, err => {
  if (err) throw err
  console.log(`> Ready On Server http://localhost:${port}`)
})