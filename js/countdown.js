
var host = window.location.hash.substr(1);

var message = document.getElementById('message');
message.innerHTML = 'You can use ' + host + ' in:';

chrome.extension.onRequest.addListener(function (countdownInfo) {
   if (countdownInfo.host === host && !countdownInfo.countdownFinished && countdownInfo.secondsLeft >= 0)
   {
      var timeleft = document.getElementById('timeleft');
      timeleft.innerHTML = formatTime(countdownInfo.secondsLeft);
   }
});

function formatTime(seconds)
{
  var minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  return minutes + ':' + ((seconds < 10) ? '0' : '') + seconds;
}

