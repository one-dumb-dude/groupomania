const knex = require('../knex/knex');
const bcrypt = require('bcrypt');

const signUpUser = async (req, res) => {
    const {username, password} = req.body;
    const usernameMinLength = 5;
    const usernameMaxLength = 15;
    const passwordMinLength = 8;
    const passwordMaxLength = 128;

    const usernameString = `^[a-zA-Z0-9]{${usernameMinLength},${usernameMaxLength}}$`;
    const usernameRegEx = new RegExp(usernameString);

    // validate username
    if (!usernameRegEx.test(username)) {
        return res.status(500).json({message: `Username must be alphanumeric and contain ${usernameMinLength} - ${usernameMaxLength} characters.`});
    }

    // validate password
    if (password.length < passwordMinLength || password.length > passwordMaxLength) {
        return res.status(500).json({message: `Password must contain ${passwordMinLength} - ${passwordMaxLength} characters`});
    }

    // attempt to hash password
    try {
        const saltRounds = 11;
        bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
            if (err) return res.status(500).json({message: 'Error handling password'});

            const userInfo = {
                username: username,
                password_hash: hashedPassword
            }

            knex('user')
                .insert(userInfo)
                .then(() => {
                    res.status(201).json({message: 'User signed up successfully'});
                })
                .catch((error) => {
                    if (error.constraint === 'user_username_key') return res.status(500).json({message: 'User already exists'});
                    return res.status(500).json({message: 'Error creating new user.'})
                });

        });
    } catch (error) {
        console.error('Error Occurred:', error);
        res.status(401).json({message: 'User sign up failed'});
    }
}

const loginUser = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await knex('user')
            .where({username})
            .first();

        if (!user) {
            return res.status(401).json({message: 'Invalid username or password'});
        }

        const {password_hash, ...userInfo} = user;

        bcrypt.compare(password, password_hash, (err, result) => {
            if (err) return res.status(401).json({message: 'Invalid username or password'});

            if (result) {
                return res.status(200).json(userInfo);
            } else {
                return res.status(401).json({message: 'Invalid Credentials'});
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: 'Server had an issue logging in'});
    }

}

module.exports = {
    signUpUser,
    loginUser
}
