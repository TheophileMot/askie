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
      $(`<div><input id="option${i + 1}" class="text_option" type="text" name="option${i + 1}" placeholder="enter next option"></div>`)
      .appendTo('#option-container')
      .keyup(() => addOptionHandler(i + 1))
      .keyup(() => delOptionHandler(i + 1))
      .hide().fadeIn(200);
    }
  }
  
  // add handlers to third input on page (not to first two, since first three always stay on the page)
  $('#option3').keyup(() => addOptionHandler(3));
  $('#option3').keyup(() => delOptionHandler(3));

  var MAX_EMAILS = 10;

//email handlers for done.ejs file
  function delEmailHandler(i) {
    if (i === $('.friends_email_list').children().length - 1
        && !$(`#email${i}`).val()) {
      $(`#email${i + 1}`).parent().fadeOut(200, () => $(`#email${i + 1}`).parent().remove());
    }
  }

  // if text is added in last input, create a new input, up to MAX_INPUTS
  function addEmailHandler(i) {
    if (i <= MAX_EMAILS - 1
        && i === $('.friends_email_list').children().length
        && $(`#email${i}`).val()) {
      $(`<p><input id="email${i + 1}" class="text_option" type="text" name="email${i + 1}" placeholder="enter next e-mail address"></p>`)
      .appendTo('.friends_email_list')
      .keyup(() => addEmailHandler(i + 1))
      .keyup(() => delEmailHandler(i + 1))
      .hide().fadeIn(200);
    }
  }
  $('#email3').keyup(() => addEmailHandler(3));
  $('#email3').keyup(() => delEmailHandler(3));
});
