$(document).ready(function() {
  $(".save-button").on("click", function(event) {
    var id = $(this).data("id");

    // Send the PUT request.
    $.ajax("/articles/" + id, {
      type: "PUT",
      data: { saved: true }
    }).then(function() {
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".delete-button").on("click", function(event) {
    var id = $(this).data("id");

    // Send the PUT request.
    $.ajax("/articles/" + id, {
      type: "PUT",
      data: { saved: false }
    }).then(function() {
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".delete-comment").on("click", function(event) {
    var id = $(this).data("id");
    var index = $(this).data("index");

    // Send the PUT request.
    $.ajax(`/articles/${id}/comment/${index}`, {
      type: "DELETE"
    }).then(function() {
      // Reload the page to get the updated list
      location.reload();
    });
  });
});
