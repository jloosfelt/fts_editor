/**
 * Author: Xiu qiang CHU
 * Description : Toggle
 */

(function($) {
    $.fn.cxqToggle = function(options) {
        var options = $.extend({
            defaultOpen : '', //string
            oneToggle : true, //boolean
            duration: 100, //number (milliseconds)
            effect: 'show', //string (show, slide, fade)
            activeClass:'active', //string
            clickElm : 'toggleHead',//string
            headClass : 'toggleHead',//string
            bodyClass : 'toggleBody'//string
        }, options);

        var toggles = $(this);
        var togglesContent = toggles.find('.' + options.bodyClass);
        var closeAllToggle = false;
        this.each(function(index) {
            var toggle = $(this);
            var toggleContent = toggle.find('.' + options.bodyClass);
            if (options.defaultOpen != "" && options.defaultOpen == index + 1)
                openToggle();

            bindEvents();

            function bindEvents() {
                toggle.find('.' + options.clickElm).on('click', function() {
                    if (toggle.hasClass(options.activeClass))
                        closeToggle();
                    else
                        openToggle();
                })
            }

            function openToggle() {
                if (options.oneToggle) {
                    closeAllToggle = true;
                    closeToggle();
                }
                setEffect(false);
            }

            function closeToggle() {
                setEffect(true);
            }

            function setEffect(isToggleOpen) {
                var toggleItemContent;

                if (isToggleOpen === false) {
                    toggle.addClass(options.activeClass);
                    switch (options.effect) {
                        case 'show' :
                            toggleContent.show();
                            break;

                        case 'fade':
                            toggleContent.delay(options.duration).fadeIn(options.duration);
                            break;

                        case 'slide':
                            toggleContent.slideDown(options.duration);
                            break;
                    }
                } else {
                    var toggleItem = (closeAllToggle) ? toggles : toggle;

                    toggleItem.removeClass(options.activeClass);
                    toggleItemContent = (closeAllToggle) ? togglesContent : toggleContent;

                    switch (options.effect) {
                        case 'show' :
                            toggleItemContent.hide();
                            break;

                        case 'fade':
                            toggleItemContent.fadeOut(options.duration);
                            break;

                        case 'slide':
                            toggleItemContent.slideUp(options.duration);
                            break;
                    }
                    closeAllToggle = false;
                }
            }
        });

        return this;
    };

})(jQuery);