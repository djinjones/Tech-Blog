const router = require('express').Router();
const { User, BlogPost } = require('../models');

router.get('/', async (req, res) => {
    try {
        const user = await req.session.username;
        const posts = await BlogPost.findAll({
            where: {
                author: user,
            },
            plain: true,
        });
      
        res.render('dashboard', { posts, user,  showDeleteButton: true, loggedIn: req.session.loggedIn, } );
        
    } catch (err) {
        res.status(500).json(err);
        console.log('error loading dashboard', err)
    }
});

module.exports = router;