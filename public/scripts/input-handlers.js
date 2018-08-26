$(document).ready(function() {
  // if everything's empty, reset placeholders
  // { ... }

  var MAX_INPUTS = 10;

  // if text is deleted in second-last input, remove last input (actually, its parent <P>) if empty
  function delOptionHandler(i) {
    if (i === $('#option-container').children().length - 1
        && !$(`#option${i}`).val()) {
      $(`#option${i + 1}`).parent().fadeOut(200, () => $(`#option${i + 1}`).parent().remove());
    }
  }

  // if text is added in last input, create a new input, up to MAX_INPUTS
  function addOptionHandler(i) {
    if (i <= MAX_INPUTS - 1
        && i === $('#option-container').children().length
        && $(`#option${i}`).val()) {
      $(`<p><input id="option${i + 1}" class="text_option" type="text" name="option${i + 1}" placeholder="enter next option"></p>`)
      .appendTo('#option-container')
      .keyup(() => addOptionHandler(i + 1))
      .keyup(() => delOptionHandler(i + 1))
      .hide().fadeIn(200);
    }
  }
  
  // add handlers to third input on page (not to first two, since first three always stay on the page)
  $('#option3').keyup(() => addOptionHandler(3));
  $('#option3').keyup(() => delOptionHandler(3));
});
