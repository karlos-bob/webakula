$(document).ready(function(){


    // Banner slider
    $("#owl-carousel").owlCarousel({
        loop:true,
        items: 1,
        nav: false,
        responsive:{
            0:{ items:1 },
            480:{ items:1},
            768:{ items:1},
            1024:{ items:1}
        },
    });

    // Popover
    $('[data-toggle="popover"]').popover();

    // Tab slider-1
    $('.tab-inner-1').owlCarousel({
        loop: false,
        items: 3,
        nav: true,
        dots: false,
        margin: 30,
        responsive:{
            0:{ items:1 },
            480:{ items:1},
            768:{ items:2},
            970:{ items:2},
            992:{ items:2},
            1024:{ items:2},
            1200:{ items:3}
        },
    });

    // Tab slider-2
    $('.tab-inner-2').owlCarousel({
        loop: false,
        items: 3,
        nav: true,
        dots: false,
        margin: 30,
        responsive:{
            0:{ items:1 },
            480:{ items:1},
            768:{ items:1},
            970:{ items:2},
            992:{ items:2},
            1024:{ items:2},
            1200:{ items:3}
        },
    });

    // $('#offers-tab a').on('click', function (e) {
    //     e.preventDefault();
    //     $(this).tab('show');
    // });
});