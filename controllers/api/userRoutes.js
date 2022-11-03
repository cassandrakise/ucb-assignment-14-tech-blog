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

        // if (!validPassword) {
        //     res 
        //         .status(400)
        //         .json({ message: 'Incorrect email or password, please try again' });
        //     return;
        // }

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
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again'});
            return; 
        }

        const validPassword = userData.checkPassword(req.body.password);
        if (!validPassword) {

            res 
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        // res.json({ test: 'what'});

        req.session.save(() => {
            req.sessionStore.user_id = userData.id;
            req.session.logged_in = true;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ "user": userData, "message" : "Successfully logged in!" })); // had to use "old school way" to receive any sort of request/response, which was only visible in firefox and not in chrome
            
            // res.json({ "user" : userData });
            // res.json({ "user" : "test" });
        });

        
    }  catch (err) {
        res.status(400).json(err);
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