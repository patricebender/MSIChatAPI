const app = require("express")();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, function() {
	console.log(`App listening on ${PORT}`);
});


const io  = require('socket.io').listen(server);


io.on('connection', function(socket){

	socket.on("join_chat", (data) => {
		console.log(`${data.nick} joined`)
	});

	socket.on("disconnect", () => {
		console.log(`someone left chat`)
	});

	socket.on("message", (msg) => {
		socket.broadcast.emit("newMessage", msg)
	});

});

