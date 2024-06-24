const chartToMusic = document.getElementById('js-ChartToMusicSwitchButton');
const musicToChart = document.getElementById('js-MusicToChartSwitchButton');

const diagram = document.getElementById('js-chart');

chartToMusic.addEventListener('click', () =>{
    diagram.classList.add('hidden');
    chartToMusic.classList.add('hidden');
    musicToChart.classList.remove('hidden');
});

musicToChart.addEventListener('click', () =>{
    diagram.classList.remove('hidden');
    chartToMusic.classList.remove('hidden');
    musicToChart.classList.add('hidden');
});