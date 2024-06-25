let click = new Audio('/audio/click.wav');
playClick();

function loadBackgroundColor() {
    fetch('http://localhost:3000/backgrounds')
        .then(response => response.json())
        .then(data => {
            const color = data.backgroundColor;
            if (color) {
                document.body.style.backgroundColor = color;
                document.getElementById('colorOne').style.backgroundColor = color;
            }
        })
        .catch(error => {
            console.error('Fehler beim Laden der Hintergrundfarbe:', error);
        });
}

function loadSideColor() {
    fetch('http://localhost:3000/sideColors')
        .then(response => response.json())
        .then(data => {
            const color = data.sideColor;
            if (color) {
                document.getElementById('keyboard').style.backgroundColor = color;
                document.getElementById('volumeBox').style.backgroundColor = color;
                document.getElementById('colorTwo').style.backgroundColor = color;
                // Farbe Notenlabel
            }
        })
        .catch(error => {
            console.error('Fehler beim Laden des Side Colors:', error);
        });
}


//Schalter für Synthesizer
document.addEventListener('DOMContentLoaded', function () { //wenn alles geladen ist
    let powerSwitch = document.getElementById('js-power-switch');
    loadBackgroundColor();
    loadSideColor();

    powerSwitch.addEventListener('change', function () {
        if (powerSwitch.checked) {
            playClick();
            playSound();
        } else {
            location.reload(); //TODO: Möglichen Ersatz für den reload finden
        }
    });

    // Login Button
    const loginOut = document.getElementById('log-in-out');
    const user = localStorage.getItem('user');

    if (user) {
        loginOut.innerHTML = '<a href="" id="logout" class="text-end log-btn" >Logout</a>';
        document.getElementById('logout').addEventListener('click', () => {
            localStorage.removeItem('user');
            location.reload();
        });
    } else {
        loginOut.innerHTML = '<a href="login/login.html" class="text-end log-btn">Login</a>';
    }
});

function playClick() {
    click.play();
}

