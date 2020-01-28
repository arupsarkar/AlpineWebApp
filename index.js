const express = require ('express');
const speech = require('@google-cloud/speech');
const fs = require('fs');
const port = process.env.PORT || '3000';
const app = express();




async function main() {

    const client = new speech.SpeechClient();
    const filename = './assets/audio/brooklyn.wav';

    const file = fs.readFileSync(filename);
    const audioBytes = file.toString('base64');

    const audio = {
        content: audioBytes
    };
    const config = {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'en-US'
    };
    const request  = {
        audio: audio,
        config: config
    };

    const [response] = await client.recognize( request );
    const transcription = response.results.map ( result  =>
        result.alternatives[0].transcript).join('\n');
        console.log(`Transcription: ${transcription}`);

}

app.get('/', (req, res) => {
    res.send(main().catch(console.error));
});

app.listen(port, () => {
    console.log('Example app listening on port 3000!')
});
