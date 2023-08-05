const knex = require('../knex/knex');

const getAllMessages = (req, res) => {
    knex('message').select('*')
        .then((message) => {
            console.log('message received', message)
            res.status(200).json(message);
        })
        .catch((error) => {
            console.error('Error:', error);
            res.status(500).json({message: 'get all messages'});
        })

};

module.exports = {
    getAllMessages
}
