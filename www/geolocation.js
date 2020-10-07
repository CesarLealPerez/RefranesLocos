function getGeolocation (lat,long,language) {
  var endPoint = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=${language}`;
  fetch(endPoint)
    .then(response=>response.json())
      .then(obj=>{
        geo = obj.city
        console.log('->Geo:',geo)
        mixAll()
      }
    )
}
