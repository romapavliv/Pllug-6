const dragAndDropArea = document.getElementById("drag-n-drop-container");
const previewContainer = document.querySelector("#preview-container");
const fileEl = document.querySelector("#fileEl");
console.log(fileEl);

["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) =>
  dragAndDropArea.addEventListener(eventName, (event) => {
    event.preventDefault();
    event.stopPropagation();
  })
);

dragAndDropArea.addEventListener("drop", (event) => {
  let dt = event.dataTransfer;
  let files = dt.files;
  [...files].forEach(displayImage);
  console.log("files", files);
});

function displayImage(file) {
  if (previewContainer.children.length <= 9) {
    document.querySelector(".message").innerText = "";
    const img = document.createElement("div");
    img.setAttribute("draggable", "true");

    if (file.type.startsWith("image/")) {
      img.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
      img.classList.add("thumbnail");
    } else if (file.type == "text/plain") {
      img.style.backgroundImage =
        "url('http://www.fast-report.com/uploads/blogpost/frexport/html/TXT.png')";
    } else if (file.type == "text/csv") {
      img.style.backgroundImage =
        "url('https://cdn-icons-png.flaticon.com/512/29/29495.png')";
    } else {
      img.style.backgroundImage =
        "url('https://www.computerhope.com/jargon/e/error.png')";
    }

    img.classList.add("thumbnail");
    previewContainer.appendChild(img);

    let delEL = document.createElement("a");
    delEL.classList.add("del");
    img.appendChild(delEL);

    delEL.addEventListener("click", (e) => {
      e.target.parentNode.remove(e.parentNode);
      document.querySelector(".message").innerText = "";
    });
  } else {
    document.querySelector(".message").innerText =
      "Limit to uploading  - 10 files";
  }
}

fileEl.addEventListener("change", ({ target: { files } }) => {
  [...files].forEach(displayImage);
});

previewContainer.addEventListener("dragstart", (e) => {
  e.target.classList.add("taked");
});

previewContainer.addEventListener("dragend", (e) => {
  e.target.classList.remove("taked");
});

previewContainer.addEventListener("dragover", (e) => {
  e.preventDefault();
  let activeEl = previewContainer.querySelector(".taked");
  let takedEl = e.target;
  let moveEl = activeEl !== takedEl && takedEl.classList.contains("thumbnail");
  if (!moveEl) {
    return;
  }
  const nextEl = takedEl === activeEl ? takedEl.nextElementSibling : takedEl;
  previewContainer.insertBefore(activeEl, nextEl);
});

Завдання виконано
