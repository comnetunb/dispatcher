/*
 *
 * Copyright (c) 2017 Matheus Medeiros Sarmento
 *
 */

// General
const net = require('net');
const EventEmitter = require('events');
const dispatcherProtocol = require('dispatcher-protocol');

const event = new EventEmitter();
module.exports.event = event;

// Master Related
const dwpManager = rootRequire('servers/master/dwp_handler/manager');

// Shared Related
const log = rootRequire('servers/shared/log');

// Protocol Related
const { factory } = dispatcherProtocol;

// TCP socket in which all the master-slaves communication will be accomplished
const server = net.createServer();

module.exports.execute = () => {
  server.on('connection', (connection) => {
    // Creates a buffer for each connection
    let buffer = '';

    event.emit('new_connection', connection);

    connection.once('close', () => {
      event.emit('closed_connection', connection);
    });

    connection.on('data', (data) => {
      // Treat chunk data
      buffer += data;

      let packet;
      try {
        do {
          // This may throw an exception
          packet = factory.expose(buffer);

          // This may throw an exception
          buffer = factory.remove(buffer);

          dwpManager.treat(packet, connection);
        } while (buffer.length !== 0);
      } catch (e) {
        // It is normal to end up here
        // Do not treat exception!
      }
    });

    connection.on('error', () => { });
  });

  // Open slave
  server.listen(16180, '0.0.0.0', () => {
    log.info(`TCP server listening ${server.address().address}:${server.address().port}`);
  });
};
