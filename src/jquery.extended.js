/*!
 * jQuery Extended
 *
 * http://www.darlesson.com/
 * https://github.com/darlesson/jQuery.Extended
 *
 * Copyright 2014, Darlesson Oliveira
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * @requires jQuery
 *
 * Reporting bugs, comments or suggestions: http://darlesson.com/contact/
 * Documentation and other jQuery plug-ins: http://darlesson.com/jquery/ or https://github.com/darlesson/jQuery.Extended
 * Donations are welcome: http://darlesson.com/donate/
 */

(function ($) {

    $.fn.extend({

        hasAttr: function (attr) {
        	/// <summary>
        	///     Checks if the first matching element has an specific attribute.
        	/// </summary>
            /// <param name="attr" type="String">
            ///     The attribute to be searched for.
            /// </param>
            /// <returns type="Boolean" />

            return ($(this).eq(0).attr(attr) != undefined);
        },

        hasCSS: function (value) {
        	/// <summary>
            ///     Returns whether the first matching element has an specific
            ///     style property.
        	/// </summary>
        	/// <param name="value"></param>
            /// <returns type="Boolean" />

            var element = $(this)[0],
                hasCSS = (element.style[value] !== undefined && element.style[value] !== '') ? true : false;

            return hasCSS;
        },

        removeCSS: function (key, value) {
        	/// <summary>
        	///     Remove an specific style property from the elements.
        	/// </summary>
            /// <param name="key" type="String">
            ///     One key as string an array of key strings.
            /// </param>
            /// <param name="value">
            ///     An optional value to match as condition to be deleted.
            /// </param>
        	/// <returns type="jQuery" />

            var $this = this;

            var removeProperty = function (thisKey, thisValue) {

                var index = 0;

                do {

                    var element = $this[index];

                    if (element && element.nodeType && element.style[thisKey] && ((thisValue) ? element.style[thisKey] === thisValue : true)) {

                        if (element.style.removeProperty)
                            element.style.removeProperty(thisKey);
                        else
                            element.style.removeAttribute(thisKey);

                    }

                    index = index + 1;

                } while (index < $this.length);

            };

            // Deal with multiple keys
            if (typeof key !== "string" && key.constructor === Array) {

                for (var x = 0; x < key.length; x++)
                    removeProperty(key[x], null);
            }
            // Deal with a single key
            else
                removeProperty(key, value);

            return $this;
        },

        isVisible: function () {
        	/// <summary>
            ///     Check element visibility
        	/// </summary>
        	/// <returns type="Boolean" />

            var $this = $(this),
				display = $this.css("display"),
				visibility = $this.css("visibility"),
				isVisible = true;

            // Check display property
            if (display === "none" || !$this.is(":visible")) {
                isVisible = false;
            }

            // Check visibility property
            if (visibility === "collapse") {
                isVisible = false;
            }

            return isVisible;
        },

        hasScrollY: function () {
            /// <summary>
            ///     Check the existence of vertical scroll in any given
            ///     element, but iframe
            /// </summary>
            /// <returns type="Boolean" />

            var $this = $(this),
                element = $this.get(0),
                overflowY = $this.css('overflow-y'),
                overflow = $this.css('overflow'),
                canScroll = (overflowY === 'auto' || overflowY === 'scroll' || overflow === 'auto' || overflow === 'scroll');

            return (element.clientHeight < element.scrollHeight && canScroll) ? true : false;
        },

        hasScrollX: function () {
        	/// <summary>
            ///     Check the existence of horizontal scroll in any given
            ///     element, but iframe
        	/// </summary>
            /// <returns type="Boolean" />

            var $this = $(this),
                element = $this.get(0),
                overflowX = $this.css('overflow-x'),
                overflow = $this.css('overflow'),
                canScroll = (overflowX === 'auto' || overflowX === 'scroll' || overflow === 'auto' || overflow === 'scroll');

            return (element.clientWidth < element.scrollWidth && canScroll) ? true : false;
        },

        handlers: function (type) {
            /// <summary>
            ///     Get the handlers for an specific event type and / or namespace
            ///     bound to the first matching element.
            /// </summary>
            /// <param name="type" type="String">
            ///     The event type.
            /// </param>
            /// <returns type="Array" />

            var $this = this.get(0),
                events = $._data($this, 'events'),
                handlers = [];

            var push = function (type) {

                var indexOfDot = type.indexOf('.'),
                    namespace = (indexOfDot > -1) ? type.substr(indexOfDot + 1, type.length) : null;

                if (indexOfDot > -1)
                    type = type.substr(0, indexOfDot);

                if (events) {

                    // Get by event type
                    if (type && events[type]) {

                        // Copy the objects of the array
                        for (var j = 0, jLen = events[type].length; j < jLen; j++)
                            handlers.push(events[type][j]);

                        // Filter by namespace if any
                        if (namespace && handlers && handlers.length) {

                            var newHandlers = [];

                            for (var x = 0, xLen = handlers.length; x < xLen; x++) {

                                if (handlers[x].namespace.toLowerCase() === namespace.toLowerCase())
                                    newHandlers.push(handlers[x]);
                            }

                            handlers = newHandlers;
                        }

                    } else if (namespace) {

                        var eventType;
                        for (eventType in events) {

                            for (var i = 0, iLen = events[eventType].length; i < iLen; i++) {

                                // Get by namespace no matter the event type
                                if (events[eventType][i].namespace.toLowerCase() === namespace.toLowerCase())
                                    handlers.push(events[eventType][i]);
                            }
                        }
                    }
                }
            };

            if (typeof type === 'string')
                push(type);

            else {

                for(type in events)
                    push(type);

            }

            return handlers;
        },

        hasEvent: function (type) {
            /// <summary>
            ///     Check if the an event type is bound to the
            ///     fist matching element element.
            /// </summary>
            /// <param name="type" type="String">
            ///     The event type.
            /// </param>
            /// <returns type="Boolean" />

            return (type && this.handlers(type).length) ? true : false;
        },

        contentBoundaries: function () {
        	/// <summary>
        	///     Get the first matching element content boundaries.
        	/// </summary>
            /// <returns type="Object">
            ///     The element content boundaries object.
            /// </returns>

            var element = (this[0] === window) ? this[0].document.documentElement : this[0],
                range,
                boundingClientRects = {};

            // Browsers
            if (document.createRange) {

                range = document.createRange();
                range.selectNodeContents(element);

                boundingClientRects = range.getBoundingClientRect();

            }
            // Internet Explorer 8--
            else {

                range = document.body.createTextRange();
                range.moveToElementText(element);

                boundingClientRects = {
                    width: range.boundingWidth,
                    height: range.boundingHeight,
                    left: range.boundingLeft,
                    top: range.boundingTop,
                    right: range.boundingLeft + range.boundingWidth,
                    bottom: range.boundingTop + range.boundingHeight
                };
            }

            return boundingClientRects;
        },

        contentHeight: function () {
        	/// <summary>
            ///     Get the first matching element content height
            ///     based on its boundaries.
        	/// </summary>
            /// <returns type="Number">
            ///     The content height.
            /// </returns>

            return $(this).contentBoundaries().height;
        },

        contentWidth: function(){
            /// <summary>
            ///     Get the first matching element content width
            ///     based on its boundaries.
            /// </summary>
            /// <returns type="Number">
            ///     The content width.
            /// </returns>

            return $(this).contentBoundaries().width;
        },

        isSibling: function (element) {
        	/// <summary>
        	///     Find if an element is a sibling.
        	/// </summary>
            /// <param name="element" type="Element">
            ///     An element to compare.
            /// </param>
            /// <returns type="Boolean">
            ///     Whether the element is a sibling.
            /// </returns>

            if (element.nodeType !== 1)
                return;

            var $siblings = $(this).eq(0).siblings();

            return $siblings.filter(function () {

                return this === element;

            }).length;
        },

        reverse: [].reverse

    });

})(jQuery);