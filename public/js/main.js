const es = new EventSource("/note/sse");

$(function() {});

function showAll() {
  $("#allNotes").show();
  $("#todayNotes").hide();
  $("#bookmarkNotes").hide();
}

function showToday() {
  $("#allNotes").hide();
  $("#todayNotes").show();
  $("#bookmarkNotes").hide();
}

function showBookmarks() {
  $("#allNotes").hide();
  $("#todayNotes").hide();
  $("#bookmarkNotes").show();
}

$(document).ready(() => {
  $("#picker").dateTimePicker({
    dateFormat: "DD.MM.YYYY. [at] HH:mm",
    title: "When is this happening?",
    positionShift: { top: -100, left: -100 }, //Add event for moving this shit
    buttonTitle: "Set time"
  }); //Allow datetime picker

  //Setup click events
  $("#toggleAll").click(() => {
    showAll();
  });
  $("#toggleToday").click(() => {
    showToday();
  });
  $("#toggleBookmarks").click(() => {
    showBookmarks();
  });

  const $result = $("#result");
  const $hideDate = $("#hideDate");
  const $picker = $("#picker");

  $result.hide();
  $picker.hide();

  $hideDate.click(function() {
    if ($(this).is(":checked")) {
      $result.show();
      $picker.show();
    } else {
      $result.hide();
      $picker.hide();
    }
  });

  es.addEventListener("date", data => {
    console.log(data);
  });
});
