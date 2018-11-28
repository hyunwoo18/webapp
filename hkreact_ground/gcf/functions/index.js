const functions = require('firebase-functions');

const cors = require('cors')({
	origin: true,
    });

var admin = require('firebase-admin');
admin.initializeApp(  functions.config().firebase  );

exports.hkHello = functions.https.onRequest( (request, response) => {

	return cors(request, response, () => {

	let inviter_id;
	let invitee_id;
	let answer = 'maybe';
	let level = 1;

	switch (  request.get('content-type')  ) {
	case 'application/json':
	    inviter_id = request.body.inviter;
	    invitee_id = request.body.invitee;
	    requestkey = request.body.inviterkey;
            break;
	}

	console.log( "inviter" )
	console.log( inviter_id )
	console.log( "invitee" )
	console.log( invitee_id )
	console.log( "inviter key" )
	console.log( requestkey )

	let uploadarray2 = {
	    inviter: inviter_id,
	    invitee: invitee_id,
	    answer: 'maybe',
	    level: 1,
	    inviterkey: requestkey
        };

	var hkref = admin.database().ref( 'users/' + invitee_id + '/friendrequests');
        var newrequest = hkref.push();
	newrequest.set( uploadarray2 );

	response.send("Hello from Firebase!");
	    });
});

exports.hkResponse = functions.https.onRequest( (request, response) => {

	return cors(request, response, () => {

	let inviter_id;
	let requestkey;
	let answer;

	switch (  request.get('content-type')  ) {
	case 'application/json':
	    inviter_id = request.body.inviter;
	    requestkey = request.body.inviterkey;
	    answer     = request.body.answer;
            break;
	}

	console.log( "inviter" )
	console.log( inviter_id )
	console.log( "answer" )
	console.log( answer )
	console.log( "inviter key" )
	console.log( requestkey )

	var hkref = admin.database().ref( 'users/' + inviter_id + '/friendrequests/' + requestkey);
        hkref.update( {answer: answer } );

	response.send("Hello 2 from Firebase!");

	    });
});

