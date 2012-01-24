if (getHost(document.referrer) != stripWWW(document.location.host))
{
   chrome.extension.sendRequest({ request: "isBlacklisted", host: document.location.host }, function() {
      insertTurtle();
      //chrome.extension.sendRequest({ request: "redirect", url: "countdown.html" });
   });
}

var secondsLeft = 0;
var countdownInterval;

// Inserts a div that covers the entire page, and displays a countdown until it is removed
function insertTurtle()
{
   jQuery(document.body).prepend('<div id="turtle"></div>');
   jQuery("#turtle").append('You can use ' + document.location.host + ' in <div class="countdown"></div>');

   chrome.extension.sendRequest({ request: "getSecondsToWait" }, function(secondsToWait) {
      secondsLeft = secondsToWait;
      countdownInterval = setInterval(countdown, 1000);
   });
}

function countdown()
{
   if (secondsLeft < 0)
   {
      removeTurtle();
      clearInterval(countdownInterval);
   }

   minutes = Math.floor(secondsLeft / 60);
   seconds = secondsLeft % 60;
   if (seconds < 10)
     seconds = '0' + seconds;

   jQuery("#turtle .countdown").html(minutes + ':' + seconds);

   secondsLeft -= 1;
}

function removeTurtle()
{
   jQuery("#turtle").remove();
}

function getHost(url)
{
   parts = url.split('/');

   if (parts[2] == undefined)
      return '';
   else
      return stripWWW(parts[2]);
}

function stripWWW(str)
{
   return str.replace(/^www\./, '');
}
