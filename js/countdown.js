var countdownInterval;

function startCountdown()
{
  chrome.tabs.getCurrent(function (tab) {
    chrome.extension.sendRequest({ 'request': 'getCountdownInfo', 'tabId': tab.id }, function(countdownInfo) {
      if (countdownInfo != null)
      {
        var message = document.getElementById('message');
        message.innerHTML = 'You can use ' + countdownInfo.host + ' in:';
      }
    });
  });

  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown()
{
  chrome.tabs.getCurrent(function (tab) {
    chrome.extension.sendRequest({ 'request': 'getCountdownInfo', 'tabId': tab.id }, function(countdownInfo) {
      if (countdownInfo != null && countdownInfo.secondsLeft > 0)
      {
        var timeleft = document.getElementById('timeleft');
        timeleft.innerHTML = formatTime(countdownInfo.secondsLeft);
      }
      else if (countdownInterval)
      {
         clearInterval(countdownInterval);
      }
    });
  });
}

function formatTime(seconds)
{
  var minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  return minutes + ':' + ((seconds < 10) ? '0' : '') + seconds;
}

startCountdown();

