const router = require('express').Router();
// const { Blog } = require('../../models');

router.get('/', async (req,res) => {
    try {
     res.render('homepage')    
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;