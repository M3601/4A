document.addEventListener("DOMContentLoaded", () => {
  let playing = undefined;
  document.querySelectorAll("audio").forEach((el) => {
    if (!el.paused) el.pause();
    el.addEventListener("play", () => {
      try {
        playing.pause();
      } catch (error) {}
      playing = el;
    });
  });
  document.querySelector("#dark-switcher").addEventListener("change", () => {
    if (document.querySelector("#dark-switcher").checked)
      document.querySelector("body").classList.add("dark");
    else document.querySelector("body").classList.remove("dark");
    document.cookie = `dark=${
      document.querySelector("#dark-switcher").checked
    }`;
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
    if (el.children.length > 4) {
      el.classList.add("plus");
      let newelem = document.createElement("div");
      newelem.classList.add("c");
      newelem.appendChild(
        document.createTextNode(`+${el.children.length - 3}`)
      );
      el.appendChild(newelem);
    }
    el.addEventListener("click", (e) => {
      if (e.target.src) {
        modalitem = e.target;
        document.querySelector("#modal-img").attributes.src.value =
          e.target.attributes.src.value;
        document.querySelector(".modal").classList.remove("hide");
      }
    });
  });
  document.querySelectorAll(".c").forEach((el) => {
    el.addEventListener("click", (e) => {
      modalitem = e.target.parentElement.children[0].children[0];
      document.querySelector("#modal-img").attributes.src.value = modalitem.src;
      document.querySelector(".modal").classList.remove("hide");
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
    else if (
      modalitem.parentElement.parentElement.children[index + 1].children[0].src
    )
      modalitem =
        modalitem.parentElement.parentElement.children[index + 1].children[0];
    document.querySelector("#modal-img").attributes.src.value =
      modalitem.attributes.src.value;
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      if (!modalitem) return;
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
      else if (
        modalitem.parentElement.parentElement.children[index + 1].children[0]
          .src
      )
        modalitem =
          modalitem.parentElement.parentElement.children[index + 1].children[0];
      document.querySelector("#modal-img").attributes.src.value =
        modalitem.attributes.src.value;
    }
    if (e.key === "Escape") document.querySelector(".exit").click();
  });

  var initialX = null;
  var initialY = null;
  document.addEventListener(
    "touchstart",
    (e) => {
      initialX = e.touches[0].clientX;
      initialY = e.touches[0].clientY;
    },
    false
  );
  document.addEventListener("touchmove", moveTouch, false);
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
        console.dir("left");
        if (modalitem == undefined) return;
        let index = Array.from(
          modalitem.parentElement.parentElement.children
        ).indexOf(modalitem.parentElement);
        if (index + 1 >= modalitem.parentElement.parentElement.children.length)
          return;
        else
          try {
            modalitem.parentElement.parentElement.children[index + 1]
              .children[0].src;
            modalitem =
              modalitem.parentElement.parentElement.children[index + 1]
                .children[0];
          } catch (error) {}
        document.querySelector("#modal-img").attributes.src.value =
          modalitem.attributes.src.value;
      } else {
        //right
        console.dir("right");
        if (modalitem == undefined) return;
        let index = Array.from(
          modalitem.parentElement.parentElement.children
        ).indexOf(modalitem.parentElement);
        if (index < 1) return;
        else if (
          modalitem.parentElement.parentElement.children[index - 1].children[0]
            .src
        )
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
        document.querySelector(".exit").click();
      }
    }
    initialX = null;
    initialY = null;
    e.preventDefault();
  }

  var cookies = Object.fromEntries(
    (() => {
      let tmp = [];
      document.cookie.split("; ").forEach((cookie) => {
        tmp.push(cookie.split("="));
      });
      return tmp;
    })()
  );
  if (cookies.dark == "true") document.querySelector("#dark-switcher").click();
  if (cookies.accept != "true") window.location = "/warning.html";
});
