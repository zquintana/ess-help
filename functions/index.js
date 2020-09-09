const functions = require('firebase-functions');
const moment = require('moment');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.getPreventableCount = functions.https.onRequest((request, response) => {
    const startCount = 11642;
    const start = moment('2020-03-02 00:00:00', 'YYYY-MM-DD HH:mm:ss');
    const diff = moment().diff(start, 'hours');
    const ratePerHour = 4/24; // 4 per 24 hours

    response.set('Access-Control-Allow-Origin', '*');
    response.json({
        "count": startCount + (Math.floor(diff * ratePerHour))
    });
});

exports.getInvolvedInAccidentCount = functions.https.onRequest((request, response) => {
    const perHour = 8;
    const start = moment('2020-01-01 00:00:00', 'YYYY-MM-DD HH:mm:ss');
    const hourDiff = moment().diff(start, 'hours');

    response.set('Access-Control-Allow-Origin', '*');
    response.json({
        "count": Math.floor(hourDiff * perHour)
    });
});
