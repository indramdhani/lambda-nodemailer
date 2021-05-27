// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

var aws = require('aws-sdk');
var ses = new aws.SES({region: 'eu-west-1'});
exports.lambdaHandler = async function (event) {
  let response;
  let body;
  const defaultHeader = {
    'Access-Control-Allow-Headers':
      'Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST',
    'X-Requested-With': '*',
    'Content-Type': 'application/json',
  };
  try {
    var params = {
      Destination: {
        ToAddresses: ['hi@indramdhani.net'],
      },
      Message: {
        Body: {
          Text: {Data: 'Test'},
        },

        Subject: {Data: 'Test Email'},
      },
      Source: 'milis@indramdhani.net',
    };
    const sendEmailRes = ses.sendEmail(params).promise();
    console.info(JSON.stringify(sendEmailRes));
    body = {test: 'ini sukses'};
    response = {
      statusCode: 200,
      headers: defaultHeader,
      body: JSON.stringify(body),
    };
  } catch (error) {
    body = {error: error.message};
    response = {
      statusCode: 403,
      headers: defaultHeader,
      body: JSON.stringify(body),
    };
  }
  return response;
};
