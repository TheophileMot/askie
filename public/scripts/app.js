// const express = require('express');

$(document).ready(() => {
  $('#create-poll').submit(function(event) {
    if (!isCreateFormValid()) {
      event.preventDefault();
    }
  });

  $('.poll').submit(function(event) {
    event.preventDefault();
    const optionsArr = [];
    const elements = document.querySelectorAll('.option-element');
    for (var i = 0; i < elements.length; i++) {
      optionsArr.push({
        name: elements[i].innerText,
        id: elements[i].getAttribute('optionId'),
      });
    }
    const pollId = $('input[name="poll_id"]').val();
    const url = $('input[name="url"]').val();
    const data = {
      pollId: pollId,
      options: optionsArr,
    };

    $.ajax( {
      url:'/poll/' + url,
      data: data,
      method:'post',
    })
      .done(function(response, status, xhr) {
        if (response.redirect) {
          window.location = response.redirectURL;
        }
      });
  });

  // from the index.ejs file - this adds functionality to the creation button
  $('#create-button').click(function() {
    window.location = '/create';
  });

  $('.composer').click(function() {
    window.location = '/create';
  });

  $('#error1').click(function() {
    window.location = '/create/error1';
  });
  $('#error2').click(function() {
    window.location = '/create/error2';
  });
  $('#error3').click(function() {
    window.location = '/create/error3';
  });

});