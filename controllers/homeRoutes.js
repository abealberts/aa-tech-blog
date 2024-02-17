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

//render project page
router.get('/post/:id', async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id, {
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
                project_id: req.params.id
            },
            include: [
                {
                    model: User,
                    attributes: { exclude: ['password'] }
                }
            ]
        });

        const renderProject = project.get({ plain: true });
        const renderComments = comments.map((comment) => comment.get({ plain: true }));

        res.render('project', {
            ...renderProject,
            renderComments,
            logged_in: req.session.logged_in
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

//render post into update form
router.get('/update/:id', async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id, {
            include: [
              {
                model: User, 
                attributes: { exclude: ['password'] }
              }
            ]
          });

          const renderProject = project.get({ plain: true });

          res.render('update', {
            ...renderProject,
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
router.get('/new', (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/');
            return;
        }
        res.render('new', {
            logged_in: req.session.logged_in,
          });
    } catch (error) {
        res.status(500).json(error);
    }
});

//render user profile
router.get('profile/:id', withAuth, async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: {
                exclude: ['password']
            },
            include: [
                {
                    model: Project,
                    attributes: ['title', 'body']
                }
            ]
        });

        const renderUser = user.get({ plain: true });

        res.render('dashboard', {
            ...renderUser,
            logged_in: req.session.logged_in
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;