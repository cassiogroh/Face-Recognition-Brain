const handleSignIn = (db, bcrypt) => (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json('Incorrect form submit');
    }
    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
        console.log(data[0])
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if (isValid) {
            return db.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
                res.json(user[0])
            })
            .catch(err => res.status(400).json('Unable to get user'))
        } else {
            res.status(400).json('Wrong credentials')
        }
    })
    .catch(err => res.status(400).json('Wrong credentials'))
}

module.exports = {
    handleSignIn: handleSignIn
}