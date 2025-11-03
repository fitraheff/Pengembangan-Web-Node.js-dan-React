const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { validationBodyCategory } = require('../middleware/validation');

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/', validationBodyCategory, categoryController.createCategory);
router.put('/:id', validationBodyCategory, categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;