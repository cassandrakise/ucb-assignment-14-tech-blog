const router = require('express').Router();
// const { Blog } = require('../../models');

router.get('/', async (req,res) => {
    try {
     res.render('homepage')    
    } catch (err) {
        console.log(err)
    }
});

router.get('/login', async (req,res) => {
    try {
     res.render('login')    
    } catch (err) {
        console.log(err)
    }
});

router.get('/signup', async (req,res) => {
    try {
     res.render('signup')    
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;