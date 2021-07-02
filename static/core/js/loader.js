setTimeout(function(){
    $("#full-page-loader").addClass("animated fadeOut");
    setTimeout(function(){
      $("#full-page-loader").removeClass("animated fadeOut");
      $("#full-page-loader").css("display","none");
      window.location.hash = '#main-page-content';
      window.location.hash = '';
    },500);
},1000);