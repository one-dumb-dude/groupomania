const knex = require('../knex/knex');
const commentService = require('../services/commentService');

const getPosts = async (req, res) => {
    const userId = req.auth.user_id;

    try {
        const postsWithStatus = await knex('user as u')
            .select(
                'u.username',
                'p.post_id',
                'p.title',
                'p.content',
                'p.image_url',
                'p.created_at',
                'p.updated_at'
            )
            .select(
                knex.raw(
                    `CASE 
                        WHEN read_post.post_id IS NOT NULL THEN 'READ' 
                        WHEN p.user_id = ? THEN 'Author' 
                        ELSE 'UNREAD' 
                     END as post_status`,
                    [userId]
                )
            )
            .join('post as p', 'u.user_id', 'p.user_id')
            .leftJoin('read_post', function () {
                this.on('p.post_id', '=', 'read_post.post_id')
                    .andOn('read_post.user_id', '=', knex.raw('?', [userId]))
            });

        res.status(200).json(postsWithStatus);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({message: 'Error getting posts'});
    }
};

const getAPost = async (req, res) => {
    const postId = req.params.postId;

    const postResult = await knex.select(
        'u.user_id',
        'u.username',
        'p.title',
        'p.content',
        'p.image_url',
        'p.created_at'
    )
        .from('user as u')
        .join('post as p', 'u.user_id', '=', 'p.user_id')
        .where('p.post_id', postId);

    const commentResult = await commentService.fetchComment(postId);

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

        if (req.file) {
            data.image_url = `${process.env.LOCAL_SERVER_URL}/${req.file.filename}`;
        }

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

const markAsRead = async (req, res) => {
    const userId = Number(req.auth.user_id);  // Assuming you attach the user ID to the request in your JWT verification middleware
    const postId = Number(req.params?.postId);

    const post = await knex('post').where('post_id', postId).first();

    if (post.user_id === userId) {
        return res.status(400).send({ message: 'You cannot mark your own post as read' });
    }

    try {
        await knex('read_post')
            .insert({ user_id: userId, post_id: postId })
            .onConflict(['user_id', 'post_id'])
            .ignore();  // Equivalent to DO NOTHING in SQL

        res.status(200).send({ message: 'Marked as read' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ message: 'Server Error' });
    }
};

const getUnreadPostsCount = async (req, res) => {
    const userId = req.auth.user_id;

    try {
        const count = await knex('post')
            .count('*')
            .whereNotExists(
                knex.select('*')
                    .from('read_post')
                    .where('user_id', userId)
                    .whereRaw('post.post_id = read_post.post_id')
            )
            .andWhere('user_id', '<>', userId);

        res.status(200).json(count[0].count); // Adjust based on how Knex returns count
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


module.exports = {
    getPosts, getAPost, createPost, markAsRead, getUnreadPostsCount
}

