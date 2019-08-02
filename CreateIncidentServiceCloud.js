'use strict';

var request = require('request'); 
var source = require('../variables.js');
var apiURL = 'https://rnowgse00805.rightnowdemo.com/services/rest/connect/v1.3/incidents/';

//mailgun credentials
var api_key = '';
var domain = '';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});


module.exports = {
  metadata: () => ({
    name: 'CreateIncident',
    properties: {
      userid: { required: true, type: 'string' },
      incidenceSubject: { required: true, type: 'string' },
      session_id: { required: true, type: 'string' }
    },
    supportedActions: []
  }),
  invoke: (conversation, done) => {
    // perform conversation tasks.
    const { userid } = conversation.properties();
    const { incidenceSubject } = conversation.properties();
    const { session_id } = conversation.properties();

    var sessionSubject = session_id +': '+incidenceSubject;

  console.log (`DATA ${userid} + ${sessionSubject}`);
  //perform a request 
    request({
                  url: apiURL,
                  method: 'POST',
                  auth: {
                          user: source.user,
                          pass: source.pass
                  },

      json:{

        'primaryContact': { 

          'id': parseInt(userid)
       },
        'subject': sessionSubject

      }

                  }, function (error, response, body){

                          console.log(error);
                          console.log(JSON.stringify(response));
                          console.log(body);

          // send email too
                    if (response.statusCode === 201){

        
                      var IncValue =body.lookupName;

           
                      console.log("I submitted your details. We will be in touch soon! ");
                        
                      console.log(body);
        
    conversation.variable('referenceNo', IncValue); //instantiate a variable on ODA
    conversation.transition();  
    conversation.keepTurn(true); 
    done();  

          } else if (response.statusCode === 401){

            console.log(response.statusCode +" :Check your credentials!");
  
          }else{
  
            console.log(response.statusCode +" :Check your code and run again!");
          }

      });
        

  }
};
