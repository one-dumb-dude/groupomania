const knex = require('../knex/knex');

const getPosts = (req, res) => {
    knex.select(
        'u.username',
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
    } catch(err) {
        console.error('Error: ', err);
        return res.status(500).send({message: 'Server side error'});
    }
}

module.exports = {
    getPosts, createPost
}

