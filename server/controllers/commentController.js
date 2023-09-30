const knex = require('../knex/knex');

const commentService = {
    fetchComments: () => {
        return knex.select(
            'u.username',
            'c.text',
            'c.image_url',
            'c.created_at',
            'c.updated_at'
        )
            .from('user as u')
            .join('comment as c', 'u.user_id', '=', 'c.user_id');
    }
};

const getComments = (req, res) => {
    commentService.fetchComments()
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
        post_id: req.body.post_id,
        text: req.body.comment
    };

    knex('comment')
        .insert(data)
        .then(() => {
            return commentService.fetchComments();
        })
        .then((allComments) => {
            res.status(201).json(allComments);
        })
        .catch((err) => {
            console.error('Error: ', err);
            res.status(501).send({message: 'Server side error'});
        });
};

module.exports = {
    getComments, createComment
}
