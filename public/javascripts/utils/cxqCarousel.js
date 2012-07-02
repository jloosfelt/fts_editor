/**
 * Author: Xiu qiang CHU
 * Description : Carousel for one image
 */

(function($) {
    $.fn.cxqCarousel = function(options) {
        var options = $.extend({
            'scrollWidth': 200, //number 
            duration: 700, //number (milliseconds)
            wrapperClass:"slideShowWrapper", //string
            arrowLeftClass : "arrowSlideLeft", //string
            arrowRightClass : "arrowSlideRight" //string
        }, options);

        $(this).wrap('<div class="' + options.wrapperClass + '" />');
        var wrapper = $(this).parent();
        var slideWidth = $(this).width();
        var image = $(this).find('img').get(0);
        var currentPosition;

        if (!IsImageLoaded(image)) {
            //waiting image loading
            $(image).load(function() {
                setImagePosition(this);
            });
        } else {
            setImagePosition(image);
        }


        function setImagePosition(elm) {
            var imageWidth = elm.width,
                    imageHeight = elm.height;

            if (imageWidth > slideWidth) {
                currentPosition = -(Math.round(imageWidth / 2));
                wrapper.css('height', imageHeight)
                $(elm).css({
                    position:"absolute",
                    left:"50%",
                    marginLeft:currentPosition
                });
                setArrows();
            }
        }

        /**
         *
         * @param img
         * @desc test if image is already loaded
         */

        function IsImageLoaded(img) {
            // During the onload event, IE correctly identifies any images that
            // weren’t downloaded as not complete. Others should too. Gecko-based
            // browsers act like NS4 in that they report this incorrectly.
            if (!img.complete) {
                return false;
            }

            // However, they do have two very useful properties: naturalWidth and
            // naturalHeight. These give the true size of the image. If it failed
            // to load, either of these should be zero.

            if (typeof img.width != "undefined" && img.width == 0) {
                return false;
            }

            // No other way of checking: assume it’s ok.
            return true;
        }

        function setArrows() {
            wrapper.prepend('<a href="#" class="arrowSlide ' + options.arrowLeftClass + '"/>')
                    .prepend('<a href="#" class="arrowSlide ' + options.arrowRightClass + '"/>');
            bindEvents();
        }

        function bindEvents() {
            wrapper.delegate('.arrowSlide', 'click', function(e) {
                e.preventDefault();

                var newPosition = currentPosition;

                if ($(this).hasClass(options.arrowLeftClass)) {
                    newPosition = checkPosition(currentPosition + options.scrollWidth);
                    $(image).animate({
                        marginLeft:newPosition
                    }, options.duration)
                    currentPosition = newPosition;
                } else {
                    newPosition = checkPosition(currentPosition - options.scrollWidth);
                    $(image).animate({
                        marginLeft:newPosition
                    }, options.duration)
                    currentPosition = newPosition;
                }
            })
        }

        function checkPosition(position) {
            var newPosition = position;
            var wrapperWidth = wrapper.width() / 2;

            if (newPosition >= -(wrapperWidth)) {
                newPosition = -(wrapper.width() / 2);
                wrapper.find('.' + options.arrowLeftClass).hide();
            } else if (newPosition <= -(image.width - wrapperWidth)) {
                newPosition = -(image.width - wrapperWidth);
                wrapper.find('.' + options.arrowRightClass).hide();
            } else {
                wrapper.find('.' + options.arrowLeftClass).show();
                wrapper.find('.' + options.arrowRightClass).show();
            }

            return newPosition;
        }

        return this;
    };

})(jQuery);