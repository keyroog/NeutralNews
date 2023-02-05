const https = require('https')

let cognitiveSubscriptionKey = "";
let sentimentHost = "cloudprojectcognitive.cognitiveservices.azure.com";
let sentimentPath = "/text/analytics/v3.0/sentiment";

let subscriptionKey = '';
let host = 'api.bing.microsoft.com';
let path = '/v7.0/news/search';
let term = 'Microsoft';
module.exports = async function (context, req) {
    documents = [];
    let responseDocuments;
    let search = context.req.body.search;
      await fetch('https://api.bing.microsoft.com/v7.0/news/search?count=10&q='+ encodeURIComponent(search)+'&cc=IT', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': subscriptionKey,
        }
        }) // 3
        .then(response => response.json())
        .then(response => {
          let i = 0;
          responseDocuments = response;
          response.value.forEach(element => {
            documents.push({"language":'en','id':""+i,'text':element.description.replace(/[^a-zA-Z\s]+/g, '')});
            i++;
          });
        });
        await fetch('https://cloudprojectcognitive.cognitiveservices.azure.com/text/analytics/v3.0/sentiment', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Ocp-Apim-Subscription-Key': cognitiveSubscriptionKey
          },
          body: JSON.stringify({"documents": documents})
          }) // 3
          .then(response => response.json())
          .then(response => context.res.json({'documents':responseDocuments,'sentiment':response}));
}
