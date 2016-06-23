'use strict';

(function(angular){
    var wd = angular.module('wd-sticky-headers', []);

    wd.directive('wdStickyHeader', [function(){
        return {
            restrict: 'EA',
            replace: false,
            scope: {
                wdScrollBody: '@',
                wdScrollStop: '=',
                wdScrollableContainer: '=',
                wdContentOffset: '=',
				wdZIndex: '=',
                wdIsFixed: '='
            },
            link: function(scope, element, attributes, control){
                var content,
                    header = $(element, this),
                    clonedHeader = null,
                    wdScrollableContainer = $(scope.wdScrollableContainer),
                    wdContentOffset = scope.wdContentOffset || 0;

                var unbindwdScrollBodyWatcher = scope.$watch('wdScrollBody', function(newValue, oldValue) {
                    content = $(scope.wdScrollBody);
                    init();
                    unbindwdScrollBodyWatcher();
                });

                if (wdScrollableContainer.length === 0){
                    wdScrollableContainer = $(window);
                }

                function setColumnHeaderSizes() {
                    if (clonedHeader.is('tr') || clonedHeader.is('thead')) {
                        var clonedColumns = clonedHeader.find('th');
                        header.find('th').each(function (index, column) {
                            var clonedColumn = $(clonedColumns[index]);
                            if (scope.wdIsFixed) {
                                clonedColumn.css( 'width', column.offsetWidth + 'px');
                            } else {
                                var finalWidthSet = column.offsetWidth / ($(window).innerWidth()-20)*100; // $(window) can be replace with a custom wrapper / container
                                clonedColumn.css('width',finalWidthSet + '%');
                            }   
                        });
                    }
                };

                function determineVisibility(){
                    var scrollTop = wdScrollableContainer.scrollTop() + scope.wdScrollStop;
                    var contentTop = content.offset().top + wdContentOffset;
                    var contentBottom = contentTop + content.outerHeight(false);

                    if ( (scrollTop > contentTop) && (scrollTop < contentBottom) ) {
                        if (!clonedHeader){
                            createClone();
                            clonedHeader.css({ "visibility": "visible"});
                        }

                        if ( scrollTop < contentBottom && scrollTop > contentBottom - clonedHeader.outerHeight(false) ){
                            var top = contentBottom - scrollTop + scope.wdScrollStop - clonedHeader.outerHeight(false);
                            clonedHeader.css('top', top + 'px');
                        } else {
                            calculateSize();
                        }
                    } else {
                        if (clonedHeader){
                            /*
                             * remove cloned element (switched places with original on creation)
                             */
                            header.remove();
                            header = clonedHeader;
                            clonedHeader = null;

                            header.removeClass('wd-sticky-header');
                            header.css({
                                position: 'relative',
                                left: 0,
                                top: 0,
                                width: 'auto',
                                'z-index': 0,
                                visibility: 'visible'
                            });
                        }
                    }
                };

                function calculateSize() {
                    clonedHeader.css({
                        top: scope.wdScrollStop,
                        width: header.outerWidth(),
                        left: header.offset().left
                    });

                    setColumnHeaderSizes();
                };

                function createClone(){
                    /*
                     * switch place with cloned element, to keep binding intact
                     */
                    clonedHeader = header;
                    header = clonedHeader.clone();
                    clonedHeader.after(header);
                    clonedHeader.addClass('wd-sticky-header');
                    clonedHeader.css({
                        position: 'fixed',
                        'z-index': scope.wdZIndex || 10000,
                        visibility: 'hidden'
                    });
                    calculateSize();
                };

                function init() {
                    wdScrollableContainer.on('scroll.wdStickyHeader', determineVisibility).trigger("scroll");
                    wdScrollableContainer.on('resize.wdStickyHeader', determineVisibility);

                    scope.$on('$destroy', function () {
                        wdScrollableContainer.off('.wdStickyHeader');
                    });
                }
            }
        };
    }]);

})(window.angular);