function playSound() {

    const audioContext = new (window.AudioContext || window.webkitAudioContext)(); // tool um Audio zu bekommen. Ersteres ist die neue Variante

    const getElementByNote = (note) => //gibt Element zurück
        note && document.querySelector(`[note="${note}"]`); // Pfüft ob note einen Wert hat nach '&&' sucht es im HTML ein Element mit dem Attribut 'note'

    const keys = { //Elemente werden Elemente, Noten und Oktaven zugewiesen
        A: {element: getElementByNote("C"), note: "C", octaveOffset: 0},
        W: {element: getElementByNote("C#"), note: "C#", octaveOffset: 0},
        S: {element: getElementByNote("D"), note: "D", octaveOffset: 0},
        E: {element: getElementByNote("D#"), note: "D#", octaveOffset: 0},
        D: {element: getElementByNote("E"), note: "E", octaveOffset: 0},
        F: {element: getElementByNote("F"), note: "F", octaveOffset: 0},
        T: {element: getElementByNote("F#"), note: "F#", octaveOffset: 0},
        G: {element: getElementByNote("G"), note: "G", octaveOffset: 0},
        Z: {element: getElementByNote("G#"), note: "G#", octaveOffset: 0},
        H: {element: getElementByNote("A"), note: "A", octaveOffset: 1},
        U: {element: getElementByNote("A#"), note: "A#", octaveOffset: 1},
        J: {element: getElementByNote("B"), note: "B", octaveOffset: 1},
        K: {element: getElementByNote("C2"), note: "C", octaveOffset: 1},
        O: {element: getElementByNote("C#2"), note: "C#", octaveOffset: 1},
        L: {element: getElementByNote("D2"), note: "D", octaveOffset: 1},
        P: {element: getElementByNote("D#2"), note: "D#", octaveOffset: 1},
        Ö: {element: getElementByNote("E2"), note: "E", octaveOffset: 1},
        Ä: {element: getElementByNote("F2"), note: "F", octaveOffset: 1},
        B: {element: getElementByNote("F#2"), note: "F#", octaveOffset: 1},
        Y: {element: getElementByNote("G2"), note: "G", octaveOffset: 1},
        N: {element: getElementByNote("G#2"), note: "G#", octaveOffset: 1},
        X: {element: getElementByNote("A2"), note: "A", octaveOffset: 2},
        M: {element: getElementByNote("A#2"), note: "A#", octaveOffset: 2},
        C: {element: getElementByNote("B2"), note: "B", octaveOffset: 2},
        V: {element: getElementByNote("C3"), note: "C", octaveOffset: 2},
    };

    const getHz = (note = "A", octave = 4) => { //the note A and the octave 4 are marked as the norm
        const A4 = 440; //hz of the norm
        let halfNotes = 0; //half notes away from A
        switch (note) {
            default:
            case "A":
                halfNotes = 0;
                break;
            case "A#":
            case "Bb":
                halfNotes = 1;
                break;
            case "B":
                halfNotes = 2;
                break;
            case "C":
                halfNotes = 3;
                break;
            case "C#":
            case "Db":
                halfNotes = 4;
                break;
            case "D":
                halfNotes = 5;
                break;
            case "D#":
            case "Eb":
                halfNotes = 6;
                break;
            case "E":
                halfNotes = 7;
                break;
            case "F":
                halfNotes = 8;
                break;
            case "F#":
            case "Gb":
                halfNotes = 9;
                break;
            case "G":
                halfNotes = 10;
                break;
            case "G#":
            case "Ab":
                halfNotes = 11;
                break;
        }
        halfNotes += 12 * (octave - 4); //adds the octave offset
        return A4 * Math.pow(2, halfNotes / 12); //calculates the hz f.g. if halfNotes=12 it would be 440 * 2^12/12 = 880
    };

    const pressedNotes = new Map();
    let clickedKey = "";

    const playKey = (key) => {
        if (!keys[key]) { //checks if the parameter is in keys
            return;
        }

        const osc = audioContext.createOscillator(); //an Oscillator creates a sound wave which can be perceived as a tone
        const noteGainNode = audioContext.createGain(); //GainNode to control the volume
        noteGainNode.connect(audioContext.destination); //Connecting GainNode with audioContext in order to create a tone

        const zeroGain = 0.00001; //create a gain value for no tone
        const maxGain = 0.5; //one for maximal volume
        const sustainedGain = 0.001; //and one in between

        noteGainNode.gain.value = zeroGain;

        const setAttack = () => //give the audio max volume
            noteGainNode.gain.exponentialRampToValueAtTime( //set the volume and the end time
                maxGain,
                audioContext.currentTime + 0.01
            );
        const setDecay = () => //give the audio a bit of volume
            noteGainNode.gain.exponentialRampToValueAtTime(
                sustainedGain,
                audioContext.currentTime + 1
            );
        const setRelease = () => //give the audio no volume
            noteGainNode.gain.exponentialRampToValueAtTime(
                zeroGain,
                audioContext.currentTime + 2
            );

        setAttack();
        setDecay();
        setRelease();

        /*
        document.getElementById('slider').addEventListener('input', changeVolume);

        function changeVolume(){
            noteGainNode.gain.value = this.value;
        }
        */
        osc.connect(noteGainNode); //connects out and input
        osc.type = "triangle"; //waveform of oscillator set on triangle

        const freq = getHz(keys[key].note, (keys[key].octaveOffset || 0) + 3); //calculate frequency

        if (Number.isFinite(freq)) { //check if frequency is valid if yes you give the oscillator the value
            osc.frequency.value = freq;
        }

        keys[key].element.classList.add("pressed"); //add class pressed to the HTML element for the visual aspects
        pressedNotes.set(key, osc);
        pressedNotes.get(key).start(); //the oscillator gets saved and started in pressedNotes


    };
    const stopKey = (key) => {
        if (!keys[key]) { //checks if the parameter is in keys
            return;
        }

        keys[key].element.classList.remove("pressed"); //remove class pressed from the HTML element for the visual aspects
        const osc = pressedNotes.get(key); //gets the value

        if (osc) { //stops the oscillator after two seconds
            setTimeout(() => {
                osc.stop();
            }, 2000);

            pressedNotes.delete(key); //deletes the key out of the map
        }
    };

    document.addEventListener("keydown", (e) => { //e = information about key-down event
        const key = e.key.toUpperCase();

        if (!key || pressedNotes.get(key)) {
            return;
        }
        playKey(key);

        addDataToChart(key, getHz(keys[key].note, (keys[key].octaveOffset || 0) + 3)); // Diagramm aktualisieren
    });

    document.addEventListener("keyup", (e) => {
        const key = e.key.toUpperCase();

        if (!key) {
            return;
        }
        stopKey(key);
    });

    for (const [key, {element}] of Object.entries(keys)) {
        element.addEventListener("mousedown", () => {
            playKey(key);

            addDataToChart(key, getHz(keys[key].note, (keys[key].octaveOffset || 0) + 3)); // Diagramm aktualisieren
            clickedKey = key;
        });
    }

    document.addEventListener("mouseup", () => {
        stopKey(clickedKey);
    });

}


