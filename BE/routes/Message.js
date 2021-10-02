const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


const message = require('../controllers/MessageCtrl');

router.get('/', message.findAll);
router.get('/signal', message.getSignal);
router.post('/post', message.create);
router.get('/:id', message.findOne);
router.get('pseudo/:id', message.findPseudo);
router.put('/:id', message.update);
router.post('/signal/:id', message.signal);
router.get('/destroy/:id', message.delete);

module.exports = router;