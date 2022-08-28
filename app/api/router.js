const router = require('express').Router();
const { police_check } = require('../../middleware');
const apiController = require('./controller');

router.get('/address', 
    police_check('read', 'id'),
    apiController.getDataId
);
router.get('/kecamatan', 
    police_check('view', 'city'),
    apiController.getDataCity
);

module.exports = router;