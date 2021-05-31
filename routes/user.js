const express = require('express');
const router = express.Router();
const { loadPage, saveTask, deleteTask } = require('../controllers/userController');
const taskValidate = require('../validations/save');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.get('/:id', loadPage);

router.post('/:id', taskValidate, saveTask);

router.get('/:id/delete/:tid', deleteTask);

module.exports = router;
