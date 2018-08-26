// set up listener to refresh page with incoming vote results
$(document).ready(function() {
  var judgementList = 'judgement-excellent judgement-good judgement-bad judgement-terrible';

  function refreshResults() {
    $.get(window.location.pathname + '-json')
    .done(function(data) {
      $("#vote-message").text(data.voteMessage);

      for (var i = 0; i < data.options.length; i++) {
        var option = data.options[i];
        $(`#option${option.id}`)
        .text(option.name)
        .width(`${option.score}%`)
        .removeClass(judgementList)
        .addClass(option.judgement);
      }
    });
  }
  
  setInterval(() => refreshResults(), 1 * 1000);
});