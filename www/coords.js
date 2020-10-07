function getCoords () {
    const geoOptions = {
        timeout: 1000,
        maximumAge: 30000,
    }

    function geoResponse (position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        console.log('->Coords:', lat, long);
        /**
         * Las API para obtener los datos meteorológicos y 
         * la localización geográfica dependen de las coordenadas
         * obtenidas en esta función, así que hemos de llamarlas
         * aquí, tras obtener las coordenadas.
         * *************************************************** */
        getGeolocation(lat,long,language);
        getMeteo(lat,long);
        /** ************************************************** */
    }

    function geoError (err) {
        console.error('declaradas',err);
    }

    navigator.geolocation.getCurrentPosition(geoResponse,geoError,geoOptions);
}