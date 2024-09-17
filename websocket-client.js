const WebSocket = require('ws');
const SocksProxyAgent = require('socks-proxy-agent');

const TOR_PROXY = 'socks5://127.0.0.1:9050';
const WEB_SOCKET_URL = 'wss://example.com/websocket'; // Replace with your WebSocket URL

const agent = new SocksProxyAgent(TOR_PROXY);
const ws = new WebSocket(WEB_SOCKET_URL, { agent });

ws.on('open', function open() {
  console.log('WebSocket connection opened.');
  ws.send('Hello from Tor WebSocket client');
});

ws.on('message', function incoming(data) {
  console.log('Message from server:', data);
});

ws.on('error', function error(err) {
  console.error('WebSocket error:', err);
});

ws.on('close', function close() {
  console.log('WebSocket connection closed.');
});
