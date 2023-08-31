const knex = require('../knex/knex');
const bcrypt = require('bcrypt');

const getUser = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await knex('user')
            .where({username})
            .first();

        if (!user) {
            return res.status(401).json({message: 'Invalid username or Password'});
        }

        if (user['password_hash'].trim() !== password) {
            return res.status(401).json({message: 'Invalid username or Password'})
        }

        const {password_hash, ...userInfo} = user;
        console.log(userInfo);
        return res.status(200).json(userInfo);

    } catch (err) {
        console.error('Error: ', err);
        console.log('error occurred');
        res.status(500).json({error: 'Issue logging in.'});
    }

}

const signUpUser = async (req, res) => {
    const {username, password} = req.body;
    const usernameMinLength = 5;
    const usernameMaxLength = 15;
    const passwordMinLength = 8;
    const passwordMaxLength = 128;

    const usernameString = `^[a-zA-Z0-9]{${usernameMinLength},${usernameMaxLength}}$`;
    const usernameRegEx = new RegExp(usernameString);

    // validate username and password (server side)
    if (!usernameRegEx.test(username)) {
        return res.status(500).json({error: `Username must be alphanumeric and contain ${usernameMinLength} - ${usernameMaxLength} characters.`});
    }

    if (password.length < passwordMinLength || password.length > passwordMaxLength) {
        return res.status(500).json({error: `Password must contain ${passwordMinLength} - ${passwordMaxLength} characters`});
    }

    try {
        const saltRounds = 11;
        bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
            if (err) return res.status(500).json({error: 'Error handling password'});

            const userInfo = {
                username: username,
                password_hash: hashedPassword
            }

            knex('user')
                .insert(userInfo)
                .returning(['user_id', 'username'])
                .then((returningData) => {
                    console.log(returningData[0]);
                    res.status(201).json(returningData[0]);
                })
                .catch((error) => {
                    console.error('Error: ', error);
                    if (error.constraint === 'user_username_key') return res.status(500).json({error: 'User already exists'});
                    res.status(500).json({error: 'Error creating new user.'})
                });

        });

        // res.status(201).json({message: 'User signed up!'});
    } catch (error) {
        console.error('Error Occurred:', error);
        res.status(500).json({error: 'User sign up failed'});
    }
}

const loginUser = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await knex('user')
            .where({username})
            .first();

        if (!user) {
            return res.status(401).json({error: 'Invalid username or password'});
        }

        const {password_hash, ...userInfo} = user;

        bcrypt.compare(password, password_hash, (err, result) => {
            if (err) return res.status(401).json({});

            console.log(result);

            if (result) {
                console.log(userInfo);
                return res.status(200).json(userInfo);
            } else {
                return res.status('401').json({message: 'Invalid Credentials'});
            }
        });
    } catch (err) {
        console.error(err);
    }

}

module.exports = {
    getUser,
    signUpUser,
    loginUser
}
