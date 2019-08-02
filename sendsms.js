"use strict";

var request = require('request');
var pageScopeid;

const accountSid = '' //twilio SID
const authToken = '' // Twilio auth token
const client = require('twilio')(accountSid, authToken);

module.exports = {

    metadata: function metadata() {
        return {
            "name": "chatwithAngliansms", //name of your custom component 
            "properties": {
                          },
            "supportedActions": []
        };
    },

    invoke: function invoke(sdk, done)
    {
      pageScopeid = sdk.userId();
      console.log("Process env " + process.env.USERNAME);
      console.log("Page scope Id " + pageScopeid);
      console.log('accountSid:'+accountSid+' authToken:'+authToken+' client:'+client);
      client.messages.create({
              to: '', //Recipient No.
              from: '', //Twilio Number
              body: '' //message
              })
            .then(message => console.log(message.sid));
            sdk.transition("codeSent"); //next flow on DA
            sdk.keepTurn(true);
            done();

    }
};
