//jshint esversion: 6

$(document).ready(function(){
    $(`<p><input id="option1" class="text_option" type="text" name="option1" placeholder="enter option"></p>`)
    .appendTo(`#option-container`);
    $(`<p><input id="option2" class="text_option" type="text" name="option2" placeholder="enter next option"></p>`)
    .appendTo(`#option-container`);

  function toggleBetweenAddAndRemove(){
    $(".text_option").blur(function (n) {
      var $option_container = $(`#option-container`);
      for( var index = 0; index < $option_container.children().length; index++ ){
        if ($option_container.children().eq(index).children().val() === ''){
          $option_container.children().eq(index).remove();
        }
      }
      
      const $newOption = $(`<p><input id="option${n}" class="text_option" type="text" name="option${n}" placeholder="enter next option"></p>`);
      $newOption.appendTo(`#option-container`);
      toggleBetweenAddAndRemove();
    });
  }
  toggleBetweenAddAndRemove();

});
