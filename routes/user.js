const express = require('express');
const router = express.Router();
const { loadPage, saveTask } = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.get('/:id', loadPage);

router.post('/:id', saveTask);

module.exports = router;
