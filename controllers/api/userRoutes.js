const router = require('express').Router();
const { User } = require('../../models');

//create new user (/api/users)
router.post('/', async (req, res) => {
    try {
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        console.log(user);

        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.logged_in = true;

            res.status(200).send(user)
        });
    } catch (error) {
        res.status(500).json(error)
    }
});

//login user (/api/users/login)
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!user) {
            res.status(400).json({message: 'Incorrect email/password!'});
            return;
        }
        
        const validatePassword = await user.checkPassword(req.body.password);

        if (!validatePassword) {
            res.status(400).json({message: 'Incorrect email/password!'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.logged_in = true;

            res.json({ message: `Welcome, ${user.username}` });
        });
    } catch (error) {
        res.status(500).json(error)
    }
});

//logout user (/api/users/logout)
router.post('/logout', async (req, res) => {
    try {
        if (req.session.logged_in) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router;