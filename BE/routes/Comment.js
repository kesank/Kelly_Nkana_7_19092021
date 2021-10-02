const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


const comment = require('../controllers/CommentCtrl');

router.get('/:id', comment.findAll);
router.post('/', comment.create);
router.get('/signal', comment.getSignal);
router.post('/signal/:id', comment.signal);
router.get('/:id', comment.findOne);
router.put('/:id', comment.update);
router.get('/destroy/:id', comment.delete);

module.exports = router;