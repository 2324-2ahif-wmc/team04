let settingButton = document.getElementById('js-dd-button');
let settingContent = document.getElementById('js-dd-content');
let ddGeneralContent = false;

let colorChanger = document.getElementById('js-colorChanger');
let colorChangerContent = document.getElementById('js-colorChangerContent')
let ddColorContentIsShowing = false;

settingButton.addEventListener('click', () => {
    if (ddGeneralContent) {
        settingContent.classList.add('hidden');
    } else {
        settingContent.classList.remove('hidden');
    }
    ddGeneralContent = !ddGeneralContent;
})

colorChanger.addEventListener('click', () => {
    if (ddColorContentIsShowing) {
        colorChangerContent.classList.add('hidden');
    } else {
        colorChangerContent.classList.remove('hidden');
    }

    const colorOne = document.getElementById('colorOne');
    const colorTwo = document.getElementById('colorTwo');
    const keyboard = document.getElementById('keyboard');
    const volumeBox = document.getElementById('volumeBox');

    document.querySelectorAll(".backgroundColor_option").forEach(button => {
        button.addEventListener('click', function () {
            const color = this.getAttribute("data-color");
            document.body.style.backgroundColor = color;
            colorOne.style.backgroundColor = color;
        });
    });
    document.querySelectorAll(".sideColor").forEach(button => {
        button.addEventListener('click', function () {
            const color = this.getAttribute("data-color");
            colorTwo.style.backgroundColor = color;

            if (color === '#e3d4a5') {
                keyboard.style.backgroundColor = '#525252';
                volumeBox.style.backgroundColor = '#525252';
            } else {
                keyboard.style.backgroundColor = color;
                volumeBox.style.backgroundColor = color;
            }

        })

    });

    ddColorContentIsShowing = !ddColorContentIsShowing;
})


