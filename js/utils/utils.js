var DOMUtils = (function () {
	var currElem;
	
	function _get(selectorString) {
		currElem = document.querySelector(selectorString);
		return this;
	};

	function _getIn(selectorString, context) {
		currElem = context.querySelector(selectorString);
		return this;
	};

	function _getAll(selectorString) {
		//won't chain in case of Multiple selected items.
		return document.querySelectorAll(selectorString);
	};

	function _attr(attrName, value) {
		if(value) {
			currElem.setAttribute(attrName, value);
			return this;
		}
		return currElem.getAttribute(attrName);

	};

	function _addClass(className) {
		currElem.classList.add(className);
		return this;
	};

	function _removeClass(className) {
		currElem.classList.remove(className);
		return this;
	};

	function _on(eventName, handler, context) {
		currElem.addEventListener(eventName, (context ? handler.bind(context): handler));
		return this;
	};

	function _off(eventName, handler) {
		currElem.removeEventListener(eventName, handler);
		return this;
	};

	function _append(htmlString) {
		currElem.appendChild(htmlString);
		return this;
	};

	function _strip() {
		return currElem;
	};

	function _wrap(node) {
		currElem = node;
		return this;
	};

	function _css(property, value) {
		currElem.style[property] = value;
		return this;
	};

	function _getDOMObject(htmlString) {
		var tempDiv = document.createElement("div");
		tempDiv.innerHTML = htmlString;
		return tempDiv.firstChild;
	};

	function _hasClass(className) {
		return currElem.classList.contains(className);
	}

	return {
		get: _get,
		getIn: _getIn,
		getAll: _getAll,
		attr: _attr,
		addClass: _addClass,
		removeClass: _removeClass,
		on: _on,
		off: _off,
		append: _append,
		strip: _strip,
		wrap: _wrap,
		css: _css,
		createNode: _getDOMObject,
		hasClass: _hasClass

	}
})();