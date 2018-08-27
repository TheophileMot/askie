//jshint esversion: 6
function copyFunction() {
  const copyText = document.getElementById("voting_url");
  copyText.select();
  document.execCommand("copy");
}

(function clipboardCopy($) {
  $('#clipboard').one('click', function() {
    $("#clipboard").after("<br><span id='msg' style='color: blue;'><em>Copied to the clipboard!<em></span>");
  });
})(jQuery);
