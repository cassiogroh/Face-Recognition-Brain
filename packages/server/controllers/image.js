const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(data => {
            db('users').where('id', '=', id)
            .then(user => res.json(user[0].entries))
        })
        // .then(entries => res.json(entries[0]))
        .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
    handleImage
}