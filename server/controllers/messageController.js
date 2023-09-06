const knex = require('../knex/knex');

const getAllMessages = (req, res) => {
    knex.select(
        'u.username',
        'm.text',
        'm.created_at',
        'm.updated_at'
    )
        .from('user as u')
        .join('message as m', 'u.user_id', '=', 'm.user_id')
        .then((messageData) => {
            res.status(200).json(messageData);
        })
        .catch((error) => {
            console.error('Error:', error);
            res.status(500).json({message: 'Error getting messages'});
        });

};

const insertAMessage = (req, res) => {

    const data = {
        user_id: req.body.user_id,
        text: req.body.text
    };

    knex('message')
        .insert(data)
        .returning(['user_id', 'message_id', 'text'])
        .then((info) => {
            res.status(201).send({message: info});
        })
        .catch((err) => {
            console.error('Error: ', err);
            res.status(501).send({message: 'Server side error'});
        });
}

module.exports = {
    getAllMessages, insertAMessage
}
