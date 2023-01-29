const https = require('https')
let subscriptionKey = 'd98cb9d50867453f81045e49517976dd';
let host = 'api.bing.microsoft.com';
let path = '/v7.0/news/search';
let term = 'Microsoft';

module.exports = async function (context, req) {
    responseMessage = "";
    https.get({
        hostname: host,
        path:     '/v7.0/news/search?q=' + encodeURIComponent(term),
        headers:  { 'Ocp-Apim-Subscription-Key': subscriptionKey },
      }, res => {
        let body = ''
        res.on('data', part => body += part)
        res.on('end', () => {
          for (var header in res.headers) {
            if (header.startsWith("bingapis-") || header.startsWith("x-msedge-")) {
              console.log(header + ": " + res.headers[header])
            }
          }
          console.log('\nJSON Response:\n')
          console.dir(JSON.parse(body), { colors: false, depth: null })
          responseMessage = JSON.parse(body);
        })
        res.on('error', e => {
          console.log('Error: ' + e.message)
          throw e
        })
      })

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}