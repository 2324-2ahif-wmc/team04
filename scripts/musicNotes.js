const chartToMusic = document.getElementById('js-ChartToMusicSwitchButton');
const musicToChart = document.getElementById('js-MusicToChartSwitchButton');

const div = document.getElementById("js-sheetNoteMusic");

const diagram = document.getElementById('js-chart');

chartToMusic.addEventListener('click', () =>{
    div.classList.remove('hidden');
    diagram.classList.add('hidden');
    chartToMusic.classList.add('hidden');
    musicToChart.classList.remove('hidden');
    drawBackground();
});

musicToChart.addEventListener('click', () =>{
    div.classList.add('hidden');
    diagram.classList.remove('hidden');
    chartToMusic.classList.remove('hidden');
    musicToChart.classList.add('hidden');
});

function drawBackground(){


}
chartToMusic.addEventListener('click',()=>{

    const VF = Vex.Flow;
   // const div = document.getElementById("output");
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);


    // Größe des Notenblatts festlegen
    renderer.resize(800, 200);
    const context = renderer.getContext();
    const stave = new VF.Stave(10, 40, 750);

    // Schlüssel- und Taktangabe hinzufügen
    stave.addClef("treble").addTimeSignature("4/4");
    stave.setContext(context).draw();

    // Notenliste aus der HTML-Struktur extrahieren
    const noteList = document.querySelectorAll("#noteList li");
    const notes = Array.from(noteList).map(item => {
        const note = item.getAttribute("note").toLowerCase();  // Note extrahieren
        const duration = item.getAttribute("duration");       // Dauer extrahieren
        const octave = note.includes('2') || note.includes('3') ? note.slice(-1) : '4';  // Oktave bestimmen
        const noteName = note.replace(/\d/, '');  // Falls die Note eine Oktavangabe hat, diese entfernen
        return new VF.StaveNote({
            clef: "treble",
            keys: [`${noteName}/${octave}`],
            duration: duration
        });
    });

    // Stimme erstellen und Noten hinzufügen
    const voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(notes);

    // Formatieren und Zeichnen der Stimme
    const formatter = new VF.Formatter().joinVoices([voice]).format([voice], 700);
    voice.draw(context, stave);

 /*   const { Renderer, Stave } = Vex.Flow;

// Create an SVG renderer and attach it to the DIV element with id="output".
    const renderer = new Renderer(div, Renderer.Backends.SVG);

// Configure the rendering context.
    renderer.resize(700, 500);
    const context = renderer.getContext();
    context.setFont('Arial', 30);

// Create a stave of width 600 at position 50, 150.
    const stave = new Stave(50, 150, 600);

// Add a clef and time signature.
    stave.addClef('treble').addTimeSignature('4/4');
*/
  //  const notes = [
    //    new StaveNote({ clef: 'treble', keys: ['C#2'], duration: 'h' }),
       // new StaveNote({ clef: 'treble', keys: ['B/4'], duration: 'q' }),
     //   new StaveNote({ clef: 'treble', keys: ['A/4'], duration: 'q' }),
     //   new StaveNote({ clef: 'treble', keys: ['G#/4'], duration: 'q' }),
   // ];

    //const voice = new Voice({ num_beats: 4, beat_value: 4 });
   // voice.addTickables(notes);

// Format and justify the notes to fit within the stave width
//    const formatter = new Formatter().joinVoices([voice]).format([voice], 600);
   // voice.draw(context, stave);

// Connect it to the rendering context and draw!
   /* stave.setContext(context).draw();*/
})

