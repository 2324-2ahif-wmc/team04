let settingButton = document.getElementById('js-dd-button');
let settingContent = document.getElementById('js-dd-content');
let ddGeneralContent = true;

let colorChanger = document.getElementById('js-colorChanger');
let colorChangerContent = document.getElementById('js-colorChangerContent')
let ddColorContentIsShowing = true;

let userSettingsIcon = document.getElementById('js-userSettingsIcon');


settingButton.addEventListener('click', () => {
    if (!ddGeneralContent) {
        settingContent.classList.add('hidden');
        colorChangerContent.classList.add('hidden');
    } else {
        settingContent.classList.remove('hidden');
        userSettingsIcon.classList.remove('hidden');
        
    }

    ddGeneralContent = !ddGeneralContent;
})

colorChanger.addEventListener('click', () => {
    if (!ddColorContentIsShowing) {
        colorChangerContent.classList.add('hidden');

        userSettingsIcon.classList.remove('hidden');

    } else {
        colorChangerContent.classList.remove('hidden');

        userSettingsIcon.classList.add('hidden');
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

            // Hintergrundfarbe in der db.json speichern
            fetch('http://localhost:3000/backgrounds', {
                method: 'PATCH', // PATCH, um das vorhandene Objekt zu aktualisieren
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({backgroundColor: color})
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Erfolgreich gespeichert:', data);
                })
                .catch(error => {
                    console.error('Fehler beim Speichern:', error);
                });

        });
    });
    document.querySelectorAll(".sideColor").forEach(button => {
        button.addEventListener('click', function () {
            const color = this.getAttribute("data-color");
            colorTwo.style.backgroundColor = color;

            let sideColor = null;

            if (color === '#e3d4a5') {
                keyboard.style.backgroundColor = '#525252';
                  volumeBox.style.backgroundColor = '#525252';

                sideColor = '#525252';

            } else {
                   keyboard.style.backgroundColor = color;
                 volumeBox.style.backgroundColor = color;

                sideColor = color;
            }

            // SideColor in der db.json speichern
            fetch('http://localhost:3000/sideColors', {
                method: 'PATCH', // PATCH, um das vorhandene Objekt zu aktualisieren
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({sideColor: sideColor})
            })
                .then(response => response.json())
                .then(data => {
                    console.log('SideColor gespeichert:', data);
                })
                .catch(error => {
                    console.error('Fehler beim Speichern des side colors:', error);
                });

        })


    });

    ddColorContentIsShowing = !ddColorContentIsShowing;
})






