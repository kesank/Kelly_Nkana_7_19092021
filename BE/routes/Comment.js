const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


const comment = require('../controllers/CommentCtrl');

router.get('/:id', comment.findAll);
router.post('/', comment.create);
router.get('/:id', comment.findOne);
router.put('/:id', comment.update);
router.delete('destroy/:id', comment.delete);

module.exports = router;