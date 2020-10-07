const endPoint = 'http://localhost:3000/api/refran/';
const segundosPausa = 5;
const textoHTML = document.querySelector('#refran');
var img = document.querySelector('img#cat');
var añadir = document.getElementById('intro');
var init = document.getElementById('inicio');
var fin = document.getElementById('final');
//var addRefranURL = 'http://localhost:3000/api/addRefran'
var addDBURL = 'http://localhost:3000/nuevo/?texto=XXXXXX';

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

function enviar () {
    /**
     * POST en formato mime-multipart
     */
    var data = new FormData();
    data.append('inicio',init.value);
    data.append('final',fin.value);
    var requestOptions = {
        method: 'POST',
        body: data,
    };
    init.value = '';
    fin.value = '';

    fetch(addDBURL,requestOptions)
        .then(res=>window.alert('¡Gracias por tu aportación!'))
        .catch(res=>window.alert('Algo salio mal'))
    ;
}

añadir.onclick = enviar

getRefran();



