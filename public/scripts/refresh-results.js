// set up listener to refresh page with incoming vote results
$(document).ready(function() {
  var judgementList = 'judgement-excellent judgement-good judgement-bad judgement-terrible';

  // fade old progress bar, replace with new element from data.options
  function fadeThenReplace(oldId, newOption) {
    var $progressBar = $(`#${oldId}`);
    $progressBar.fadeOut(200, function() {
      var $progressParent = $progressBar.parent();
      $progressBar.remove();
      $newProgressBar = $('<div>')
        .attr('id', `option${newOption.id}`)
        .attr('class', `progress-bar progress-bar-info active ${newOption.judgement}`)
        .width(`${newOption.score}%`)
        .css('box-shadow', '-1px 10px 10px rgba(91, 192, 222, 0.7)');

      $progressParent.append($newProgressBar).hide().fadeIn(200);
    });
  }

  // query database for JSON object; repopulate page with latest results
  function refreshResults() {
    $.get(window.location.pathname + '-json')
      .done(function(data) {
        var i;
        
        $("#vote-message").text(data.voteMessage);

        // check whether options are in same order as from db query;
        //   those that are not get faded out and recreated
        var $resultsContainer = $('#results-container');
        for (i = 0; i < $resultsContainer.children().length; i++) {
          var $progressBar = $resultsContainer.children().eq(i).find('.progress-bar');          
          var oldId = $progressBar.attr('id');
          if (oldId.startsWith('option') && oldId !== `option${data.options[i].id}`) {
            $progressBar.attr('id', $progressBar.attr('id').replace('option', 'fading'));

            fadeThenReplace($progressBar.attr('id'), data.options[i]);
          }
        }

        // load data from db query into DOM
        for (i = 0; i < data.options.length; i++) {
          var option = data.options[i];
          $(`#option${option.id}`)
            .text(option.name)
            .width(`${option.score}%`)
            .removeClass(judgementList)
            .addClass(option.judgement)
        }
      });
  }
  
  setInterval(() => refreshResults(), 1 * 1000);
});