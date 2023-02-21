const https = require("https");
const request = require("request");

module.exports = async function (context, req) {
  documents = [];
  resultDocuments = [];
  let bingSubscriptionKey = context.req.body.bingSubscriptionKey;
  let cognitiveSubscriptionKey = context.req.body.cognitiveSubscriptionKey;
  let category = JSON.parse(context.req.body.preferiti);
  let urls = [];
  let sentimentPromises;
  let lang = context.req.body.lang;

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
            "https://westeurope.api.cognitive.microsoft.com/text/analytics/v3.0/sentiment",
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
