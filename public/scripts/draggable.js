//jshint esversion: 6
  function allowDrop(event) {
    event.preventDefault();
  }

  function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
  }

  function drop(event) {
    console.log("Event.target", event.target);
    event.preventDefault();
    const option = document.getElementById(event.dataTransfer.getData("text"));
    const srcParent = option.parentNode;
    const target = event.currentTarget.firstElementChild;
    event.currentTarget.replaceChild (option, target);
    srcParent.appendChild(target);
  }
