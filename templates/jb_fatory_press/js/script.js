/**
 *------------------------------------------------------------------------------
 * @package       T3 Framework for Joomla!
 *------------------------------------------------------------------------------
 * @copyright     Copyright (C) 2004-2013 JoomlArt.com. All Rights Reserved.
 * @license       GNU General Public License version 2 or later; see LICENSE.txt
 * @authors       JoomlArt, JoomlaBamboo, (contribute to this project at github
 *                & Google group to become co-author)
 * @Google group: https://groups.google.com/forum/#!forum/t3fw
 * @Link:         http://t3-framework.org
 *------------------------------------------------------------------------------
 */


/* TOOLTIP
 ================================================== */
jQuery(function ($) {
    jQuery('[data-toggle=tooltip]').tooltip();

    // Back to top

    $('#back-to-top').on('click', function () {
        $("html, body").animate({scrollTop: 0}, 500);
        return false;
    });

    // Accordion active class
    $('.panel-heading a').click(function () {
        $(this).parents('.panel-heading').toggleClass('active');
    });

    // Slick Slider Clients
    $(document).ready(function () {
        $('.clients').slick({
            arrows: false,
            autoplay: true,
            autoplaySpeed: 2000,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 498,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });
    });

    //Number Counter
    $('.count').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 2000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });

    //Slick Gallery
    $(document).ready(function () {
        $('.slick-gallery').slick({
            arrows: true,
            autoplay: true,
            autoplaySpeed: 5000,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            cssEase: 'linear',
            prevArrow: "<i class='fa fa-angle-left prevArrow' aria-hidden='true'></i>",
            nextArrow: "<i class='fa fa-angle-right nextArrow' aria-hidden='true'></i>"
        });
    });

    //Vertical Tabs
    var $i;
    tabcontent = $(".tabcontent");
    for ($i = 0; $i < tabcontent.length; $i++) {
        if ($i !== 0) {
            tabcontent[$i].style.display = "none";
        }
    }
    $('.service-test button:first-child').addClass('active');

});

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

