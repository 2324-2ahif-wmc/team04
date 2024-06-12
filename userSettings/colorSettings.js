let colorChanger = document.getElementById('js-colorChanger')
let colorChangerContent = document.getElementById('js-colorChangerContent')
let isShowing = false;

colorChanger.addEventListener('click', () =>{
    if(isShowing){
        colorChangerContent.classList.add('hidden');
        isShowing = false;
        return;
    }

    colorChangerContent.classList.remove('hidden');
    isShowing = true
})
