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
  document.querySelectorAll('.js-modal-open').forEach(link => {
        link.addEventListener('click', e => {
            const target = link.getAttribute('data-target'); // "#about"
            const modal_window = document.querySelector(target);

            if (modal_window) {
                const modal_close = modal_window.querySelector(".js-close");
                modal_close.addEventListener("click", function () {
                    modal_window.style.display = "none";
                });

                modal_window.style.display = 'block';
                modal.dragElement(modal_window);

                // Центрируем окно как в Windows
                modal_window.style.top = `${(window.innerHeight - modal_window.offsetHeight) / 2}px`;
                modal_window.style.left = `${(window.innerWidth - modal_window.offsetWidth) / 2}px`;
            }
        });
    });
});
