const knex = require('../knex/knex');

const commentService = {
    fetchComments: () => {
        return knex.select(
            'u.username',
            'c.text',
            'c.created_at',
            'c.updated_at'
        )
            .from('user as u')
            .join('comment as c', 'u.user_id', '=', 'c.user_id');
    },
    fetchComment: (postId) => {
        return knex.select(
            'u.username',
            'c.comment_id',
            'c.text',
            'c.created_at'
        )
            .from('comment as c')
            .join('user as u', 'u.user_id', '=', 'c.user_id')
            .where('c.post_id', postId)
            .orderBy('c.created_at', 'asc');
    }
};

module.exports = commentService;
