var express = require('express');
var bodyParser =  require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function middlewboare(req, res, next) {
    let string = req.method + ' ' + req.path + ' - ' + req.ip;
    absolutePath = __dirname + '/views/index.html';
    console.log(string);
    next();
})
app.get('/name', (req, res) =>{
    var { first: firstName, last: lastName } = req.query;
  res.json({
    name: `${firstName} ${lastName}`
  });
});
app.post('/name',  (req,res) => {
  var string = req.body.first + " " + req.body.last;
  res.send({ "name": string });
});
app.get('/:word/echo', (req,res,next) => 
{
  next();
  },
  (req,res) => {
    var word = req.params.word;
    res.send({"echo":word})
  });
app.get('/now',(req,res,next) => {
  next();
},
(req,res) => {
    var time = new Date().toString();
    res.send({"time": time});
}
);
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
  app.use(express.static(__dirname + "/public"));
}),
  app.get("/json", (req, res) => {
    if (process.env.MESSAGE_STYLE === "uppercase") {
      res.json({ "message": "HELLO JSON" });
    }
    res.json({ "message": "Hello json" });
});






















module.exports = app;

