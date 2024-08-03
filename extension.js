const vscode = require('vscode');

function activate(context) {
  // Create a status bar item
  let myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  myStatusBarItem.tooltip = 'Current Time';
  myStatusBarItem.show();

  // Function to update the status bar item with the current time
  function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    myStatusBarItem.text = `$(dashboard) ${timeString}`;
  }

  // Update the time immediately and then every second
  updateTime();
  const interval = setInterval(updateTime, 1000);

  // Push the status bar item to the context's subscriptions
  context.subscriptions.push(myStatusBarItem);

  // Clear the interval when the extension is deactivated
  context.subscriptions.push({
    dispose: () => clearInterval(interval)
  });
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};