$(function(){
	$(window).keydown(function(e){
    var n = 10;

    switch ( String.fromCharCode(e.keyCode) ) {
      case 'H':
        window.scrollBy( n * -1, 0 );
        break;
      case 'J':
        window.scrollBy( 0, n );
        break;
      case 'K':
        window.scrollBy( 0, n * -1 );
        break;
      case 'L':
        window.scrollBy( n, 0 );
        break;
    }
  });
});

