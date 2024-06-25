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