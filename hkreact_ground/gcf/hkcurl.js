const fetch = require("node-fetch");

var argdict = {
    inviter: 28,
    invitee: 29,
    answer: 'maybe',
    level: 1
};

function postData(url, data) {
    return fetch( url, {
            body: JSON.stringify( data ),
                headers: {                    'content-Type': 'application/json'                    },
                method: 'POST'
                })
        };

postData( 'https://us-central1-hkact1-22444.cloudfunctions.net/hkHello', argdict )
    .then(   data => console.log(   data  )  )
    .catch( error => console.error( error )  )

