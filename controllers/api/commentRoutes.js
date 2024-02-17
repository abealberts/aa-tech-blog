const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//create comment (/api/comments)
router.post('/', withAuth, async (req, res) => {
    try {
        const comment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json(error);
    }
});

//delete comment (/api/comments/:id)
router.delete('/', withAuth, async (req, res) => {
    try {
        const comment = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if(!comment) {
            res.status(400).json({message: 'Cannot find comment with given ID'})
        }

        res.status(200).json({message: 'Comment successfully deleted!'});
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;