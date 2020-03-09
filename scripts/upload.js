#!/usr/bin/env node
var path = require("path");
const uploadQcloud = require('qcos-upload');
const argv = require('yargs').argv;

if (!argv.SecretId || !argv.SecretKey) {
  throw (new Error("输入SecretId和SecretKey"));
}
const setHeaders = (obj)=>{
    const shouldUseGzip = [".js",".css",".gz"];
    const ext = path.parse(obj.Key).ext;
    if(shouldUseGzip.indexOf(ext)!=-1){
        obj.ContentEncoding = "gzip";
    }
    return obj;
};

const options = {
  Region: 'ap-chengdu',
  SecretId: argv.SecretId,
  SecretKey: argv.SecretKey,
  Bucket: 'apks-1252514056',
  Headers: {
    CacheControl: 'max-age=31536000'
  },
  prefix: 'web',
  src: '../build',
  overWrite: true,
  clearDistDir : true,
  setHeaders : setHeaders
};
uploadQcloud(options);