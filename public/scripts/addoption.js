//jshint esversion: 6

$(document).ready(function(){
    $(`<p><input id="option1" type="text" name="option1" placeholder="enter option"></p>`).appendTo(`#option-container`);
    $(`<p><input id="option2" type="text" name="option2" placeholder="enter next option"></p>`).appendTo(`#option-container`);

  $("#option-container").change(function (n) {

    n = $(`#option-container`).children().length + 1;
    const $newOption = $(`<p><input id="option${n}" type="text" name="option${n}" placeholder="enter next option"></p>`);
    $newOption.appendTo(`#option-container`);
  });

});
