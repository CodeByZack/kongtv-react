#!/usr/bin/env node
const uploadQcloud = require('qcloud-upload');
const argv = require('yargs').argv;

if (!argv.SecretId || !argv.SecretKey) {
  throw (new Error("输入SecretId和SecretKey"));
}

const options = {
  Region: 'ap-chengdu',
  SecretId: argv.SecretId,
  SecretKey: argv.SecretKey,
  Bucket: 'apks-1252514056',
  Headers: {
    CacheControl: 'max-age=31536000',
    ContentEncoding : "gzip"
  },
  prefix: 'web',
  src: '../build',
  overWrite: true
};
uploadQcloud(options);