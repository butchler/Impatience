$(function() {
   // Init blacklist/whitelist
   initListType();
   initSiteList();

   // Init timing
   initTiming('countdown');
   initTiming('allowed');
});


function initTiming(type)
{
   var minuteBox = $('#' + type + '-minutes');

   minuteBox.val(localStorage[type + 'Seconds'] / 60)

   var updateSeconds = function (e) {
      localStorage[type + 'Seconds'] = e.target.value * 60;
   };

   minuteBox.change(updateSeconds).blur(updateSeconds);
}


function initListType()
{
   $('#use-' + localStorage.listType)[0].checked = 'checked';

   $('input[name="list-type"]').change(function(e) {
      localStorage.listType = e.target.value;

      loadSites();
   });
}

function initSiteList()
{
   loadSites();

   // Init add site event
   $('#add-site').click(function(e) {
      var url = $('#url').val();
      addSite(getHostname(url));
   });
}
function loadSites()
{
   $('#site-list').empty();

   var sites = JSON.parse(localStorage[localStorage.listType]);

   sites.forEach(function(site) {
      $('#site-list').append('<li><span class="site">' + site + '</span> <a class="remove" href="#" onclick="removeSite(\'' + site + '\');">remove</a></li>');
   });
}

function addSite(newSite)
{
   //removeSite(newSite);

   var sites = JSON.parse(localStorage[localStorage.listType]);
   sites.push(newSite);
   localStorage[localStorage.listType] = JSON.stringify(sites);

   loadSites();
}

function removeSite(removedSite)
{
   var sites = JSON.parse(localStorage[localStorage.listType]);
   sites = sites.filter(function(site) { return site !== removedSite; });
   localStorage[localStorage.listType] = JSON.stringify(sites);

   loadSites();
}


function getHostname(url)
{
   // Return anything after the protocol and www. that does not have slash in it (and hope that that's actually the domain name)
   var matches = url.match(new RegExp('^([^:]*://)?(www\.)?([^/]+)', 'i'));
   return (matches !== null) ? matches[3] : url;
}
