//require express
const app = require("express")();
const PORT = process.env.PORT || 3000;

// express server should listen on PORT
const server = app.listen(PORT, function () {
	console.log(`App listening on ${PORT}`);
});

// require socket.io and listen on express server
const io = require('socket.io').listen(server);

// listen to callback "on" for "connection" to receive socket events
io.on('connection', function (socket) {

	// broadcast join event to other clients
	socket.on("join", (data) => {
		socket.nick = data.nick;
		socket.broadcast.emit("userEvent", {  nick: socket.nick, event: "joined" })
	});

	// broadcast disconnect event to other clients
	socket.on("disconnect", () => {
		socket.broadcast.emit("userEvent", { nick: socket.nick, event: "left" })
	});

	// broadcast message event to other clients
	socket.on("message", (msg) => {
		socket.broadcast.emit("message", msg)
	});

});

