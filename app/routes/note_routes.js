let ObjectID = require('mongodb').ObjectID;

module.exports = function(app, client) {
    const database = client.db('sample_mflix');
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        
        database.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error har occerred'});
            }else {
                res.send(item);
            }
        })

    });

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        
        database.collection('notes').remove(details, (err) => {
            if (err) {
                res.send({'error': 'An error har occerred'});
            }else {
                res.send('Note ' + id + ' deleted!');
            }
        })

    });
    
    app.post('/notes', (req, res) => {
        const note = {text: req.body.body, title: req.body.title};
        
        database.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(result.ops[0]);
            }
        })
    });

    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        const note = {text: req.body.body, title: req.body.title}

        database.collection('notes').update(details, note, (err) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            }else {
                res.send(note);
            }
        })
    })
    
};

