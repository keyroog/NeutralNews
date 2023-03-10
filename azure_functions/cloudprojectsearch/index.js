const https = require("https");
const request = require("request");
let sentimentHost = "cloudprojectcognitive.cognitiveservices.azure.com";
let sentimentPath = "/text/analytics/v3.0/sentiment";

let host = "api.bing.microsoft.com";
let path = "/v7.0/news/search";
let term = "Microsoft";
module.exports = async function (context, req) {
  documents = [];
  let bingSubscriptionKey = context.req.body.bingSubscriptionKey;
  let cognitiveSubscriptionKey = context.req.body.cognitiveSubscriptionKey;
  let responseDocuments;
  let search = context.req.body.search;
  let cc = context.req.body.cc;
  let lang = context.req.body.lang;
  let offset = context.req.body.offset;
  if (typeof offset === "undefined") {
    offset = 0;
  }
  const url =
    "https://api.bing.microsoft.com/v7.0/news/search?count=10&q=" +
    encodeURIComponent(search) +
    "&cc=" +
    cc +
    "&setLang=" +
    lang +
    "&offset=" +
    offset;
  const method = "GET";
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": bingSubscriptionKey,
  };

  const promise = new Promise((resolve, reject) => {
    request(
      url,
      {
        method: method,
        headers: headers,
      },
      (err, res) => {
        if (err) {
          return false;
        }
        resolve(JSON.parse(res.body));
        //do something with json request
      }
    );
  });
  let newpromise;
  await promise.then((response) => {
    let i = 0;
    responseDocuments = response;
    response.value.forEach((element) => {
      documents.push({
        language: lang,
        id: "" + i,
        text: element.description.replace(/[^a-zA-Z\s]+/g, ""),
      });
      i++;
    });
    newpromise = new Promise((resolve, reject) => {
      request(
        {
          url: "https://westeurope.api.cognitive.microsoft.com/text/analytics/v3.0/sentiment",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": cognitiveSubscriptionKey,
          },
          body: JSON.stringify({ documents }),
        },
        (err, res) => {
          if (err) {
            return false;
          }
          resolve(JSON.parse(res.body));
          //do something with json request
        }
      );
    });
  });

  await newpromise.then((response) => {
    context.res.json({ documents: responseDocuments, sentiment: response });
  });

  /*await fetch(
    "https://api.bing.microsoft.com/v7.0/news/search?count=10&q=" +
      encodeURIComponent(search) +
      "&cc=" +
      cc +
      "&setLang=" +
      lang +
      "&offset=" +
      offset,
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
    .then((response) => {
      let i = 0;
      responseDocuments = response;
      response.value.forEach((element) => {
        documents.push({
          language: lang,
          id: "" + i,
          text: element.description.replace(/[^a-zA-Z\s]+/g, ""),
        });
        i++;
      });
    });*/
  /*await fetch(
    "https://cpsentimentresource.cognitiveservices.azure.com/text/analytics/v3.0/sentiment",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": cognitiveSubscriptionKey,
      },
      body: JSON.stringify({ documents: documents }),
    }
  ) // 3
    .then((response) => response.json())
    .then((response) =>
      context.res.json({ documents: responseDocuments, sentiment: response })
    );*/
};
