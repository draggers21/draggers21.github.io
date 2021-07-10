setTimeout(function(){
    $("#full-page-loader").addClass("animated fadeOut");
    setTimeout(function(){
      $("#full-page-loader").removeClass("animated fadeOut");
      $("#full-page-loader").css("display","none");
    },500);
},1000);