var endPoint = 'https://quote-garden.herokuapp.com/api/v2/quotes/random'
var cita = document.querySelector('p.cita');
var autor = document.querySelector('p.autor');
/*function(clearAll){
    cita = '';
    autor = '';
}*/
fetch(endPoint)
    .then(Response=>Response.json())
        .then(obj=>{
            cita.innerText = obj.quote.quoteText;
            console.log(obj.quote.quoteText);
            autor.innerText = obj.quote.quoteAuthor;
            console.log(obj.quote.quoteAuthor);

            }
        )
console.log(cita,autor);