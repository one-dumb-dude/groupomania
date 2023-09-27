const knex = require('../knex/knex');

const getPosts = (req, res) => {
    knex.select(
        'u.username',
        'p.post_id',
        'p.title',
        'p.content',
        'p.created_at',
        'p.updated_at'
    )
        .from('user as u')
        .join('post as p', 'u.user_id', '=', 'p.user_id')
        .then((postData) => {
            res.status(200).json(postData);
        })
        .catch((error) => {
            console.error('Error:', error);
            res.status(500).json({message: 'Error getting posts'});
        });
};

const getAPost = async (req, res) => {
    const postId = req.params.postId;

    const postResult = await knex.select(
        'u.user_id',
        'u.username',
        'p.title',
        'p.content',
        'p.created_at'
    )
        .from('user as u')
        .join('post as p', 'u.user_id', '=', 'p.user_id')
        .where('p.post_id', postId);

    const commentResult = await knex.select(
        'u.username',
        'c.comment_id',
        'c.text',
        'c.image_url',
        'c.created_at'
    )
        .from('comment as c')
        .join('user as u', 'u.user_id', '=', 'c.user_id')
        .where('c.post_id', postId)
        .orderBy('c.created_at', 'asc');


    if (!postResult || !commentResult) {
        return res.status(500).json({message: 'Error getting a post'});
    }

    return res.status(200).json({
        postData: postResult[0],
        comments: commentResult
    });
}

const createPost = async (req, res) => {
    try {
        const data = {
            user_id: Number(req.body.user_id),
            title: req.body.title,
            content: req.body.content
        };

        const result = await knex('post').insert(data);

        // Guard clause for error
        if (!result) {
            return res.status(500).json({message: 'Failed to create post'});
        }

        return res.status(201).send({message: 'Post created successfully'});
    } catch (err) {
        console.error('Error: ', err);
        return res.status(500).send({message: 'Server side error'});
    }
}

module.exports = {
    getPosts, getAPost, createPost
}
