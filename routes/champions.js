const express = require('express');
const router = express.Router();
const championController = require('../controllers/championController');

router.get('/', championController.getChampions);
router.get('/:id', championController.getChampionById);
router.post('/', championController.createChampion);
router.put('/:id', championController.updateChampion);

module.exports = router;
