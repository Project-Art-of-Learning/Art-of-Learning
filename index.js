/*
 * index.js
 * Main backend file
*/

// import needed dependencies
require('ejs');
const express = require('express')
const v4 = require('uuid');
var cookieParser = require('cookie-parser')


// Establish Application
const app = express()
const port = 8080

// Parsers
app.use(cookieParser())

// Static endpoints
app.use('/static', express.static('static', { 
  // Set correct headers
  setHeaders: (res, path) => {
    // CSS files
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  },
}));


// set the view engine to ejs
app.set('view engine', 'ejs');

// set path to views, dynamically
app.set('views', __dirname + '/views');


app.get('/', (req, res) => {
  res.render("index")
})

app.get('/test', (req, res) => {
    console.log("test")
    res.send('Test!')
})

app.get('/api', (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

app.listen(port, () => {
  console.log(`Application running with the port: ${port}`)
})

module.exports = app;
