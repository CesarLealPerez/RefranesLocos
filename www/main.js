var language = 'es';
var lat, long, meteo, geo;
var icon = document.querySelector('img');
var input = document.querySelector('p.city');
var prevision = document.querySelector('p.prevision')
    
function mixAll() {
    if ( lat && long && meteo && geo ) {
        console.log('**** Todas las respuestas recibidas ****');
        console.log(`Meteo: ${meteo}, Geo: ${geo}, Coords: ${long} ${lat}`);
        input.innerText = geo;
        prevision.innerText = meteo;
        goOnIt();
       
    } else {
        console.log('** Esperando al resto de respuestas... **');
        icon.src = `./img/${meteo}.svg`;
        setTimeout(getCoords,30000);
        goOnIt();
    }
}
