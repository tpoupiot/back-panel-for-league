const express = require('express');
const router = express.Router();
const championController = require('../controllers/championController');

router.get('/', championController.getChampions);
router.get('/:name', championController.getChampionByName);
router.post('/', championController.createChampion);
router.put('/:id', championController.updateChampion);
router.delete('/:name', championController.deleteChampion);

module.exports = router;
