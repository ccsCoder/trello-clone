function SwimlaneController() {

};

SwimlaneController.prototype.init = function() {
	var self = this;
	//Add Swimlane
	DOMUtils.get("#add-swimlane-action").on("click", function (e) {
		var title = prompt("Please enter List Title : ");
		if(title && title.length > 0) {		
			self.addSwimlane ({ "swimlane-title": title});
		}
	});
};

SwimlaneController.prototype.addSwimlane = function(dataJson) {
	var self = this;

	var viewNode = ViewFactory.createView("swimlane", dataJson);
	DOMUtils.get("#swimlanes-container").append(viewNode);
	
	//Edit title event
	DOMUtils.getIn(".swimlane-title", viewNode).on("click", function (e) {
		DOMUtils.wrap(this).attr("contenteditable","true");
	});    

	//initialize Add Item handler
	DOMUtils.getIn(".swimlane-add-item", viewNode).on("click", function (e) {
		DOMUtils.wrap(this).css("display","none");
		DOMUtils.getIn(".swimlane-item-editor", viewNode).css("display", "block");
		
	});
	DOMUtils.getIn("#item-submit", viewNode).on("click", function (e) {
		var itemText = DOMUtils.getIn("#input-item", viewNode).strip().value;
		if(itemText && itemText.trim().length>0) {
			self.addItem({"swimlane-item-text": itemText}, viewNode);
		}
	});
	DOMUtils.getIn("#item-cancel", viewNode).on("click", function (e) {
		self.cancelAddItem(viewNode, this);	
	});

};

SwimlaneController.prototype._onDragStart = function(event) {
	this.sourceElem = event.target;
	//set data to be taken in Drop
	event.dataTransfer.setData("text/plain", DOMUtils.getIn(".item-text",this.sourceElem).strip().innerText);
	//set type of drag allowed
	event.dataTransfer.effectAllowed = "move";

};

SwimlaneController.prototype._onDragOver = function(event) {
	//stop default browser action or it doesn't allow us to drop :-(
	event.preventDefault(); 
	event.dataTransfer.effectAllowed = "move";
};


SwimlaneController.prototype._onDragEnter = function(event) {

	// if(DOMUtils.wrap(event.target).hasClass("item-text") || DOMUtils.wrap(event.target).hasClass("edit-item")) {
	// 	DOMUtils.wrap(event.target.parentNode).addClass("drag-enter");
	// }
	// else {
	// 	DOMUtils.wrap(event.target).addClass("drag-enter");
	// }

	if(DOMUtils.wrap(event.target).hasClass("swimlane-item"));

	var currentItem = event.target;
	var blankItem = ViewFactory.createView("item", {"swimlane-item-text":""});
	blankItem.classList.add("blank-item");

	currentItem.parentNode.insertBefore(blankItem, currentItem.nextSibling);


};

SwimlaneController.prototype._onDragLeave = function(event) {
	DOMUtils.wrap(event.target).removeClass("drag-enter");	
	if(event.target.nextSibling.classList.contains("blank-item")) {
		event.target.nextSibling.remove();
	}
};

SwimlaneController.prototype._onDrop = function(event) {
	// var itemRef, swimlaneRef;
	if( DOMUtils.wrap(event.target).hasClass("swimlane-item")) {
		itemRef = event.target;
		swimlaneRef = event.target.parentNode.parentNode;
	}
	else {
		itemRef = event.target.parentNode;
		swimlaneRef = event.target.parentNode.parentNode.parentNode;	
	}

	DOMUtils.wrap(itemRef).removeClass("drag-enter");
	this.addItem({"swimlane-item-text":event.dataTransfer.getData("text/plain")}, swimlaneRef);
	this.sourceElem.remove();
	
	event.stopPropagation();

};

SwimlaneController.prototype.editItem = function(targetSwimlane, buttonRef) {
	var itemRef = buttonRef.parentNode.firstChild;
	
	if(buttonRef.innerText =="save") {
	 	DOMUtils.wrap(itemRef).attr("contenteditable","false").removeClass("editing");
	 	buttonRef.innerText = "edit";	


	 } else if(buttonRef.innerText =="edit") {
	 	DOMUtils.wrap(itemRef).attr("contenteditable","true").addClass("editing");
	 	buttonRef.innerText =  "save";
	 	
	 	setTimeout(function (arg) {
	 		itemRef.focus();
	 	},0);

	}

};

SwimlaneController.prototype.cancelAddItem = function(target, buttonRef) {
	DOMUtils.getIn(".swimlane-item-editor", target).css("display", "none");
	DOMUtils.getIn(".swimlane-add-item", target).css("display", "block");
};

SwimlaneController.prototype.addItem = function(itemJson, target) {
	var newItemNode = ViewFactory.createView("item", itemJson);
	var self =this;
	DOMUtils.getIn(".swimlane-items",target).append(newItemNode);
	DOMUtils.getIn(".swimlane-item-editor", target).css("display", "none");
	DOMUtils.getIn(".swimlane-add-item", target).css("display", "block");

	DOMUtils.getIn("#edit-item", newItemNode).on("click", function (e) {
		self.editItem(newItemNode, this);
	});
	//Make draggable;
	DOMUtils.wrap(newItemNode).attr("draggable","true").on("dragstart", function (e) {
		self._onDragStart(e);
	}).on("dragover", function (e) {
		self._onDragOver(e);
	}).on("dragenter", function (e) {
		self._onDragEnter(e);
	}).on("dragleave", function (e) {
		self._onDragLeave(e);	
	}).on("drop", function (e) {
		self._onDrop(e);
	}).on("dragexit", function (e) {
		self._onDragExit(e);
	});
};

