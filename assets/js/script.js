const modal = {
     dragElement(elmnt) {
       let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
       
       const dragMouseDown = (e) => {
         e.preventDefault();
         pos3 = e.clientX;
         pos4 = e.clientY;
         document.addEventListener('mouseup', closeDragElement);
         document.addEventListener('mousemove', elementDrag);
       };
       
       const elementDrag = (e) => {
         e.preventDefault();
         pos1 = pos3 - e.clientX;
         pos2 = pos4 - e.clientY;
         pos3 = e.clientX;
         pos4 = e.clientY;
         elmnt.style.top = `${elmnt.offsetTop - pos2}px`;
         elmnt.style.left = `${elmnt.offsetLeft - pos1}px`;
       };
       
       const closeDragElement = () => {
         document.removeEventListener('mouseup', closeDragElement);
         document.removeEventListener('mousemove', elementDrag);
       };

       const header = document.getElementById("js-modal-window-header");
       
       if (header) {
         header.addEventListener('mousedown', dragMouseDown);
       } else {
         elmnt.addEventListener('mousedown', dragMouseDown);
       }
     }
   };

window.addEventListener('DOMContentLoaded', function(){
    const modal_window = document.querySelector('.js-modal-window');
    const modal_close = document.querySelector('.js-close');
    
    if(modal_window) {
        modal.dragElement(modal_window);

        if(modal_close) {
            modal_close.addEventListener('click', function(){
                modal_window.style.display = 'none';
            });
        }
    }

    document.querySelectorAll('.js-modal-open').forEach((e) => {
        e.addEventListener('click', function(){
            modal_window.style.display = 'block';
        });
    });
});