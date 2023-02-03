const https = require('https')
const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");
const client = new TextAnalyticsClient("https://cloudprojectsentiment.cognitiveservices.azure.com/", new AzureKeyCredential("8f61c5092e2d4462a46eb06e6cf8b50f"));

let subscriptionKey = '47e9ce89166a447aa6973940f845ea2e';
let host = 'api.bing.microsoft.com';
let path = '/v7.0/news/search';
let term = 'Microsoft';
module.exports = async function (context, req) {
    documents = [];
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
          //console.dir(JSON.parse(body), { colors: false, depth: null })
          let result = JSON.parse(body);
          let i = 0;
          console.log(result.value.length);
          result.value.forEach(element => {
            console.log(i);
            documents.push(element.description.replace(/[^a-zA-Z\s]+/g, ''));
            //console.log(documents[i]);
            i++;
          });
          console.log(documents);
        })
        res.on('error', e => {
          console.log('Error: ' + e.message)
          throw e
        })
      });
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}