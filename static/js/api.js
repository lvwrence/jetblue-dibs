function loadLandingPagePics() {
  $.ajax({
    url: "api/destinations",
    cache: false,
    success: onSuccess
  });

  function onSuccess(pics) {
    pics = JSON.parse(pics);
    for (var i = 0; i < pics.length; i++) {
        var pic = pics[i];

        insertPic(pic);
    }
  }  

  function insertPic(pic) {


    var img = '<img class="grid-item" src="' + pic.image + '"></img>';
    var txt = '<h2>' + pic.city + '</h2>';
    var div = '<div class="image">' + img + txt + '</div>'


    $('#pics').append($(div));
  }

  function setUpIsotope() {
    $('.grid').isotope({
      // options
      itemSelector: '.grid-item',
      layoutMode: 'fitRows'
    });
  }
}

loadLandingPagePics();
