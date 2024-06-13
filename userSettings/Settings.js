let settingButton = document.getElementById('js-dd-button');
let settingContent = document.getElementById('js-dd-content');
let ddGeneralContent = false;

let colorChanger = document.getElementById('js-colorChanger');
let colorChangerContent = document.getElementById('js-colorChangerContent')
let ddColorContentIsShowing = false;

settingButton.addEventListener('click', () => {
    if(ddGeneralContent){
        settingContent.classList.add('hidden');
    }
    else{

    }
    ddGeneralContent = !ddGeneralContent;

})

colorChanger.addEventListener('click', () => {
    if (ddColorContentIsShowing) {
        colorChangerContent.classList.add('hidden');
    }
    else{
        colorChangerContent.classList.remove('hidden');
    }

    ddColorContentIsShowing = !ddColorContentIsShowing;
})


