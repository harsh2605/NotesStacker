const express = require("express");
const router = express.Router();
const Note = require("../models/Notes");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require('express-validator');

//1.fetching all notes of the user with a get request and login required
router.get("/fetchNotes", fetchUser, async (req, res) => {
    try {
        const Notes = await Note.find({ user: req.user.id });
        console.log(Notes);
        return res.json(Notes);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Internal server error");
    }
})


//2.Adding notes of the user into the webapp through a post request and login required
router.post("/addNotes", fetchUser, [
    body('title', 'title must be atleast 3 characters').isLength({ min: 3 }),
    body('description', "description must be atleast 5 characters").isLength({ min: 5 })
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { title, tag, description } = req.body;
            const nayaNote = new Note({ title, tag, description, user: req.user.id });
            const newNotes = await nayaNote.save();
            res.json(newNotes);
        } catch (error) {
            console.log(error.message);
            return res.status(500).send("Internal server error");
        }
    })

router.put("/updateNotes/:id", fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const updatedNotes = {};
        if (title) updatedNotes.title = title;
        if (description) updatedNotes.description = description;
        if (tag) updatedNotes.tag = tag;

        let Notes = await Note.findById(req.params.id);
        if (!Notes) res.status(404).send("Not Found");
        if (Notes.user.toString() !== req.user.id) {
            return res.status(404).send("Not a valid user to update the notes");
        }
        Notes = await Note.findByIdAndUpdate(req.params.id, { $set: updatedNotes }, { new: true });
        res.json({ Notes });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Internal server error");
    }
})

router.delete("/deleteNotes/:id", fetchUser, async (req, res) => {
    try {
        let Notes = await Note.findById(req.params.id);
        if (!Notes) {
            return res.status(404).send("Not found");
        }

        //allow deletion only if the user who has created the notes is trying to delete the notes
        if (Notes.user.toString() !== req.user.id) {
            return res.status(404).send("Not a valid user to delete the notes");
        }
        Notes = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been sucessfully deleted", note: Note });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Internal server error");
    }
})
module.exports = router;