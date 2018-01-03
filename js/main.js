document.addEventListener("DOMContentLoaded", function () {
	init();
});

function init() {
	var trelloCloneController = new TrelloCloneController();
	trelloCloneController.init();
	trelloCloneController.addSwimlane({"swimlane-title":"TO-DOs"});
}