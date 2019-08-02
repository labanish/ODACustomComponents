"use strict";

var request = require('request');

module.exports = {

    metadata: function metadata() {
        return {
            "name": "GetOPALink",
            "properties": {
              "c_id": {"type": "string", "required": true},
              "policy_name": {"type": "string", "required": true}
                          },
            "supportedActions": []
        };
    },

    invoke: function invoke(sdk, done)
    {
      c_id = sdk.properties().c_id;
      policy_name = sdk.properties().policy_name
      request({
        url: 'https://rnowgse00805.rightnowdemo.com/cc/getOpaUrl/generate/' + c_id+ '/' + policy_name,
        method: "GET",
        auth: {
          user: "connect",
          pass: "connect"
        }
      }, function (error, response, body){

            console.log(error);
            console.log(JSON.stringify(response));
            console.log(body);
            var url = body.url;
            console.log("Target URL: " + url);
            sdk.variable(opaURL, url);
            sdk.transition();
            sdk.keepTurn(true);
            done();
      });
    }
};
