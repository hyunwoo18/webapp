var admin = require('firebase-admin');
//var myfetch = require('node-fetch');

var serviceAccount = require("/Users/hyunwoo/RDG_Schematic/hkreact_ground/gcf/hkact1-22444-firebase-adminsdk-f9z00-4fad9959ac.json");

admin.initializeApp( {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hkact1-22444.firebaseio.com"
  });

