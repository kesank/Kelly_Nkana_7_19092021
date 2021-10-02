const express = require('express');
const router = express.Router();

const user = require('../controllers/UserCtrl');

router.get('/', user.findAll);
router.post('/post', user.create);
router.post('/login', user.login);
router.post('/update', user.update);
router.get('/destroy/:id', user.delete);
router.get('/profil/:id', user.findOne);

module.exports = router;