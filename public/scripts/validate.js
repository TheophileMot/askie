function isCreateFormValid() {
  if (!$('#question').val().length) {
    return false;
  }
  let numValidOptions = 0;
  for (let i = 0; i < $('#option-container').children().length; i++) {
    if ($('.text_option').eq(i).val().length) {
      numValidOptions++;
    }
  }
  return numValidOptions >= 2;
}