const express = require('express');
const router = express.Router();
const Post = require('../models/post.model.js');

router.get('/', (req, res) => {

    res.send("<h1>hello from api</h1>");
})
router.post('/p', async (req, res) => {

    try {
        const post = await Post.create(req.body);
        res.status(200).json(post);
    } catch (error) { res.status(500).json({ message: error.message }) }
});
router.get('/p', async (req, res) => {

    try {
        const post = await Post.find({});
        res.status(200).json(post);
    } catch (error) { res.status(500).json({ message: error.message }) }
});
router.get('/p/:id', async (req, res) => {

    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        res.status(200).json(post);
    } catch (error) { res.status(500).json({ message: error.message }) }
});
// update
router.put('/p/:id', async (req, res) => {
    try {

        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) {
            return res.status(404).json({ error: "post introuvable" });
        }
        res.status(200).json({ message: 'post modifié avec succès', post });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// delete
router.delete('/p/:id', async (req, res) => {
    try {
        // Chercher un post par l'id et le supprimer
        const { id } = req.params;
        const post = await Post.findByIdAndDelete(id);

        if (!post) {
            return res.status(404).json({ message: 'post non trouvé' });
        }
        res.status(200).json({ message: 'post supprimé avec succès', post });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;