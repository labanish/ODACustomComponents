'use strict';

var request = require('request');
const CryptoJS = require("crypto-js");


const SECRETKEY=" "; //Application Initiated channel Secret-> get this on ODA CHANNEL

const URL =""; // Link to the AIC Channel
const userId = ''; //your facebook page scope id -> to get this use a custom component and do (userid = conversation.userId();)
var channelName =''   //your facebook channel name
var payloadType ='paymentsMethods' //payload from your digital assistant
let responseStatusText;


//Create the Body Payload
var jsonBody= { 
      userId: userId,
      messagePayload: 
       { 
         type: 'application',
         payloadType: payloadType,
         channelName: channelName,
         variables:
          {
          //variables from your bot: 
          userName: 'Jane Cox' 
         
        } 
      } 
    }
//hash the body
var hmac = (CryptoJS.HmacSHA256(JSON.stringify(jsonBody), SECRETKEY)).toString(); 
console.log('HMAC: ' + hmac);


module.exports = {
  metadata: () => ({
    name: 'chatwithAnglian', //name of your custom component 
    properties: {
      sendMethod: { required: true, type: 'string' }
     },
    supportedActions: []
  }),
  invoke: (conversation, done) => {
//get the variables:

const { sendMethod } = conversation.properties();

console.log('sendmethod: ' + sendMethod);

  //perform a request to post to facebook messenger 
    request({

  url: URL,
  method: "POST",
  headers: 
   { 
     'X-Hub-Signature': 'sha256='+hmac,
   'Content-Type': 'application/json'
   },
   body: JSON.stringify(jsonBody)

                  }, function (error, response, body){

                    if (error)  console.log('Error: ' + error);
    responseStatusText = 'Status: ' + response.statusCode + ', ' + response.statusMessage;
    console.log('index', {responseStatus: responseStatusText});
          
      });
   // conversation.reply(responseStatusText);
    conversation.transition('SendResponse');  
    conversation.keepTurn(true); 
    done();  

    
  }
};
