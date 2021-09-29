const express = require('express');
const router = express.Router();

const user = require('../controllers/UserCtrl');

router.get('/', user.findAll);
router.post('/post', user.create);
router.post('/login', user.login);
router.put('/:id', user.update);
router.delete('/:id', user.delete);

module.exports = router;