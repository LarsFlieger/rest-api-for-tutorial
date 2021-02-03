const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 3000

let items = [{
    "body": "Brot",
    "category": "Bäcker",
    "id": 0
},{
    "body": "Kondome",
    "category": "Drogerie",
    "id": 1
}];
let index = 2;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/item', (req, res) => {
    const item = req.body;
    console.log(item);
    item['id'] = index++;
    items.push(item);

    res.send(item);
});

app.get('/', (req, res) => {
    res.json(items);
});

app.get('/item/:id', (req, res) => {
    const id = req.params.id;

    for (let item of items) {
        if (item.id == id) {
            res.json(item);
            return;
        }
    }

    res.status(404).send('No item found with this id: ' + id);
});

app.delete('/item/:id', (req, res) => {
    const id = req.params.id;

    items = items.filter(i => {
        if (i.id != id) {
            return true;
        }

        return false;
    });

    res.send('Item is deleted');
});

app.post('/item/:id', (req, res) => {
    const id = req.params.id;
    const newItem = req.body;
    newItem['id'] = id;

    for (let i = 0; i < items.length; i++) {
        let item = items[i]

        if (item.id == id) {
            items[i] = newItem;
        }
    }
    res.send('Item is edited');
});

app.listen(port, () => console.log(`Listing on port ${port}!`));