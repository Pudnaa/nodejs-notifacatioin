var app     =     require("express")();
var mysql   =     require("mysql");
var http    =     require('http').Server(app);
var io      =     require("socket.io")(http);

/* Creating POOL MySQL connection.*/

var pool    =    mysql.createPool({
  connectionLimit   :   100,
  host              :   'localhost',
  user              :   'root',
  password          :   '',
  database          :   'datastatus',
  debug             :   false
});

app.get("/",function(req,res){
  res.sendFile(__dirname + '/index.html');
});

/*  This is auto initiated event when Client connects to Your Machien.  */

io.on('connection',function(socket){  
  console.log("A user is connected");
  socket.on('status added',function(status){
    console.log("status added");
    add_status(status,function(res,error_from){
      console.log("refresh",status,'error_from',error_from);
      if(!res){
        io.emit('refresh feed',status);
      } else {
        io.emit('error');
      }
    });
  });
});

var add_status = function (status,callback) {
  pool.getConnection(function(err,connection){
    if (err) {
      console.log(err);
      callback(false,1);
      return;
    }
    connection.query("INSERT INTO `status` (`s_text`) VALUES ('"+status+"')",function(err,rows){
      connection.release();
      console.log(err);
      if(!err) {
        callback(true,2);
      }
    });
    connection.on('error', function(err) {
      console.log(err);
      callback(false,3);
      return;
    });
  });
}

http.listen(3000,function(){
  console.log("Listening on 3000");
});