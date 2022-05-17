const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

const api = express.Router();
app.use('/api/quotes', api);

api.get('/', (req, res, next) => {
    let auth = req.query;
    if (auth.person) {
        
        let newArray = quotes.filter(x => {
            return x.person === auth.person;
        });
        res.send({quotes: newArray})
    } else {
    res.send({quotes: quotes})
    }
});
api.get('/random', (req, res, next) => {
    let randQuote = getRandomElement(quotes);
    console.log(randQuote);
    res.send({quote: randQuote});
})

api.post('/', (req, res, next) => {
    let newQuote = req.query;
    if (newQuote.quote && newQuote.person) {
        quotes.push(newQuote);
        res.send({quote: newQuote})
    } else {
        res.status(400).send()
    }
})



app.listen(PORT, () => {
    console.log('The server is listening on Port 4001')
});

