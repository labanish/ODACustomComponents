"use strict";

var request = require('request');
var strrandomNumber;
const accountSid = '';
const authToken = '';
const client = require('twilio')(accountSid, authToken);

module.exports = {

    metadata: function metadata() {
        return {
            "name": "GetRebateValue",
            "properties": {
                          },
            "supportedActions": ["rebateDone", "rebateRequiresApproval"]
        };
    },

    invoke: function invoke(sdk, done)
    {
      request({
        url: 'https://rnowgse00805.rightnowdemo.com/services/rest/connect/v1.3/contacts/2550/customFields/c/opa_return',
        method: "GET",
        auth: {
          user: "connect",
          pass: "connect"
        }
      }, function (error, response, body){

            console.log(error);
            console.log(JSON.stringify(response));
            console.log(body);
            var json = JSON.parse(body);
            var rebateValue = json.opa_return;
            console.log("Opa returned value: " +rebateValue);
            if (rebateValue != 2){

              sdk.transition("rebateDone");
              sdk.keepTurn(true);
              done();
            }
            else if (rebateValue === 2){
              sdk.transition("rebateRequiresApproval");
              sdk.keepTurn(true);
              done();
            }

      });
    }
};
