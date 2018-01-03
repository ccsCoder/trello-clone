function TrelloCloneController() {

};

TrelloCloneController.prototype.init = function() {
	var self = this;
	//Add Swimlane
	DOMUtils.get("#add-swimlane-action").on("click", function (e) {
		var title = prompt("Please enter List Title : ");
		if(title && title.length > 0) {		
			self.addSwimlane ({ "swimlane-title": title});
		}
	});
};

TrelloCloneController.prototype.addSwimlane = function(dataJson) {
	var self = this;

	var swimlaneNode = ViewFactory.createView("swimlane", dataJson);
	DOMUtils.get("#swimlanes-container").append(swimlaneNode);
	
	//Edit title event
	DOMUtils.getIn(".swimlane-title", swimlaneNode).on("click", function (e) {
		DOMUtils.wrap(this).attr("contenteditable","true");
	});    

	//initialize Add Item handler
	DOMUtils.getIn(".swimlane-add-item", swimlaneNode).on("click", function (e) {
		DOMUtils.wrap(this).css("display","none");
		DOMUtils.getIn(".swimlane-item-editor", swimlaneNode).css("display", "block");
		
	});
	DOMUtils.getIn("#item-submit", swimlaneNode).on("click", function (e) {
		var itemText = DOMUtils.getIn("#input-item", swimlaneNode).strip().value;
		if(itemText && itemText.trim().length>0) {
			self.addItem({"swimlane-item-text": itemText}, swimlaneNode);
		}
	});
	DOMUtils.getIn("#item-cancel", swimlaneNode).on("click", function (e) {
		self.cancelAddItem(swimlaneNode, this);	
	});

	//Drag Related Events
	DOMUtils.getIn(".swimlane-items", swimlaneNode).on("dragover", function (e) {
		self._onDragOver(e);
	}).on("dragenter", function (e) {
		self._onDragEnter(e);
	}).on("drop", function (e) {
		self._onDrop(e);
	}).on("dragleave", function (e) {
		self._onDragLeave(e);
	}).on("dragend", function (e) {
		self._onDragEnd(e);
	});

};

TrelloCloneController.prototype._onDragStart = function(event) {
	this.sourceElem = event.target;
	//set data to be taken in Drop
	event.dataTransfer.setData("text/plain", DOMUtils.getIn(".item-text",this.sourceElem).strip().innerText);
	//set type of drag allowed
	event.dataTransfer.effectAllowed = "move";

	DOMUtils.wrap(this.sourceElem).addClass('drag-start');

};

TrelloCloneController.prototype._onDragOver = function(event) {
	//stop default browser action or it doesn't allow us to drop :-(
	event.preventDefault(); 
	event.dataTransfer.effectAllowed = "move";
};


TrelloCloneController.prototype._onDragEnter = function(event) {
	DOMUtils.wrap(event.target).addClass('drag-enter');
};

TrelloCloneController.prototype._onDragLeave = function(event) {
	DOMUtils.wrap(event.target).removeClass('drag-enter');
};

TrelloCloneController.prototype._onDrop = function(event) {
	DOMUtils.wrap(event.target).removeClass("drag-enter");
	this.addItem({"swimlane-item-text":event.dataTransfer.getData("text/plain")}, event.target.closest(".swimlane-body"));
	this.sourceElem.remove();
	
	event.preventDefault();
	event.stopPropagation();
};

TrelloCloneController.prototype._onDragEnd = function(event) {
	event.stopPropagation();
};

TrelloCloneController.prototype.editItem = function(targetSwimlane, buttonRef) {
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

TrelloCloneController.prototype.cancelAddItem = function(target, buttonRef) {
	DOMUtils.getIn(".swimlane-item-editor", target).css("display", "none");
	DOMUtils.getIn(".swimlane-add-item", target).css("display", "block");
};

TrelloCloneController.prototype.addItem = function(itemJson, target) {
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
	});
};

