const knex = require('../knex/knex');

const getComments = (req, res) => {
    knex.select(
        'u.username',
        'm.text',
        'c.image_url',
        'c.created_at',
        'c.updated_at'
    )
        .from('user as u')
        .join('comment as c', 'u.user_id', '=', 'c.user_id')
        .then((commentData) => {
            res.status(200).json(commentData);
        })
        .catch((error) => {
            console.error('Error:', error);
            res.status(500).json({message: 'Error getting comments'});
        });
};

const createComment = (req, res) => {
    const data = {
        user_id: req.auth.user_id,
        text: req.body.text
    };

    if (req.file) {
        data.image_url = `${process.env.LOCAL_SERVER_URL}/${req.file.filename}`;
    }

    knex('comment')
        .insert(data)
        .then((info) => {
            res.status(201).send({message: 'Comment created successfully'});
        })
        .catch((err) => {
            console.error('Error: ', err);
            res.status(501).send({message: 'Server side error'});
        });
}

module.exports = {
    getComments, createComment
}
