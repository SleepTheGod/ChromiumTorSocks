const TOR_PROXY_HOST = '127.0.0.1';
const TOR_PROXY_PORT = 9050;

function setupWebSocketConnection(url) {
  // WebSocket client should connect through Tor's SOCKS5 proxy
  const ws = new WebSocket(url);

  ws.onopen = () => {
    console.log('WebSocket connection opened.');
    // Broadcast a message to all listeners
    chrome.runtime.sendMessage({ action: 'broadcastMessage', message: 'WebSocket connection established.' });
  };

  ws.onmessage = (event) => {
    console.log('Message from server:', event.data);
    // Handle incoming messages here
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  ws.onclose = () => {
    console.log('WebSocket connection closed.');
  };

  return ws;
}

// Listen for messages from the popup or other parts of the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'connectWebSocket') {
    setupWebSocketConnection(message.url);
    sendResponse({ status: 'WebSocket connection initiated.' });
  } else if (message.action === 'broadcastMessage') {
    chrome.runtime.sendMessage({ action: 'broadcast', message: message.message });
  }
});
