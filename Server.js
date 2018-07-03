var app     =     require("express")();
var mysql   =     require("mysql");
var http    =     require('http').Server(app);
var io      =     require("socket.io")(http);
io.on('connection',function(socket){  
  console.log("Socket is connected");
  
});

let services = require('./services.js');
myConnection = require('express-myconnection');
/* Creating POOL MySQL connection.*/

dbOptions = require('./dbConfig.js');
app.use(myConnection(mysql, dbOptions, 'request'));

app.get("/",function(req,res){
  res.sendFile(__dirname + '/index.html');
});



app.post("/addStatus",services.addStatus);


http.listen(3000,function(){
  console.log("Listening on 3000");
});