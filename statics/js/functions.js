//function header fixed
jQuery(document).ready(function () {
    var menu = jQuery('#nav');
    menu.addClass('headerpro');
    pos = menu.offset();
    jQuery(window).scroll(function () {
        onscroll();
    });
    function onscroll () {
        if (jQuery(this).scrollTop() > pos.top && menu.hasClass('headerpro')) {
            menu.fadeOut(1, function () {
                jQuery(this).removeClass('headerpro').addClass('navbar-fixed-top').css('width', jQuery(this).parent().width())
                    .fadeIn('fast');
            });
        } else if (jQuery(this).scrollTop() <= pos.top && menu.hasClass('navbar-fixed-top')) {
            menu.fadeOut(1, function () {
                jQuery(this).removeClass('navbar-fixed-top').addClass('headerpro').removeAttr('style').show();
            });
        }
    }

    onscroll();

    $('.chargemore').on('click', cambiaIcono);

    function cambiaIcono() {
        var $class = $('.chargemore');

        $class.find('i').toggleClass('fa-spinner');
        $class.find('span').find('svg').attr('fill', '#fff');
    }
});

