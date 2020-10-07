const endPoint = 'http://localhost:3000/api/refran/';
const segundosPausa = 5;
const textoHTML = document.querySelector('#refran');
var img = document.querySelector('img');

function getRefran () {
    fetch(endPoint)
        .then(
            resp=>resp.text()
        )
        .then(
            str=>textoHTML.innerText = str
        )
    img.src = `https://robohash.org/${textoHTML.innerText}.png?set=set4`;
    setTimeout(getRefran,segundosPausa*1000);
}

getRefran();

/*var añadir = document.getElementById('intro');
var init = document.getElementById('inicios');
var fin = document.getElementById('finales');

añadir.onclick = function(){
  inicios.push(init.value);
  finales.push(fin.value);
  init.value = "";
  fin.value = "";
}*/

