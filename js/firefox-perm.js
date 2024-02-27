$(function() {
  var query = getQueryString();
  var perms = JSON.parse(query.perms);

  $("#perms").text(JSON.stringify(perms, null, 2));
  $("#success, #error").hide();
  $("#grantBtn").click(function() {
    $("#success, #error").hide();
    brapi.permissions.request(perms, function(granted) {
      if (granted) {
        $("#success").show();
        if (query.then == "auth-wavenet") getBackgroundPage().then(callMethod("authWavenet")).then(closeThisTab);
        else if (query.then == "auth-gtranslate") getBackgroundPage().then(callMethod("authGoogleTranslate"))
      }
      else $("#error").show();
    })
  })
})

function closeThisTab() {
  brapi.tabs.getCurrent(function(tab) {
    brapi.tabs.remove(tab.id);
  })
}
