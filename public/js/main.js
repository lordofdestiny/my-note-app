$(document).ready(() => {
  $("#picker").dateTimePicker({
    dateFormat: "DD.MM.YYYY. [at] HH:mm",
    title: "When is this happening?",
    positionShift: { top: -100, left: -100 }, //Add event for moving this shit
    buttonTitle: "Set time"
  }); //Allow datetime picker

  const $result = $("#result");
  const $hideDate = $("#hideDate");
  const $picker = $("#picker");

  $result.hide();
  $picker.hide();

  $hideDate.change(function() {
    if ($(this).is(":checked")) {
      $result.show();
      $picker.show();
    } else {
      $result.hide();
      $picker.hide();
    }
  });
});
