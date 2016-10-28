# remote-proxy-server
Remote proxy server used for NativeScript debugging

Node-Inspector changes
```
Debugger.prototype._setupConnection = function() {
  var connection = Net.createConnection(this._port, "SERVER_ADDRESS"),
      protocol = new Protocol();
  
  protocol.onResponse = this._processResponse.bind(this);

  connection
    .on('connect', this._onConnectionOpen.bind(this))
    .on('data', protocol.execute.bind(protocol))
    .on('error', this._onConnectionError.bind(this))
    .on('end', this.close.bind(this))
    .on('close', this._onConnectionClose.bind(this))
    .setEncoding('utf8');
    
  this._connection = connection;
};

Debugger.prototype._onConnectionOpen = function() {
  this._connected = true;
  this._connection.write("{\"handshake-key\":\"xervca04kxz4mgja5d4jme59a8\"}");
  this.emit('connect');
};