const https = require("https");
const request = require("request");

let sentimentHost = "cloudprojectcognitive.cognitiveservices.azure.com";
let sentimentPath = "/text/analytics/v3.0/sentiment";

let host = "api.bing.microsoft.com";
let path = "/v7.0/news/search";
let term = "Microsoft";

module.exports = async function (context, req) {
  documents = [];
  resultDocuments = [];
  let bingSubscriptionKey = context.req.body.bingSubscriptionKey;
  let cognitiveSubscriptionKey = context.req.body.cognitiveSubscriptionKey;
  let category = JSON.parse(context.req.body.preferiti);
  console.log(category);
  let urls = [];
  let sentimentPromises;
  let lang = context.req.body.lang;
  /*await fetch(
        "https://api.bing.microsoft.com/v7.0/news?count=10&category=sports+health",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": bingSubscriptionKey,
          },
        }
      ) // 3
        .then((response) => response.json())
        .then((response) => { console.log(response); });
    */
  for (const cat of category) {
    urls.push({
      url:
        "https://api.bing.microsoft.com/v7.0/news?mkt=it-" +
        lang +
        "&category=" +
        cat.toLowerCase(),
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": bingSubscriptionKey,
      },
    });
  }

  /*(async () => {     
        const promises = urls.map((url) =>
            fetch(
                url.url,
                {method : url.method, headers : url.headers}
            ).then((response) => response.json())
        );
        const data = await Promise.all(promises);
        console.log(data);
    })();

    let processedRequests = 0
\   

    let promiseResources = []
    
    for (let i = 0; i < urls.length; i++) {
        const prom = new Promise((resolve, reject) => {
            fetch(urls[i].url,{method : urls[i].method, headers : urls[i].headers}).then(response => response.json())
        });
        promiseResources.push(prom);
    }*/

  const promises = urls.map(
    (element) =>
      new Promise((resolve) => {
        request(
          element.url,
          {
            method: element.method,
            headers: element.headers,
          },
          (err, res, body) => {
            if (err) {
              return false;
            }
            resolve(JSON.parse(res.body));
            //do something with json request
          }
        );
      })
  );

  await Promise.all(promises).then((results) => {
    let documents = [];
    let sentimentDocuments = [];
    console.log(results[0]);
    resultDocuments = results;
    for (let i = 0; i < results.length; i++) {
      for (let j = 0; j < 10; j++) {
        documents.push({
          language: lang,
          id: "" + j,
          text: results[i].value[j].description.replace(/[^a-zA-Z\s]+/g, ""),
        });
      }
      sentimentDocuments.push(documents);
      documents = [];
    }
    console.log(sentimentDocuments);
    sentimentPromises = sentimentDocuments.map(
      (element) =>
        new Promise((resolve) => {
          request(
            "https://cpsentimentresource.cognitiveservices.azure.com/text/analytics/v3.0/sentiment",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Ocp-Apim-Subscription-Key": cognitiveSubscriptionKey,
              },
              body: JSON.stringify({ documents: element }),
            },
            (err, res, body) => {
              if (err) {
                console.log(err);
                return false;
              }
              resolve(JSON.parse(res.body));
              //do something with json request
            }
          );
        })
    );
  });
  await Promise.all(sentimentPromises).then((results) => {
    console.log(results[0]);
    context.res.json({ documents: resultDocuments, sentiment: results });
  });
};
