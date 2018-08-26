$(document).ready(function() {
  // if text is deleted in second-last input, remove last input if empty
  function delOptionHandler(i) {
    if (i === $('#option-container').children().length - 1 && !$(`#option${i}`).val()) {
      $(`#option${i + 1}`).parent().remove();
    }
  }

  // if text is added in last input, create a new input
  function addOptionHandler(i) {
    if (i === $('#option-container').children().length && $(`#option${i}`).val()) {
      $(`<p><input id="option${i + 1}" class="text_option" type="text" name="option${i + 1}" placeholder="enter next option"></p>`)
      .appendTo('#option-container')
      .keyup(() => addOptionHandler(i + 1))
      .keyup(() => delOptionHandler(i + 1));
    }
  }
  
  $('#option2').keyup(() => addOptionHandler(2));
  $('#option2').keyup(() => delOptionHandler(2));
});
