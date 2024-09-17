document.getElementById('connect').addEventListener('click', () => {
  const url = document.getElementById('url').value;
  chrome.runtime.sendMessage({ action: 'connectWebSocket', url: url }, (response) => {
    document.getElementById('status').textContent = response.status;
  });
});

document.getElementById('disconnect').addEventListener('click', () => {
  // Implement disconnect logic if necessary
  document.getElementById('status').textContent = 'Disconnect functionality not yet implemented.';
});
