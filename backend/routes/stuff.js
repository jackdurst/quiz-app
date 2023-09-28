const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff')

router.get('/:id', stuffCtrl.getThing)
router.post('/', stuffCtrl.createThing)
router.get('/', stuffCtrl.getEverything);
router.put('/:id', stuffCtrl.modifyThing)
router.delete('/:id', stuffCtrl.deleteThing)

module.exports = router;