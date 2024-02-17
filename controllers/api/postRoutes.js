const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//create post (/api/posts)
router.post('/', withAuth, async (req, res) => {
    try {
        const post = await Post.create({
            title: req.body.title,
            body: req.body.body,
            user_id: req.body.user_id,
        });
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json(error);
    }
});

//update post (/api/posts/:id)
router.put('/:id', withAuth, async (req, res) => {
    try {
        await Post.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({message: 'Successfully updated post!'});
    } catch (error) {
        res.status(400).json(error);
    }
});

//delete post & associated comments (/api/posts/:id)
router.delete('/:id', withAuth, async (req, res) => {
    try {
        //delete associated comments
        const comment = Comment.destroy({
            where: {
                project_id: req.params.id
            }
        });

        if(!comment) {
            res.status(400).json({message: 'No comments found for deletion.'})
        }

        //delete post
        const post = Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });
        if (!post) {
            res.status(400).json({message: 'Post with given ID not found'});
        }
        res.status(200).json({message: 'Successfully deleted post!'});
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;