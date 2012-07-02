/* Author: Xiu qiang Chu */


$(document).ready(function() {

    /**
     *  extend background banner
     */

    setBackgroundExtend();
    function setBackgroundExtend() {
        var bannerWidth = $('.bannerInside').width();
        var pos = bannerWidth + 222;
        var newWidth = (document.body.clientWidth - pos) / 2;
        if (document.body.clientWidth > bannerWidth) {
            $('.bannerLeft').css({
                right : pos,
                width:newWidth - 112,
                display:"block"
            });

            $('.bannerRight').css({
                left : pos + 1,
                width: newWidth - 112,
                display:"block"
            });
        }
    }

    $(window).resize(function() {
        setBackgroundExtend();
    });

    /**
     *  bind Tabs
     */

    $('.tabsBlock a:first').tab('show'); // Select first tab

    $('.tabsBlock a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    $('.tabsBlock01 a:first').tab('show'); // Select first tab

    $('.tabsBlock01 a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    /**
     *  stick footer bottom
     */

    stickFooter();
    function stickFooter() {
        var padding_top = $("#footer").css("padding-top").replace("px", "");
        var page_height = $(document.body).height() - padding_top;
        var window_height = $(window).height();
        var difference = window_height - page_height;
        if (difference < 0)
            difference = 0;

        $("#footer").css({
            padding: difference + "px 0 0 0"
        })
    }

    $(window).resize(stickFooter);


    /**
     * set IE box shadow
     */

    if ($.browser.msie && ($.browser.version == '7.0' || $.browser.version == '8.0')) {
        if ($('.boxForm').length > 0) {
            $('.boxForm').wrapInner('<div class="boxInsetWrap"/>');
            $('.boxForm').append('<div class="boxShadowIE"/>');
        }
    }


    /**
     * Launch banner carousel
     */

    $('.carousel').carousel({
        interval: false
    });

    // set active class for the first bullet
    $('.carousel .paginationBullet li:first a').addClass('active')

    $('.carousel .paginationBullet a').on('click', function(e) {
        e.preventDefault();
        var targetSlide = $(this).attr('data-to') - 1;

        $(this).closest('.carousel').carousel(targetSlide);
    });

    $('.carousel').on('slid', function() {
        // Get currently selected item
        var item = $(this).find('.carousel-inner .item.active');

        // Deactivate all nav links
        $(this).find('.paginationBullet a').removeClass('active');

        // Index is 1-based, use this to activate the nav link based on slide
        var index = item.index();

        var currentPagination = $(this).find('.paginationBullet a').get(index);
        $(currentPagination).addClass('active');
    });


    /*********************** LOAD PLUGIN DYNAMICALY AND CACHE THEM **************/

    /**
     * Launch one image carousel
     */

    if ($('.slideShowOneImage').length > 0) {
        $.getScript('/js/utils/cxqCarousel.js', function() {
            $('.slideShowOneImage').cxqCarousel();
        }, true);
    }

    /**
     * Launch toggle
     */

    if ($('.toggle').length > 0) {
        $.getScript('/js/utils/cxqToggle.js', function() {
            $(".toggle").cxqToggle({
                oneToggle : true,
                defaultOpen: '',
                effect:'slide',
                duration : 400
            });
        }, true);
    }

    /**
     * Launch custom dropdown
     */

    if ($('.inputSelect').length > 0) {
        $.getScript('/javascripts/utils/cxqDropdown.js', function() {
            $(".inputSelect").cxqDropdown();
        }, true);
    }

    if ($('.dropdownMenu').length > 0) {
        $.getScript('/javascripts/utils/cxqDropdownMenu.js', function() {
            $(".dropdownMenu").cxqDropDownMenu();
        }, true);
    }
});








