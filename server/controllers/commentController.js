const knex = require('../knex/knex');
const commentService = require('../services/commentService');

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
    const userId = req.body.post_id;

    const data = {
        user_id: req.auth.user_id,
        post_id: userId,
        text: req.body.comment
    };

    knex('comment')
        .insert(data)
        .then(() => {
            return commentService.fetchComment(userId);
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
