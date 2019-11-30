const allNotes = document.getElementById("allNotes");
const newNoteForm = document.getElementById("newNoteForm");
const sendNew = document.getElementById("sendNew");

newNoteForm.addEventListener("submit", function(e) {
  e.preventDefault();
  e.stopPropagation();

  validateForm(this, () => {
    const data = Object.fromEntries(new FormData(this).entries());
    const fd = data.flash_date;
    data.flash_date = fd == "" ? null : parseFlashDate(fd);
    axios
      .post("/note", data)
      .then(result => {
        const Note = Handlebars.templates["note.hbs"];
        const newNote = Note(result.data.note);
        const html = $.parseHTML(newNote)[0];
        allNotes.prepend(html);
      })
      .catch(error => {
        console.log(error);
        alert("Note wasnt created! We are sorry for the inconvinience!");
      })
      .finally(() => {
        $("#createNote").modal("hide");
        $("#newNoteForm").trigger("reset");
        $("#newNoteForm").removeClass("was-validated");
        $("#picker").hide();
        $("#result").hide();
      });
  });
});
