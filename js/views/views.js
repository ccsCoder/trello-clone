var ViewFactory = (function () {
	const swimlaneHTMLString = '<div class="swimlane"><div class="swimlane-content"><div class="swimlane-title">{{swimlane-title}}</div>'+
				'<div class="swimlane-body">'+
					'<div class="swimlane-items">'+
					'</div><div class="swimlane-add-item"><span >Add Item (+)</span></div>'+
					'<div class="swimlane-item-editor"><div class="item-editor-input"><input id="input-item" type="text" placeholder="Task Description" />'+
					'<br/><br/></div><div class="swimlane-input-actions"><button id="item-submit">Add</button><button id="item-cancel">Cancel</button></div></div>'+
				'</div></div></div></div>';


	const swimlanteItemHTMLString = '<div class="swimlane-item"><div class="item-text">{{swimlane-item-text}}</div><div id="edit-item" class="edit-item">edit</div></div>';

	const views  = {
		swimlane : swimlaneHTMLString,
		item : swimlanteItemHTMLString
	};

	function _bind(htmlText, datum) {
		Object.keys(datum).forEach(function (key) {
			htmlText = htmlText.replace("{{"+key+"}}", datum[key]);
		});
		return htmlText;
	};

	function _createView(viewName, viewData) {
		var str= _bind(views[viewName], viewData); 
		//hack to create dom NODE object from these huge string easily
		var tempDiv = document.createElement("div");
		tempDiv.innerHTML = str;

		return tempDiv.firstChild;
	};

	return {
		createView: _createView

	}

})();