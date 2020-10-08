const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('Incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: email,
                        name: name,
                        entries: 0,
                        joined: new Date()
                    })
                    .then(user => {
                        db.select('*')
                        .from('users')
                        .where('email', '=', email)
                        .then(user => {
                            console.log(user[0]);
                            res.json(user[0]);
                        })
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json('E-mail already registered'));
}

module.exports = {
    handleRegister: handleRegister
}