function updateFields() {
  fetch("http://localhost:3000/text").then(async function (resp) {
    let data = await resp.json();

    data.files.forEach((field) => {
      if (document.getElementById(field.id)) {
        document.getElementById(field.id).defaultValue = field.value;
      }
    });
  });
}
