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

SwimlaneController.prototype.addItem = function(itemJson, target) {
	var newItemNode = ViewFactory.createView("item", itemJson);
	var self =this;
	DOMUtils.getIn(".swimlane-items",target).append(newItemNode);
	DOMUtils.getIn(".swimlane-item-editor", target).css("display", "none");
	DOMUtils.getIn(".swimlane-add-item", target).css("display", "block");

	DOMUtils.getIn("#edit-item", newItemNode).on("click", function (e) {
		self.editItem(newItemNode, this);
	});


};

