const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');

// create the Hapi server
const server = new Hapi.Server({
  connections: {
    routes: {
      cors: true,
      files: {
        relativeTo: Path.join(__dirname, 'build'),
      },
    },
  },
});
server.connection({ port: process.env.PORT || 3000 });

// Register the inert plugin
server.register(Inert, (err) => {
  if (err) {
    throw err;
  }

  // Create the route for the build artefacts
  server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        lookupCompressed: true,
        index: true,
      },
    },
  });
});

// Redirect all http requests to https if in production
/* eslint-disable consistent-return */
if (process.env.NODE_ENV === 'production') {
  server.ext('onRequest', (request, reply) => {
    if (request.headers['x-forwarded-proto'] !== 'https') {
      return reply('Forwarding to secure route').redirect(
        `https://${request.headers.host}${request.path}${request.url.search}`
      );
    }
    reply.continue();
  });
}

// Setting index.html as the default
server.ext('onPreResponse', (request, reply) => {
  const response = request.response;

  if (!response.isBoom) {
    return reply.continue();
  }

  // else an error has occurred
  const error = response;

  // if the error is 'Object not found', call index.html
  if (error.output.statusCode === 404) {
    return reply.file('index.html');
  }
});
/* eslint-enable consistent-return */



//Scraper
let axios = require('axios');
let cheerio = require('cheerio');
let fs = require('fs');

//Get iHUB
let ihubList = [];

var getIhub = function () {

  axios.get('https://ihub.co.ke/jobs')
      .then((response) => {
          if (response.status === 200) {
              const html = response.data;
              const $ = cheerio.load(html);
              
              $('.jobsboard-row').each(function(i, elem) {
                  ihubList[i] = {
                      jobTitle: $(this).find('h3').text(),
                      company: $(this).find('.post-company').text(),
                      source: "iHub",
                      date: $(this).find('.job-time').text(),
                      url: "https://ihub.co.ke" + $(this).find('.job-more').attr('href'),
                      category: $(this).find('.job-cat').text(),
                      jobLikes: 0

                  }
              });
              const ihubListTrimmed = ihubList.filter(n => n != undefined)
              fs.writeFile('./src/components/ihubList.json',
                  JSON.stringify(ihubListTrimmed, null, 4),
                  (err) => console.log('ihubListTrimmed File successfully written!'))
          }
      }, (error) => console.log(err));
}





var pages;
var lastPage;
let fuzuList = [];

//Get FUZU

var getFuzu = function () {

  axios.get('https://www.fuzu.com/categories/it-software')
      .then((response) => {
          if (response.status === 200) {
              const html = response.data;
              const $ = cheerio.load(html);
              pages = $('.indicator').text();
              let mats = [];
              pages.match(/\d+/g).forEach(function(i, j) {
                  mats[j] = parseInt(i);
              });


              lastPage = mats[mats.length - 1];        
          }


          var j;
          for (j = 0; j <= lastPage; j++) {
            if (j > 0) {
              var fuzUrl = "https://www.fuzu.com/categories/it-software?page=" + j;

              axios.get(fuzUrl)
                  .then((response) => {
                      if (response.status === 200) {
                          const html = response.data;
                          const $ = cheerio.load(html);
                          $('.carton-job').each(function(i, elem) {
                              fuzuList.push({
                                  jobTitle: $(this).find('h3').text(),
                                  company: $(this).find('.carton-logo.block').attr('href'),
                                  company2: $(this).find('.carton-logo.block').children('img').attr('alt'),
                                  source: "Fuzu",
                                  date: new Date().toLocaleDateString(),
                                  url: "https://www.fuzu.com" + $(this).find('.btn-main').attr('href'),
                                  category: "IT & Software",
                                  jobLikes: 0
                              });
                                  
                          });


                          for (var prop in fuzuList) {
                              if (fuzuList[prop]["company"] === undefined ) {
                                  fuzuList[prop]["company"] = 'Undisclosed';
                              } else {
                                  fuzuList[prop]["company"] = fuzuList[prop]["company"].replace('/company/','');
                                  fuzuList[prop]["company"] = fuzuList[prop]["company"].replace(/-/g, ' ');
                              }
                          }


                          for (var prop in fuzuList) {
                              if (fuzuList[prop]["company2"] === undefined ) {
                              } else {
                                  fuzuList[prop]["company2"] = fuzuList[prop]["company2"].replace('logo'," ");
                              }
                          }

                          const fuzuListTrimmed = fuzuList.filter(n => n != undefined)
                          fs.writeFile('./src/components/fuzuList.json',
                              JSON.stringify(fuzuListTrimmed, null, 4),
                              (err) => console.log(fuzUrl + ' successfully written!'))
                      }
                  }, (error) => console.log(err));
            }
          }


      }, (error) => console.log(err));
}




var getLinkedIn = function () {
    const $ = cheerio.load(fs.readFileSync('./src/linkedin.html'));
    let liList = [];
    $('.card-list__item').each(function(i, elem) {
        liList[i] = {
            jobTitle: $(this).find('h3').text(),
            company: $(this).find('h4').text(),
            source: "LinkedIn",
            date: new Date().toLocaleDateString(),
            category: $(this).find('.job-cat').text(),
            url: "https://www.linkedin.com/jobs/view/" + $(this).find('.pl4').attr('data-job-id'),
            jobLikes: 0

        }
    });
    const liListTrimmed = liList.filter(n => n != undefined)
    fs.writeFile('./src/components/linkedin.json',
        JSON.stringify(liListTrimmed, null, 4),
        (err) => console.log('LinkedIn File successfully written!'))
}



getIhub();
getFuzu();
getLinkedIn();



//END SCRAPER

// Start server
server.start((err) => {
  if (err) {
    throw err;
  }
  // Log to the console that the server has started
  console.log('Hapi Server running at:', server.info.uri);
});




