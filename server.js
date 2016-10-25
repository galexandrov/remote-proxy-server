var net = require('net'),
	mobileClients = { __PORT: 8080 },
	inspectorClients = { __PORT: 443 }
	HANDSHAKE_REGEX = "{\"handshake-key\":\"(.*)\"}";

net.createServer(socket => {
	processSocketConnection(socket, mobileClients, inspectorClients)
}).listen(mobileClients.__PORT, () => {
	console.log("TCP server accepting mobile connections on port: " + mobileClients.__PORT);
});

net.createServer(socket => {
	processSocketConnection(socket, inspectorClients, mobileClients)
}).listen(inspectorClients.__PORT, () => {
	console.log("TCP server accepting inspector connections on port: " + inspectorClients.__PORT);
});

function processSocketConnection(socket, clientsArray, remotesArray) {
	socket.on('data', data => {
		if (!socket.handshakeKey) {
			var handshakeKey = tryParseHandshakeKey(data);
			if (handshakeKey) {
				socket.handshakeKey = handshakeKey;
				clientsArray[handshakeKey] = socket;
			}
		} else {
			var client = remotesArray[socket.handshakeKey];
			if (client) {
				client.write(data);
			}
		}
	});

	socket.on('error', error => {
		console.log(JSON.stringify(error));
	});

	socket.on('end', () => {
		if (socket.handshakeKey) {
			delete clientsArray[socket.handshakeKey];
		}
	});
}

function tryParseHandshakeKey(data) {
	try {
		var strData = String.fromCharCode.apply(null, data);
		return new RegExp(HANDSHAKE_REGEX, "gi").exec(strData)[1];
	} catch (e) {
		console.log(e);
	}
	return null;
}