const express = require('express');
const app = express();

app.use(express.static('static_files'));

const MusixmatchApi = require('musixmatch_api');
const defaultClient = MusixmatchApi.ApiClient.instance;

// Configure API key authorization: key
const key = defaultClient.authentications['key'];
console.log(key);
key.apiKey = '9a56e12a5517c2abf3a319e95a449983';

// Configure the server ports and pages
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
    		
            const track_id = data.message.body.track_list[0].track.track_id;

            // LYRICS API
            const LyricsApi = new MusixmatchApi.LyricsApi();
            
            const opts = { 
                'format': "json",
                'callback': "callback"
            };
            
            const callback = function(error, data, response) {
                if (error) {
                    console.error(error);
                } else {
                    console.log('Lyrics API called successfully. Returned data: ' + data);
                    data = JSON.parse(response.text);
                    const lyrics = data.message.body.lyrics.lyrics_body;
                    
                    res.send(lyrics);
                }
            };
            
            LyricsApi.trackLyricsGetGet(track_id, opts, callback);
            
            //res.send(data);
    	} else {
    		console.error('Bad request');
    		res.send({});
    	}
    });
});