const express = require('express');
const logger = require('morgan');

const app = express()
const port = 7070

app.use(logger('combined'));
app.use(express.json());

app.get('', (req, res) => {
  res.send('Hello World!')
});

const session = {};

app.post('/api/v1/apps/ping-pong', (req, res, next) => {

    console.log(req.body);


  

    let USSD_MENUE = '';
    let SESSION_STATE = 'END_SESSION';

    if(!session[ req.body.SESSION_ID ]){

        session[ req.body.SESSION_ID ] = {};

        USSD_MENUE = 'Welcome ' + req.body.MSISDN + '\n';
        USSD_MENUE += `Play with me : - ) \n`;
        USSD_MENUE += 'I Say Ping..and you say ?... \n';

        SESSION_STATE = 'CONTINUE_SESSION';

        res.json({USSD_MENUE, SESSION_STATE });
        return;
    }


    SESSION_STATE = 'CONTINUE_SESSION';

    switch(req.body.SUBSCRIBER_SELECTION?.trim()){
        case 'pong':
            USSD_MENUE = 'You said Pong! \n';
            USSD_MENUE += 'I say Ping.....\n';
            USSD_MENUE += 'Your Turn....\n'
            break;
        case 'ping':
            USSD_MENUE = 'You said Ping\n';
            USSD_MENUE += 'I say Pong \n';
            USSD_MENUE += 'Your Turn...'
            break;
        case 'exit':
            USSD_MENUE = 'Good Bye : - ) \n';
            USSD_MENUE += 'powered by MicroTech Cloud Solutions Limited';
            SESSION_STATE = 'END_SESSION';
            break;
        default:
            USSD_MENUE = 'Oooops!!! \n';
            USSD_MENUE += 'Invalid Selection : - ( \n';
            USSD_MENUE += 'Simuziba vomuchita imweh!!! \n';
    }

    res.json({USSD_MENUE, SESSION_STATE });


   
});

app.listen(port, () => {
  console.log(`USSD DEMO UP & RUNNING ${port}`)
});




// {
//     SESSION_ID: '621665bbdd3c5d95fd72e248',
//     NETWORK: 'AIRTEL_USSD_PLATFORM',       
//     SHORTCODE: '4949',
//     IS_NEW_REQUEST: true,
//     MSISDN: '260974538712',
//     SUBSCRIBER_INPUT: '4949',
//     TRANSACTION_ID: 'undefined',
//     SUBSCRIBER_SELECTION: ''
//   }
//   ::1 - - [23/Feb/2022:17:51:28 +0000] "POST /api/v1/apps/ping-pong HTTP/1.1" 200 75 "-" "axios/0.19.2"
//   {
//     SESSION_ID: '621665bedd3c5d95fd72e254',
//     NETWORK: 'AIRTEL_USSD_PLATFORM',       
//     SHORTCODE: '4949',
//     IS_NEW_REQUEST: true,
//     MSISDN: '260976826192',
//     SUBSCRIBER_INPUT: '4949',
//     TRANSACTION_ID: 'undefined',
//     SUBSCRIBER_SELECTION: ''
//   }
//   ::1 - - [23/Feb/2022:17:51:31 +0000] "POST /api/v1/apps/ping-pong HTTP/1.1" 200 75 "-" "axios/0.19.2"
//   {
//     SESSION_ID: '621665c5dd3c5d95fd72e266',
//     NETWORK: 'AIRTEL_USSD_PLATFORM',
//     SHORTCODE: '4949',
//     IS_NEW_REQUEST: true,
//     MSISDN: '260978964998',
//     SUBSCRIBER_INPUT: '4949',
//     TRANSACTION_ID: 'undefined',
//     SUBSCRIBER_SELECTION: ''
//   }
//   ::1 - - [23/Feb/2022:17:51:34 +0000] "POST /api/v1/apps/ping-pong HTTP/1.1" 200 75 "-" "axios/0.19.2"
//   {
//     SESSION_ID: '621665c4dd3c5d95fd72e262',
//     NETWORK: 'AIRTEL_USSD_PLATFORM',
//     SHORTCODE: '4949',
//     IS_NEW_REQUEST: true,
//     MSISDN: '260978649894',
//     SUBSCRIBER_INPUT: '4949',
//     TRANSACTION_ID: 'undefined',
//     SUBSCRIBER_SELECTION: ''
//   }