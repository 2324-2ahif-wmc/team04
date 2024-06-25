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
    const { Renderer, Stave } = Vex.Flow;

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
    stave.setContext(context).draw();
})

