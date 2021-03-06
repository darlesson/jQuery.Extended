jQuery Extended
==================================================

jquery.extended.js add some unique plugins to jQuery for specific needs that are not provided by jQuery, such as to get the content dimensions of a container not knowing how many Nodes are in there and how they are distributed (inline or block).

Methods
--------------------------------------

- **hasAttr**: Checks if the first matching element has an specific attribute.	
- **hasCSS**: Returns whether the first matching element has an specific style property.
- **removeCSS**: Remove an specific style property from the elements.
- **isVisible**: Check element visibility.
- **hasScrollY**: Check the existence of vertical scroll in any given element, but iframe.
- **hasScrollX**: Check the existence of horizontal scroll in any given element, but iframe.
- **handlers**: Get the handlers for an specific event type and / or namespace bound to the first matching element.
- **hasEvent**: Check if the an event type is bound to the fist matching element element.
- **contentBoundaries**: Get the first matching element content boundaries.
- **contentHeight**: Get the first matching element content height based on its boundaries.
- **contentWidth**: Get the first matching element content width based on its boundaries.
- **isSibling**: Find if an element is a sibling.
- **outerHTML**: Returns the outerHTML for the first element matched, replaces the all elements matched by another returning the element in the chain, or allow value as Function to let the developer to decide what to do with every element in the object.
- **reverse**: Revert the jQuery items order.

License
--------------------------------------

Dual licensed under the MIT and GPL licenses:
- http://www.opensource.org/licenses/mit-license.php
- http://www.gnu.org/licenses/gpl.html
