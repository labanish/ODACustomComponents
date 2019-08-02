"use strict";

var request = require('request');

module.exports = {

    metadata: function metadata() {
        return {
            "name": "CheckForRebate",
            "properties": {
                          },
            "supportedActions": ["notEligibleForRebate", "eligibleForRebate"]
        };
    },

    invoke: function invoke(sdk, done)
    {

      request({
        url: 'https://rnowgse00805.rightnowdemo.com/services/rest/connect/v1.3/incidents?q=Category.ID=281%20and%20StatusWithType.Status.ID=108%20and%20CreatedTime%20%3E%20%272017-09-11T00:00:00Z%27',
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
            var rebateItems = json.items;
            console.log("Rebate items: " + rebateItems + json.hasMore);
            console.log("Rebate length: " + rebateItems.length);
            if (rebateItems.length > 0){
              sdk.transition("notEligibleForRebate");
              sdk.keepTurn(true);
              done();
            }
            else {
              sdk.transition("eligibleForRebate");
              sdk.keepTurn(true);
              done();
            }
      });
    }
};
