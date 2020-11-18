const express = require('express')
const app = express()

// https://www.npmjs.com/package/cors
const cors = require('cors');
app.use(cors());

// https://www.npmjs.com/package/body-parser
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// https://www.npmjs.com/package/multer
const multer  = require('multer');
const { response } = require('express');
const mimeParser = multer();

const MongoClient = require('mongodb').MongoClient;
const mongoURL = 'mongodb://localhost:27017/pruebas';
const collName1 = 'Inicios';
const collName2 = 'Finales';

var col, cli;

const port = process.env.PORT || 3000

/*var inicios = ['A quien me toca los melones,','A barriga llena,','A buen entendedor,','A buen hambre,','A buenas horas,','A burro muerto,','A caballo regalado ','A cada cerdo ','A Dios rogando ','A enemigo que huye,','A falta de pan,','A grandes males,','A gusto de los cocineros','A la arrogancia en el pedir,','A la cama no te irás','A la tercera','A la vejez,','A lo hecho,' ];
var finales = ['patada en los cojones','y con el mazo dando.','pecho.','viruelas.','va la vencida.','sin saber una cosa más.','la virtud del no dar.','comen los frailes.','grandes remedios.','buenas son tortas.','puente de plata.','corazón contento.','pocas palabras bastan.', 'no hay pan duro.',' mangas verdes',' la cebada al rabo.','no le mires el diente.','le llega su San Martín.'];
*/

function aleatorio(lista){
    return Math.round((lista.length-1)*Math.random())
}

/*function añadir(){
  inicios.push(req.body.inicio);
  finales.push(req.body.final);
}*/

app.get('/', (req, res) => {
  res.send('Página de inicio')
  console.log('Visita en /')
})

app.get('/api/', (req, res) => {
    res.send('Esta es la API')
    console.log('Visita a la API')
  })

/*app.get('/api/suma', (req, res) => {
  var a = parseFloat(req.query.a)
  var b = parseFloat(req.query.b)

    res.send((a+b).toString())
    console.log(req.query.a,req.query.b)
  })
*/

app.get('/api/refran', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');

  var promesaIni = MongoClient.connect(mongoURL)
  .then(client=>{
    cli=client
    col=cli.db().collection(collName1);
    return col.find().toArray()
    }
  )
  .then(response => {
      return response[aleatorio(response)];
      }  
  )

    var promesaFin = MongoClient.connect(mongoURL)
    .then(client=>{
      cli=client
      col=cli.db().collection(collName2);
     return col.find().toArray()
      }
    )
    .then(response => {
        return response[aleatorio(response)];
      }  
    )

  Promise.all ([promesaIni, promesaFin])
        .then(
          refran=> res.send (refran[0]["- A mal tiempo"]+ ' ' + refran[1]["buena cara"])
        )

  console.log('Refranes locos')
})

/*app.post('/api/addRefran/',mimeParser.none(),(req,res) => {
  //app.post('/api/addRefran/',jsonParser,(req,res) => {
    console.log(req.method, req.url, req.ip);
    console.log(`Inicio: ${req.body.inicio} Final: ${req.body.final}`)
    res.send(200)
    //añadir();
    inicios.push(req.body.inicio);
    finales.push(req.body.final);
    console.log('Refran añadido',inicios, finales);
  })
  */
 
  app.get('/nuevo/',(req,res)=>{
    /**
    * Endpoint: http://localhost:3000/nuevo/?texto=XXXXXX
    */
    var inicio = req.query.texto
    MongoClient.connect(mongoURL)
      .then(client=>{
        cli=client
        col=cli.db().collection(collName1);
        return col.insertOne({inicio})
      })
      .then(mongoRes=>{
        res.send('Ok Inicios');
        cli.close();
      });

      var final = req.query.texto
      MongoClient.connect(mongoURL)
        .then(client=>{
          cli=client
          col=cli.db().collection(collName2);
          return col.insertOne({final})
        })
        .then(mongoRes=>{
          res.send('Ok Finales');
          cli.close();
        });
  })

  app.get('/listado/',(req,res)=>{
    /**
    * Endpoint: http://localhost:3000/listado/
    */
    MongoClient.connect(mongoURL)
      .then(client=>{
        cli=client
        col=cli.db().collection(collName);
        return col.find().toArray();
      })
      .then(textos=>{
        var json = JSON.stringify(textos)
        res.send(json);
        cli.close();
      });
  })

/*app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
*/

app.listen(port,()=>{
	console.log(`Todo listo y escuchando en http://localhost:${port}/`);
	console.log('End points:');
	console.log('-> http://localhost:3000/nuevo/?texto=XXXXXX');
	console.log('-> http://localhost:3000/listado/');
})
