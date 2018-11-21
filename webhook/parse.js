const http = require('http')
const express = require('express')
const app = express()
const port = 3033

// Construct URL
var stopName = 'Klopstockstra'
var URL = 'http://www.mvg-live.de/ims/dfiStaticAnzeige.svc?haltestelle=' + stopName + '%dfe&ubahn=&bus=checked&tram=&sbahn='
app.get('/', (req, res) => {
  makerequest().then(result => res.send(result))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
let makerequest = async () => {
  return new Promise((resolve, reject) => {
    http.get(URL, (res) => {
      var responseString = ''
      res.on('data', function (data) {
        responseString += data
      })
      res.on('end', function () {
        let resu = handleResponse(responseString)
        resolve(resu)
      })
    })
  })
}

let handleResponse = (data) => {
  var resultString = ''
  var wholeData = data
  var locationS = wholeData.search('Scheidplatz')
  while (locationS > 0) {
    wholeData = wholeData.slice(locationS + 15)
    var locationCol = wholeData.search('inMinColumn') + 13
    var stringTime = wholeData.slice(locationCol, locationCol + 10)
    var intTime = parseInt(stringTime)
    resultString = resultString + intTime + ', '
    locationS = wholeData.search('Scheidplatz')
  }
  // console.log(resultString)
  return resultString
}
