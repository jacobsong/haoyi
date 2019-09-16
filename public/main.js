$(document).ready(function () {
  // load preferred language
  if (localStorage.getItem("lang") === null) {
    changeLangEN();
  } else {
    changeLang(localStorage.getItem("lang"));
  }

  $('#about').hide();
  $('#contact').hide();

  // attach semantic ui events
  $('.ui.sidebar').sidebar('attach events', '.toc.item');
  $('#faq-modal').modal('attach events', '#footer\\.faq', 'show');
  $('#contact-modal').modal('attach events', '#footer\\.contactus', 'show');
  $('.ui.dropdown').dropdown({
    action: function (text, value) {
      changeLang(value);
    }
  });

  $('#menu\\.home').click(function () {
    showPage("#menu\\.home", "#home");
  });

  $('#menu\\.about').click(function () {
    showPage("#menu\\.about", "#about");
  });

  $('#menu\\.contact').click(function () {
    showPage("#menu\\.contact", "#contact");
  });

  $('#sidenav\\.home').click(function () {
    showPage("#sidenav\\.home", "#home");
    $('.ui.sidebar').sidebar('toggle');
  });

  $('#sidenav\\.about').click(function () {
    showPage("#sidenav\\.about", "#about");
    $('.ui.sidebar').sidebar('toggle');
  });

  $('#sidenav\\.contact').click(function () {
    showPage("#sidenav\\.contact", "#contact");
    $('.ui.sidebar').sidebar('toggle');
  });

  // Language switcher
  $('.switch-lang-en').click(function () {
    changeLangEN();
    $('.ui.dropdown').dropdown("set selected", "en");
    $('.ui.dropdown').dropdown("hide");
  });

  $('.switch-lang-cn').click(function () {
    changeLangCN();
    $('.ui.dropdown').dropdown("set selected", "cn");
    $('.ui.dropdown').dropdown("hide");
  });

  function changeLang(value) {
    switch (value) {
      case "en":
        changeLangEN();
        break;
      case "cn":
        changeLangCN();
        break;
      default:
        changeLangEN();
    }
    $('.ui.dropdown').dropdown("set selected", value);
    $('.ui.dropdown').dropdown("hide");
  }

  function changeLangEN() {
    $.getJSON('./lang/en.json', function (en) {
      $('[data-lang]').each(function () {
        $(this).text(en[$(this).attr('id')]);
      });
      $('#home\\.samples').html("<i class='cogs icon'></i>" + en["home.samples"]);
    });
    localStorage.setItem("lang", "en");
  }

  function changeLangCN() {
    $.getJSON('./lang/cn.json', function (cn) {
      $('[data-lang]').each(function () {
        $(this).text(cn[$(this).attr('id')]);
      });
      $('#home\\.samples').html("<i class='cogs icon'></i>" + cn["home.samples"]);
    });
    localStorage.setItem("lang", "cn");
  }

  function showPage(selectedElem, selectedPage) {
    const pages = ["#home", "#about", "#contact"];
    const elems = ["#menu\\.home", "#menu\\.about", "#menu\\.contact",
      "#sidenav\\.home", "#sidenav\\.about", "#sidenav\\.contact"];

    for (let page of pages) {
      if (selectedPage === page) {
        if ($(page).is(":hidden")) {
          $(page).transition("fade left");
        }
      } else {
        $(page).hide();
        $(page).removeClass("transition visible");
      }
    }

    for (let elem of elems) {
      if (selectedElem === elem) {
        $(elem).addClass("active");
      } else {
        $(elem).removeClass("active");
      }
    }
  }

});