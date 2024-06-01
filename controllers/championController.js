const Champion = require('../models/champion');

exports.getChampions = async (req, res) => {
    try {
        const champions = await Champion.find({});
        res.json(champions);
    } catch (error) {
        res.status(500).send(error.toString());
    }
};

exports.getChampionByName = async (req, res) => {
    try {
        // find champion by name (case-insensitive)
        const champion = await Champion.find({ name: { $regex: new RegExp(req.params.name, "i") } });
        if (!champion || champion.length === 0) {
            return res.status(404).send('Champion not found');
        }
        res.json(champion);
    } catch (error) {
        res.status(500).send(error.toString());
    }
};


exports.createChampion = async (req, res) => {
    try {
        const { name, title, portrait } = req.body;

        if (!name || !title || !portrait) {
            return res.status(400).send('Tous les champs sont obligatoires');
        }

        const newChampion = new Champion({ name, title, portrait });
        await newChampion.save();

        res.status(201).send('Champion ajouté avec succès');
    } catch (error) {
        res.status(500).send(error.toString());
    }
};

exports.updateChampion = async (req, res) => {
    try {
        const { name, title, portrait } = req.body;

        if (!name || !title || !portrait) {
            return res.status(400).send('Tous les champs sont obligatoires');
        }

        const champion = await Champion.findByIdAndUpdate(req.params.id, { name, title, portrait }, { new: true });
        if (!champion) {
            return res.status(404).send('Champion not found');
        }

        res.status(200).send('Champion mis à jour avec succès');
    } catch (error) {
        res.status(500).send(error.toString());
    }
};

exports.deleteChampion = async (req, res) => {
    try {
        const champion = await Champion.findOneAndDelete({ name: { $regex: new RegExp(req.params.name, "i") } });
        if (!champion) {
            return res.status(404).send('Champion not found');
        }

        res.status(204).send(); // 204 status should not have a response body
    } catch (error) {
        res.status(500).send(error.toString());
    }
};
