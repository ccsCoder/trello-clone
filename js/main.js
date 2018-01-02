document.addEventListener("DOMContentLoaded", function () {
	init();
});

function init() {
	var swimlaneController = new SwimlaneController();
	swimlaneController.init();
	swimlaneController.addSwimlane({"swimlane-title":"TO-DOs"});
}