const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/temperatures', (_req, res) => {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    res.writeHead(200, headers);
    setInterval( () => {
        reSend(res)
    }, 100)
   
    
})

function reSend(res) {
    const obj = {
        notes: 'test notes ' + new Date(),
        temperature: Math.random().toFixed(2) * 100 + ' F',
        updatedAt: new Date()
    }
    const data = `data: ${JSON.stringify(obj)}\n\n`;
    console.log(data);
    res.write(data);
}


app.listen(8000, () => {
    console.log('server running on port 8000');
})