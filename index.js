const express = require("express");
const app = express();
const http = require('http').Server(app);

const io = require('socket.io')(http);


app.get("/", (req,res) => {
	res.send({hello: "World"});
});

io.on('connection', function(socket){
  console.log('an user connected');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
	console.log(`App listening on ${PORT}`);
});
