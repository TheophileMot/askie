$(document).ready(() => {
    $(".poll").on("submit", function(event) {
        event.preventDefault();
        const optionsArr = [];
        const elements = document.querySelectorAll(".option-element");
        for (var i = 0; i < elements.length; i++) {
          optionsArr.push(elements[i].innerText);
        }
        // console.log(options);
        const pollId = $("input[name='poll_id']").val();
        const url = $("input[name='url']").val();
        const data = { pollId: pollId, options: optionsArr };
        console.log(data);
        $.ajax( {url:'/poll/' + url, data: data, method:'post' } ).done(function(){

        }).catch(function(err){
            console.log(err);
        })
    })
})
