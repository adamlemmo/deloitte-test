// Modal mods
// pretty simple script, leverages the show.bs.modal event for the bootstrap modal, inserts specific figure text into the modal, from the current, related targets siblings!
$('#myModal').on('show.bs.modal', function (e) {
	$(".modal-body h2").text($(e.relatedTarget).siblings("figure").children("figcaption").children("h2").text());
	$(".modal-body p").text($(e.relatedTarget).siblings("figure").children("figcaption").children("p").text());
});
//when the document is ready, hide the figurecaptions, we will only see these in the modal as per above!
$(document).ready(function(){
	$(".image-placeholder figure figcaption").hide();
});