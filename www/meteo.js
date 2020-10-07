function getMeteo (lat,long) {
  var endPoint = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${long}`;
  fetch(endPoint)
    .then(response=>response.json())
      .then (obj=> {
        meteo = obj.properties.timeseries[0].data.next_1_hours.summary.symbol_code;
        console.log('->Meteo:', meteo);
        mixAll();
      })
}