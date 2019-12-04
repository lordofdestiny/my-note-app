const allNotes = document.getElementById("allNotes");
const newNoteForm = document.getElementById("newNoteForm");
const sendNew = document.getElementById("sendNew");

$(newNoteForm).submit("form[data-pjax]", function(event) {
  event.preventDefault();
  event.stopPropagation();
  const valid = validateForm(this);
  if (valid) {
    const data = Object.fromEntries(new FormData(this).entries());
    const fd = data.flash_date;
    data.flash_date = fd == "" ? null : parseFlashDate(fd);
    axios
      .post("/note", data)
      .then(result => {
        $.pjax.reload("#allNotes", {
          push: false,
          replace: true,
          timeout: 3000,
          fragment: "#allNotes"
        });
      })
      .catch(error => {
        alert("Note wasnt created! We are sorry for the inconvinience!");
      })
      .finally(() => {
        $("#createNote").modal("hide");
        $("#newNoteForm").trigger("reset");
        $("#newNoteForm").removeClass("was-validated");
        $("#picker").hide();
        $("#result").hide();
      });
  }
});
