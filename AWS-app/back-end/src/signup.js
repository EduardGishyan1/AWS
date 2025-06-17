const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
global.fetch = require('node-fetch');

const poolData = {
  UserPoolId: process.env.USER_POOL_ID,
  ClientId: process.env.CLIENT_ID,
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

exports.signUp = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
      },
      body: '',
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { username, password, email } = body;

    const attributeList = [
      new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: 'email',
        Value: email,
      }),
    ];

    return new Promise((resolve) => {
      userPool.signUp(
        username,
        password,
        attributeList,
        null,
        (err, result) => {
          if (err) {
            resolve({
              statusCode: 400,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
              },
              body: JSON.stringify({ error: err.message }),
            });
            return;
          }
          resolve({
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': 'Content-Type',
              'Access-Control-Allow-Methods': 'POST,GET, OPTIONS' },
            body: JSON.stringify({ username: result.user.getUsername() }),
          });
        },
      );
    });
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST,GET, OPTIONS',
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};
