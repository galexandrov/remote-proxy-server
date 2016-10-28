# remote-proxy-server
Remote proxy server used for NativeScript debugging

**Node-Inspector changes**
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
```

**Samples**

[![Emulator](https://appetize.io/images/nexus5_black.png)](https://appetize.io/embed/uvccy3u5y273t1rfg45u3wrqbg?device=nexus5&scale=75&orientation=portrait&osVersion=6.0)


**Other Resources**

https://github.com/node-inspector/node-inspector

https://github.com/node-inspector/node-inspector/wiki/Developer's-Guide

https://github.com/v8/v8/wiki/Debugging-Protocol

https://github.com/buggerjs/bugger-v8-client/blob/master/PROTOCOL.md

