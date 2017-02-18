'use strict'

var queryString  = require('query-string');
var _ = require('lodash');
var request = {};
var Mock = require('mockjs');
var config = require('./config');

request.get = function(url, params){
  if(params){
    url += '?'+queryString.stringify(params);
  }

  console.log(url);
  return fetch(url,{method: "GET"})
  .then((response) => response.json())
  .then((response) => Mock.mock(response));
}

request.post = function(url, body){
  var options = _.extend(config.header, {
    body: JSON.stringify(body)
  })

  return fetch(url, options)
  .then((response) => response.json())
  .then((response) => Mock.mock(response));
}

module.exports = request;
