$(document).ready(function () {
    var animateBurger = function(){
      $('.animated').addClass('fadeInDown');
      setTimeout(function(){
        $('.loading').addClass('fadeOutDown');
        console.log("3000");
      },3000);
      setTimeout(function(){
        $('.animated').removeClass('fadeInDown');
        $('.loading').removeClass('fadeOutDown');
        console.log("2500");

      }, 2500);
      setTimeout(function(){
          animateBurger();
          console.log("2510");
      }, 2510);
    }
    setTimeout(function(){
      animateBurger();
      console.log("10");

    },10);

  });