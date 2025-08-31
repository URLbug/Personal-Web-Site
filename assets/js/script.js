const modal = {
  dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    const dragStart = (e) => {
      e.preventDefault();
      if (e.type === "touchstart") {
        pos3 = e.touches[0].clientX;
        pos4 = e.touches[0].clientY;
        document.addEventListener("touchend", dragEnd);
        document.addEventListener("touchmove", dragMove);
      } else {
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.addEventListener("mouseup", dragEnd);
        document.addEventListener("mousemove", dragMove);
      }
    };

    const dragMove = (e) => {
      e.preventDefault();
      let clientX, clientY;

      if (e.type === "touchmove") {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      pos1 = pos3 - clientX;
      pos2 = pos4 - clientY;
      pos3 = clientX;
      pos4 = clientY;

      elmnt.style.top = `${elmnt.offsetTop - pos2}px`;
      elmnt.style.left = `${elmnt.offsetLeft - pos1}px`;
    };

    const dragEnd = (e) => {
      if (e.type === "touchend") {
        document.removeEventListener("touchend", dragEnd);
        document.removeEventListener("touchmove", dragMove);
      } else {
        document.removeEventListener("mouseup", dragEnd);
        document.removeEventListener("mousemove", dragMove);
      }
    };

    const header = elmnt.querySelector(".js-modal-window-header");

    if (header) {
      header.addEventListener("mousedown", dragStart);
      header.addEventListener("touchstart", dragStart, { passive: false });
    } else {
      elmnt.addEventListener("mousedown", dragStart);
      elmnt.addEventListener("touchstart", dragStart, { passive: false });
    }
  }
};

window.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".js-modal-window").forEach((modal_window) => {
    modal.dragElement(modal_window);

    const modal_close = modal_window.querySelector(".js-close");
    if (modal_close) {
      modal_close.addEventListener("click", function () {
        modal_window.style.display = "none";
      });
    }
  });

  document.querySelectorAll(".js-modal-open").forEach((e) => {
    e.addEventListener("click", function () {
      const targetId = e.getAttribute('data-target'); // data-target="#idОкна"
      const targetModal = document.querySelector(targetId);
      if (targetModal) {
        targetModal.style.display = "block";
      }
    });
  });
});
