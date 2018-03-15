/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');

// Construct URL
var stopName = 'Klopstockstra';
var URL = 'http://www.mvg-live.de/ims/dfiStaticAnzeige.svc?haltestelle=' + stopName + '%dfe&ubahn=&bus=checked&tram=&sbahn=';
var card;
// Construct URL
//var cityName = 'London';
//var URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName;

// Create a Card with title and subtitle


// Display the Card
showCard('', 'Loading');
reloadData();

//call
// Make the request
function reloadData() {
  ajax(
  {
    url: URL,
    type: 'text'
  },
  function(data) {
    // Success!
    var resultString = '';
    var wholeData = data;
    //console.log('original ' + wholeData.length);
    
    //comment this in for Scheidplatz!
    var locationS = wholeData.search('Scheidplatz');
    //var locationS = wholeData.search('Münchner Freiheit');
    
    //console.log('firstfind ' + locationS);
    while (locationS > 0) {
      
      //refactor this to use lengt of the stop-constant
      //also put the haltestelle in a stop-constant ;)
      
      wholeData = wholeData.slice(locationS + 15);
      //console.log('cutlength ' + wholeData.length);
      var locationCol = wholeData.search('inMinColumn') + 13;
      var stringTime = wholeData.slice(locationCol, locationCol + 10);
      //console.log(stringTime);
      var intTime = parseInt(stringTime);
      //console.log(intTime);
      resultString = resultString + intTime + ", ";
      locationS = wholeData.search('Scheidplatz');
    }
    
    // Show to user
   //card.subtitle(resultString);
   //card.body('updated');
  showCard(resultString, 'updated')
  },
  function(error) {
    // Failure!
    showCard('','error fetching');
    //console.log('Failed fetching weather data: ' + error);
  }
);
}

function showCard(subtitle, body) {
  if(card) {
    card.hide();
  }
  card = new UI.Card({
      title:'Klopstockstr.',
      subtitle:subtitle,
      body:body,
      backgroundColor: 'blue',
   // banner:'images/mvg_banner.png',
      titleColor: 'white',
      subtitleColor: 'white',
      bodyColor: 'white'
  });
  card.show();
  card.on('click', 'select', function(e) {
    card.body('Reloading');
    card.backgroundColor('blue');
    reloadData();
  });
}
