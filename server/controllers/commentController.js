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
    const userId = req.auth.user_id;
    const {post_id, comment} = req.body;
    const commentTrimmed = comment;
    const commentMinLength = 5;
    const commentMaxLength = 200;

    if (commentTrimmed.trim().length < commentMinLength || commentTrimmed.length > commentMaxLength) {
        return res.status(500).json({message: `Comment must contain ${commentMinLength} - ${commentMaxLength} characters`});
    }

    const data = {
        user_id: userId,
        post_id,
        text: commentTrimmed
    };

    knex('comment')
        .insert(data)
        .then(() => {
            return commentService.fetchComment(post_id);
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
