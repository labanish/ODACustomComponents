"use strict";

var request = require('request');
var pageScopeid;
var strrandomNumber;
const accountSid = '';//mail gun
const authToken = '' //mail gun
const client = require('twilio')(accountSid, authToken);

module.exports = {

    metadata: function metadata() {
        return {
            "name": "SendSMSToAuthenticate",
            "properties": {
                          },
            "supportedActions": ["codeSent"]
        };
    },

    invoke: function invoke(sdk, done)
    {
      pageScopeid = sdk.userId();
      console.log("Process env " + process.env.USERNAME);
      console.log("Page scope Id " + pageScopeid);

//get customer number from Service Cloud

      request({
        url: 'https://rnowgse00805.rightnowdemo.com/services/rest/connect/v1.3/contacts/1995/phones/1/rawNumber',
        method: "GET",
        auth: {
          user: "connect",
          pass: "connect"
        }
      }, function (error, response, body){

            console.log(error);
            console.log(JSON.stringify(response));
            console.log(body);
            strrandomNumber=Math.floor(Math.random()*900000) + 100000; // generate a random 6 digit number 

            console.log('accountSid:'+accountSid+' authToken:'+authToken+' client:'+client);
            client.messages.create({
                    to: '',//get the response.item.phonenumber
                    from: '',// twillio sms,
                    body: 'Your 6-Digit SMS Code:'+ strrandomNumber
                    })
                  .then(message => console.log(message.sid));
                  sdk.transition("codeSent");
                  sdk.keepTurn(true);
                  done();
      });
    }
};
