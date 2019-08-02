"use strict";

var request = require('request');
//mail-gun credentials
var api_key = '';
var domain = '';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

module.exports = {

    metadata: function metadata() {
        return {
            "name": "SendEmail",
            "properties": {
              "subject": {
                  "type": "string",
                  "required": false
                },
                "body": {
                  "type": "string",
                  "required": false
                },
                "to": {
                  "type": "string",
                  "required": false
                }
            },
            "supportedActions": []
        };
    },

    invoke: function invoke(sdk, done)
    {
        var subject = sdk.properties().subject;
        var body = sdk.properties().body;
        var to = sdk.properties().to;

        var data = {
                            from: 'hello@ccc.cccc',
                                  to: to,
                                  subject: subject,
                                  text: body,
                                  html: body
                    };

        mailgun.messages().send(data, function (error, body) {
        console.log(body);
        sdk.keepTurn(true);
        sdk.transition();
        done();

        });
    }
};
