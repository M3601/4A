document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("audio").forEach((el) => {
    if (!el.paused) el.pause();
  });
  var compagni = new Set();
  var colori = [
    "#D32F2F",
    "#C2185B",
    "#7B1FA2",
    "#512DA8",
    "#303F9F",
    "#1976D2",
    "#0288D1",
    "#0097A7",
    "#00796B",
    "#388E3C",
    "#689F38",
    "#AFB42B",
    "#FBC02D",
    "#FFA000",
    "#F57C00",
    "#E64A19",
    "#5D4037",
    "#616161",
    "#455A64",
  ];
  colori.sort(() => Math.random() - 0.5);
  document.querySelectorAll(".mittente").forEach((el) => {
    compagni.add(el.innerText);
  });
  document.querySelectorAll(".mittente").forEach((el) => {
    el.style =
      "color: " + colori[Array.from(compagni).indexOf(el.innerText)] + ";";
  });
  var modalitem;
  document.querySelectorAll(".immagini").forEach((el) => {
    if (el.children.length > 4) el.classList.add("plus");
    el.addEventListener("click", (e) => {
      document.querySelector(".modal").classList.remove("hide");
      modalitem = e.target;
      document.querySelector("#modal-img").attributes.src.value =
        e.target.attributes.src.value;
    });
  });
  document.querySelector(".exit").addEventListener("click", () => {
    document.querySelector(".modal").classList.add("hide");
  });
  document.querySelector("#modal-img").addEventListener("click", () => {
    window.open(document.querySelector("#modal-img").attributes.src.value);
  });
  document.querySelector(".indietro").addEventListener("click", () => {
    if (modalitem == undefined) return;
    let index = Array.from(
      modalitem.parentElement.parentElement.children
    ).indexOf(modalitem.parentElement);
    if (index < 1) return;
    else
      modalitem =
        modalitem.parentElement.parentElement.children[index - 1].children[0];
    document.querySelector("#modal-img").attributes.src.value =
      modalitem.attributes.src.value;
  });
  document.querySelector(".avanti").addEventListener("click", () => {
    if (modalitem == undefined) return;
    let index = Array.from(
      modalitem.parentElement.parentElement.children
    ).indexOf(modalitem.parentElement);
    if (index + 1 >= modalitem.parentElement.parentElement.children.length)
      return;
    else
      modalitem =
        modalitem.parentElement.parentElement.children[index + 1].children[0];
    document.querySelector("#modal-img").attributes.src.value =
      modalitem.attributes.src.value;
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      if (modalitem == undefined) return;
      let index = Array.from(
        modalitem.parentElement.parentElement.children
      ).indexOf(modalitem.parentElement);
      if (index < 1) return;
      else
        modalitem =
          modalitem.parentElement.parentElement.children[index - 1].children[0];
      document.querySelector("#modal-img").attributes.src.value =
        modalitem.attributes.src.value;
    } else if (e.key === "ArrowRight") {
      if (modalitem == undefined) return;
      let index = Array.from(
        modalitem.parentElement.parentElement.children
      ).indexOf(modalitem.parentElement);
      if (index + 1 >= modalitem.parentElement.parentElement.children.length)
        return;
      else
        modalitem =
          modalitem.parentElement.parentElement.children[index + 1].children[0];
      document.querySelector("#modal-img").attributes.src.value =
        modalitem.attributes.src.value;
    }
  });

  var initialX = null;
  var initialY = null;
  document.querySelector(".modal").addEventListener(
    "touchstart",
    (e) => {
      initialX = e.touches[0].clientX;
      initialY = e.touches[0].clientY;
    },
    false
  );
  document
    .querySelector(".modal")
    .addEventListener("touchmove", moveTouch, false);
  function moveTouch(e) {
    if (initialX === null) return;
    if (initialY === null) return;
    var currentX = e.touches[0].clientX;
    var currentY = e.touches[0].clientY;
    var diffX = initialX - currentX;
    var diffY = initialY - currentY;
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        //left
        if (modalitem == undefined) return;
        let index = Array.from(
          modalitem.parentElement.parentElement.children
        ).indexOf(modalitem.parentElement);
        if (index + 1 >= modalitem.parentElement.parentElement.children.length)
          return;
        else
          modalitem =
            modalitem.parentElement.parentElement.children[index + 1]
              .children[0];
        document.querySelector("#modal-img").attributes.src.value =
          modalitem.attributes.src.value;
      } else {
        //right
        if (modalitem == undefined) return;
        let index = Array.from(
          modalitem.parentElement.parentElement.children
        ).indexOf(modalitem.parentElement);
        if (index < 1) return;
        else
          modalitem =
            modalitem.parentElement.parentElement.children[index - 1]
              .children[0];
        document.querySelector("#modal-img").attributes.src.value =
          modalitem.attributes.src.value;
      }
    } else {
      if (diffY > 0) {
        //up
        document.querySelector(".exit").click();
      } else {
        //down
      }
    }
    initialX = null;
    initialY = null;
    e.preventDefault();
  }
});
