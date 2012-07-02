/**
 * Author: Xiu qiang CHU
 * Description : DropDown
 */

(function($) {
    $.fn.cxqDropdown = function(options) {
        var options = $.extend({
            wrapperClass : 'cxqDropdown',
            arrowClass: 'cxqArrow',
            textClass: 'cxqText'
        }, options);

        this.each(function() {
            var selectBox = $(this);

            selectBox.wrap('<div class="' + options.wrapperClass + '"/>');
            var dropDown = selectBox.closest('.' + options.wrapperClass);
            dropDown.append('<span class="' + options.textClass + '"/>');
            dropDown.append('<span class="' + options.arrowClass + '"><span></span></span>');

            var textSelect = dropDown.find('.' + options.textClass);

            init();
            bindEvents();

            function init() {
                //the priority is to get the selected option and whether not exist take by default the first item
                var selectedItem = selectBox.find('option[selected="selected"]');
                var firstItem = selectBox.find('option:first');

                if (!selectedItem || selectedItem.length == 0) {
                    textSelect.text(firstItem.val());
                } else {
                    textSelect.text(selectedItem.val());
                }
            }

            function bindEvents() {
                selectBox.on('change', function() {
                    textSelect.text($(this).val());
                });
            }
        });
        return this;
    };

})(jQuery);