//Diagramm
var ctx = document.getElementById('js-synthDiagramm').getContext('2d');
var synthDiagramm = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['0s', '1s', '2s', '3s', '4s', '5s', '6s'],
        datasets: [
            {
                label: 'Noten',
                data: [],
                borderColor: '#e3d4a5', //schöne Farben für die Linie
                backgroundColor: '#e3d4a5',
                fill: false
            }
        ]
    },
    options: {
        responsive: true,
        animation: false,
        scales: {
            x: {
                display: false, //x-Achse ausblenden

            },
            y: {
                display: true,
                ticks: {
                    callback: function (value) {
                        const noteLabels = {
                            '-1': 'B',
                            '-0.5': 'B/C',
                            0: 'C',
                            0.5: 'C#',
                            1: 'D',
                            1.5: 'D#',
                            2: 'E',
                            2.5: 'E/F',
                            3: 'F',
                            3.5: 'F#',
                            4: 'G',
                            4.5: 'G#',
                            5: 'A',
                            5.5: 'A#',
                            6: 'B',
                            6.5: 'B/C2',
                            7: 'C2',
                            7.5: 'C#2',
                            8: 'D2',
                            8.5: 'D#2',
                            9: 'E2',
                            9.5: 'E2/F2',
                            10: 'F2',
                            10.5: 'F#2',
                            11: 'G2',
                            11.5: 'G#2',
                            12: 'A2',
                            12.5: 'A#2',
                            13: 'B2',
                            13.5: 'B2/C3',
                            14: 'C3',
                            14.5: 'C#3',
                            15: 'D3'
                        };
                        return noteLabels[value] || value;
                    },
                    min: 0,
                    max: 14,
                    stepSize: 0.5
                }
            }
        }
    }

});


// Funktion zum Aktualisieren des Diagramms
function addDataToChart(note, frequency) {
    const currentTime = synthDiagramm.data.labels.length + 's'; // Zeit in Sekunden hinzufügen
    synthDiagramm.data.labels.push(currentTime); // Neue Zeit hinzufügen

    const noteIndices = {
        'A': 0,
        'W': 0.5,
        'S': 1,
        'E': 1.5,
        'D': 2,
        'F': 3,
        'T': 3.5,
        'G': 4,
        'Z': 4.5,
        'H': 5,
        'U': 5.5,
        'J': 6,
        'K': 7,
        'O': 7.5,
        'L': 8,
        'P': 8.5,
        'Ö': 9,
        'Ä': 10,
        'B': 10.5,
        'Y': 11,
        'N': 11.5,
        'X': 12,
        'M': 12.5,
        'C': 13,
        'V': 14
    };

    const noteIndex = noteIndices[note];
    synthDiagramm.data.datasets[0].data.push(noteIndex); // Neue Frequenz hinzufügen
    limitShownPoints();
    synthDiagramm.update(); // Diagramm aktualisieren
}

function limitShownPoints() {
    if (synthDiagramm.data.labels.length > 20) { // Anzahl der angezeigten Punkte auf 20 begrenzt
        synthDiagramm.data.labels.shift();
        synthDiagramm.data.datasets[0].data.shift();
    }
}

document.querySelectorAll(".sideColor").forEach(button => {
    button.addEventListener('click', function () {
        const color = this.getAttribute("data-color");

        synthDiagramm.data.datasets[0].borderColor = color;
        synthDiagramm.data.datasets[0].backgroundColor = color;
        synthDiagramm.update();
    })


});



