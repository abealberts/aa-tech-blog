const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

//render homepage
router.get('/', withAuth, async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: { exclude: ['password'] }
                }
            ]
        });
        
        const renderPosts = posts.map((post) => post.get({ plain: true }));
        console.log(renderPosts);

        res.render('homepage', {
            renderPosts,
            logged_in: req.session.logged_in
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

//render post page
router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: { exclude: ['password'] }
                },
                {
                    model: Comment

                }
            ]
        });
        const comments = await Comment.findAll({
            where: {
                post_id: req.params.id
            },
            include: [
                {
                    model: User,
                    attributes: { exclude: ['password'] }
                }
            ]
        });

        const renderPost = post.get({ plain: true });
        const renderComments = comments.map((comment) => comment.get({ plain: true }));

        console.log({ renderPost, renderComments });

        res.render('post', {
            ...renderPost,
            renderComments,
            logged_in: req.session.logged_in
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

//render post into update form
router.get('/update/:id', withAuth, async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [
              {
                model: User, 
                attributes: { exclude: ['password'] }
              }
            ]
          });

          const renderPost = post.get({ plain: true });

          res.render('update', {
            ...renderPost,
            logged_in: req.session.logged_in
          });
    } catch (error) {
        res.status(500).json(error);
    }
});

//render login
router.get('/login', (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/');
            return;
        }
        res.render('login');
    } catch (error) {
        res.status(500).json(error);
    }
});

//render signup
router.get('/signup', (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/');
            return;
        }
        res.render('signup');
    } catch (error) {
        res.status(500).json(error);
    }
});

//render new post page
router.get('/new', withAuth, (req, res) => {
    try {
        if (req.session.logged_in) {
            res.render('new', {
                logged_in: req.session.logged_in,
            });
        } else {
            res.redirect('/');
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

//render user profile
router.get('/profile', withAuth, async (req, res) => {
    try {
        const user = await User.findByPk(req.session.user_id, {
            attributes: {
                exclude: ['password']
            },
            include: [
                {
                    model: Post,
                    attributes: [ 'id', 'title', 'body', 'user_id' ]
                }
            ]
        });

        const renderUser = user.get({ plain: true });
        console.log(renderUser);

        res.render('profile', {
            ...renderUser,
            logged_in: req.session.logged_in
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;