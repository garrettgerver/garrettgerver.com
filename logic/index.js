var cfb = require("cfb.js");
require("dotenv").config()

const APIKEY = process.env.APIKEY

var defaultClient = cfb.ApiClient.instance;

var ApiKeyAuth = defaultClient.authentications["ApiKeyAuth"];
ApiKeyAuth.apiKey = "Bearer " + APIKEY;

var apiInstance = new cfb.ConferencesApi

apiInstance.getConferences().then(function(data) {
    console.log(data);
  }, function(error) {
    console.error(error);
  });