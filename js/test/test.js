document.addEventListener("DOMContentLoaded", function () {
	init();
});

function init() {

	var itemsData = [{
			selector: "#swimlanes-container > div:nth-child(1)",
			itemData :{"swimlane-item-text": "Task 1: Remind me to construct a Death Star and deploy my Storm Troopers to Tattoine. Take over the World, I must!"}
		},{
			selector: "#swimlanes-container > div:nth-child(1)",
			itemData : {"swimlane-item-text": "Task 2: Once upon a time, in a Galaxy far far away, there lived a developer. The Force was strong with him!"}
		},{
			selector: "#swimlanes-container > div:nth-child(1)",
			itemData : {"swimlane-item-text": "Task 3:  Do not try and bend the spoon. That's impossible. Instead... only try to realize the truth.There is no spoon."}
	},{
			selector: "#swimlanes-container > div:nth-child(2)",
			itemData : {"swimlane-item-text": "Task 1.1: I'm going to hang up this phone, and then I'm going to show these people what you don't want them to see. I'm going to show them a world without you. A world without rules and controls, without borders or boundaries."}
		},{
			selector: "#swimlanes-container > div:nth-child(2)",
			itemData :{"swimlane-item-text": "Task 1.2:  I will not give my life for Joffery's murder and I know I'll get no justice here, so I will let the gods decide my fate. I demand a trial by combat."}
		},{
			selector: "#swimlanes-container > div:nth-child(2)",
			itemData :{"swimlane-item-text": "Task 1.3: That's what I do... I drink, and I know things."}
	}];


	var trelloCloneController = new TrelloCloneController();
	trelloCloneController.init();
	trelloCloneController.addSwimlane({"swimlane-title":"TO-DOs"});
	trelloCloneController.addSwimlane({"swimlane-title":"TO-DO-COl2"});

	itemsData.forEach(function (itemData) {
		trelloCloneController.addItem(itemData.itemData, document.querySelector(itemData.selector));	
	});



}