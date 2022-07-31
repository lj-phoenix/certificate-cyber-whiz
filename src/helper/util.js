export const styleLinks = function (title) {
  var _link = document.createElement("a");

  var _styleToAbs = function (el) {
    var url;
    var clone = window.$(el).clone()[0];
    var linkHost;

    if (clone.nodeName.toLowerCase() === "link") {
      clone.href = _relToAbs(clone.href);
    }

    return clone.outerHTML;
  };

  /**
   * Convert a URL from a relative to an absolute address so it will work
   * correctly in the popup window which has no base URL.
   *
   * @param  {string} href URL
   */
  var _relToAbs = function (href) {
    // Assign to a link on the original page so the browser will do all the
    // hard work of figuring out where the file actually is
    _link.href = href;
    var linkHost = _link.host;

    // IE doesn't have a trailing slash on the host
    // Chrome has it on the pathname
    if (linkHost.indexOf("/") === -1 && _link.pathname.indexOf("/") !== 0) {
      linkHost += "/";
    }

    return _link.protocol + "//" + linkHost + _link.pathname + _link.search;
  };

  var head = "<title>" + title + "</title>";
  var style = `
    <style>
      @media print {
        html {
          background - color: #d9ecff;
          opacity: 1 !important;
        }
        .certificate__wrap {
          top: 50 px;
          left: 50 % ;
          transform: translateX(-50 % );
        }
      }
    </style>
    `
  head += style;
  window.$("style, link").each(function () {
    head += _styleToAbs(this);
  });

  return head;

}


export const printDiv = function (id, title = 'title', cb = (win) => {}) {
  var divToPrint = document.getElementById(id);
  var newWin = window.open("", "");

  let head = styleLinks(title)

  newWin.document.open();
  newWin.document.close();

  try {
    newWin.document.head.innerHTML = head;
  } catch (e) {
    $(newWin.document.head).html(head);
  }

  newWin.document.body.innerHTML = divToPrint.innerHTML;

  cb(newWin)

  newWin.setTimeout(function () {
    newWin.print();
    newWin.close();
  }, 1000);
}

window.printDiv = printDiv;