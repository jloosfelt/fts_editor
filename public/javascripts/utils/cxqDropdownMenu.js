/**
 * Author: Xiu qiang CHU
 * Description : DropDown
 */

(function($) {
    $.fn.cxqDropDownMenu = function(options) {
        var options = $.extend({
            dataListClass:"dataList",
            currentClass : "current"
        }, options);

        this.each(function() {
            var dropDown = $(this);
            var dataList = $(this).find('.' + options.dataListClass);
            var currentItem = dropDown.find('.' + options.currentClass);
            var height = dropDown.outerHeight();
            
            bindEvents();
            function bindEvents() {
                currentItem.on("click", function(e) {
                    e.preventDefault();
                    if(dropDown.hasClass('active')){
                        closeList();
                    } else {
                        openList();
                    }
                });

                dataList.find('a').on("click",function(){
                    changeDropdownValue($(this))
                });
            }

            function closeList(){
                dropDown.removeClass('active');
                dataList.hide();
            }

            function openList(){
                dropDown.addClass('active');
                dataList.show();
                setPosition();
            }

            function setPosition(){
                dataList.css({
                    top:height,
                    left: 0
                });
            }

            function changeDropdownValue(val){
                var currentValue = currentItem.html();
                currentItem.html(val.html());
                val.html(currentValue);
                closeList();
            }
        });
        return this;
    };

})(jQuery);