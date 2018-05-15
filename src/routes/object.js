/**
 * Module Dependencies
 */
var router = require('express-promise-router')();

const ObjectController = require('../controllers/ObjectController');

router.post('/', ObjectController.createObject);
router.get('/:key', ObjectController.getObject);

module.exports = router;
