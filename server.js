const express= require ('express');
const bodyParser=require('body-parser');
const request= require('request');
const argv= require('yargs').argv;
const app= express();

const apikey='9660ff7f6fae78bc09ec5b22fc029851';

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.render('index',{weather:null,error:null});
  });
app.post('/', function(req,res){
   let city=req.body.city;
   let url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;

   request(url,function(err,response,body){
       if(err){
           res.render('index',{weather:null,error:'Error, please try again'});
       }
       else{
           let weather=JSON.parse(body);
           if(weather.main==undefined){
               res.render('index',{weather:null,error:'Error please try again'});

           }
           else{
               let weatherText=`Its ${weather.main.temp} degrees in ${weather.name}!`;
               res.render('index',{weather:weatherText, error:null});

           }
       }
   });
});

app.listen(3000,function(){
    console.log('Example app listening on port 3000');
});
