const express = require('express');
const app = express();


app.use(express.static('static_files'));

const MusixmatchApi = require('musixmatch_api');
const defaultClient = MusixmatchApi.ApiClient.instance;

// Configure API key authorization: key
const key = defaultClient.authentications['key'];
console.log(key);
key.apiKey = '9a56e12a5517c2abf3a319e95a449983';



app.listen(3000, () => {
	console.log('Server started at http://localhost:3000/');
});


app.get('/', (req, res) => {
	res.redirect('/html/index.html');
});


app.get('/search', (req, res) => {
	const language = req.query.language;
	const title = req.query.title;
	console.log(title);

	const api = new MusixmatchApi.TrackApi();

	api.trackSearchGet(
    //opts
    { 
    	'qTrack': title,
    	'page': 1,
    	'pageSize': 5,
    	'sTrackRating': 'desc',
    	'format': 'json',
    	'callback': 'callback'
    },
    //callback
    (error, data, response) => {
    	if (error) {
    		console.error(error);
    		res.send({});
    	} else if (response.text) {
    		data = JSON.parse(response.text);
    		console.log('API called successfully. Returned data: ' + data);
    		res.send(data);
    	} else {
    		console.error('Bad request');
    		res.send({});
    	}
    });
});