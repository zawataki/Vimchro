const KEY_ESC = 27;
const KEY_INSERT = 45;

$(function(){

  var isInsertMode = false;
  var isIgnoreMode = false;
  var inputtedStr = "";
  var notify;

  $("input").focus(function(){
    isInsertMode = true;
  }).blur(function(){
    isInsertMode = false;
  });

  window.addEventListener( "keydown", (function(e){
    var n = 10;
    var isNeedCancel = true;

    if ( (e.shiftKey && e.keyCode == KEY_ESC) || e.keyCode == KEY_INSERT ) {
      isIgnoreMode = !isIgnoreMode;
      if ( isIgnoreMode ) {
        notify = noty({text: "Ignore All keys (Press &lt;Shift-Esc&gt; or &lt;Insert&gt; to exit)"});
      }
      else {
        notify.close();
      }

      e.preventDefault();
      e.stopPropagation();
      inputtedStr = "";
      return;
    }

    if ( !isInsertMode && !isIgnoreMode ) {
      if ( !e.altKey && e.ctrlKey && !e.shiftKey ) {
        var h = window.innerHeight;
        switch ( String.fromCharCode(e.keyCode) ) {
          case 'F':
            window.scrollBy( 0, h );
            break;
          case 'B':
            window.scrollBy( 0, h * -1 );
            break;
          case 'D':
            window.scrollBy( 0, h / 2 );
            break;
          case 'U':
            window.scrollBy( 0, (h / 2) * -1 );
            break;
          default:
            isNeedCancel = false;
            inputtedStr = "";
            break;
        }
      }
      else if ( !e.altKey && !e.ctrlKey && e.shiftKey ) {
        switch ( String.fromCharCode(e.keyCode) ) {
          case 'G':
            $(window).scrollTop( $(document).height() );
            break;
          case 'H':
            history.back();
            break;
          case 'L':
            history.forward();
            break;
          default:
            isNeedCancel = false;
            inputtedStr = "";
            break;
        }
      }
      else if ( !e.altKey && !e.ctrlKey && !e.shiftKey ) {
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
          case 'G':
            if ( inputtedStr == 'G' ) {
              $(window).scrollTop( 0 );
              inputtedStr = "";
            }
            else {
              inputtedStr = 'G';
            }
            break;
          case 'D':
            chrome.runtime.sendMessage({cmd: "removeTab"});
            break;
          case 'R':
            location.reload( true );
            break;
          default:
            isNeedCancel = false;
            inputtedStr = "";
            break;
        }
      }
      else {
        isNeedCancel = false;
        inputtedStr = "";
      }

      if ( isNeedCancel ) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  }), true );
});

