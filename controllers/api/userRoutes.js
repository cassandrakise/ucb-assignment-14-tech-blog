const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true; 

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create({ 
            name: req.body.name,
            email: req.body.email, 
            password: req.body.password
        });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Invalid login information'});
            return; 
        }

        req.session.save(() => {
            req.sessionStore.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now registered!'});
        });
    
    }  catch (err) {
        res.status(400).json(err);
    }    
});


router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
        // JSON.parse(JSON.stringify(userData)); -- test to avoid bug
            if (!userData) {
            return res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again'});
        }
        console.log(userData)

        const validPassword = userData.checkPassword(req.body.password);
        if (!validPassword) {
            return res 
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
        }

        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
      
            res.json({ userData, message: 'You are now logged in!' });
          });
        } catch (err) {
        console.log(err)
          res.status(400).json({ message: 'No user account found!' });
        }
});

router.post('/logout', (req,res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;