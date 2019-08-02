"use strict";

var request = require('request');

module.exports = {

    metadata: function metadata() {
        return {
            "name": "WebviewOPA",
            "properties": {
                          },
            "supportedActions": []
        };
    },

    invoke: function invoke(sdk, done)
    {
      var card =
          {
            "attachment":{
              "type":"template",
              "payload":{
                "template_type":"generic",
                "elements":[
                {
                  "title": "Leakage Allowance Assessment",
                  "image_url": "https://pbs.twimg.com/profile_images/891218763324035072/x9MXOg6T_400x400.jpg",
                  "subtitle":"Please click below to open the assessment form",
                  "buttons":[
                     {
                      "type":"web_url",
                      "url": "https://rnowgse00805.rightnowdemo.com/app/opa/startsession/contact/2542/policy/Anglian_Payment_Plan/",
                      "title":"Click here",
                      "webview_height_ratio": "tall"
                    }
                  ]
              }
            ]
          }
        }
      }
      sdk.reply(card);
      sdk.transition();
      sdk.keepTurn(true);
      done();
    }
};
