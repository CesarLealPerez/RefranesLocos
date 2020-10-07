const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const multer  = require('multer');
const mimeParser = multer();

const port = 3000

var inicios = ['A quien me toca los melones,','A barriga llena,','A buen entendedor,','A buen hambre,','A buenas horas,','A burro muerto,','A caballo regalado ','A cada cerdo ','A Dios rogando ','A enemigo que huye,','A falta de pan,','A grandes males,','A gusto de los cocineros','A la arrogancia en el pedir,','A la cama no te irás','A la tercera','A la vejez,','A lo hecho,' ];
var finales = ['patada en los cojones','y con el mazo dando.','pecho.','viruelas.','va la vencida.','sin saber una cosa más.','la virtud del no dar.','comen los frailes.','grandes remedios.','buenas son tortas.','puente de plata.','corazón contento.','pocas palabras bastan.', 'no hay pan duro.',' mangas verdes',' la cebada al rabo.','no le mires el diente.','le llega su San Martín.'];

/*var añadir = document.querySelector('intro');
var init = document.getElementById('inicios');
var fin = document.getElementById('finales');*/

function aleatorio(lista){
    return Math.round((lista.length-1)*Math.random())
}
app.get('/', (req, res) => {
  res.send('Página de inicio')
  console.log('Visita en /')
})

app.get('/api/', (req, res) => {
    res.send('Esta es la API')
    console.log('Visita a la API')
  })

app.get('/api/suma', (req, res) => {
  var a = parseFloat(req.query.a)
  var b = parseFloat(req.query.b)

    res.send((a+b).toString())
    console.log(req.query.a,req.query.b)
  })

app.get('/api/refran', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  var ini = aleatorio(inicios);
  var fin = aleatorio(finales);
  res.send(inicios[ini]+' '+finales[fin])
  console.log('Refranes locos')
})

app.post('/api/addRefran/',mimeParser.none(),(req,res) => {
    console.log(req.method, req.url, req.ip);
    console.log(`Inicio: ${req.body.inicio} Final: ${req.body.final}`)
    res.send(200)
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

/*añadir.onclick = function(){
  inicios.push(init.value);
  finales.push(fin.value);
  init.value = "";
  fin.value = "";
}*/