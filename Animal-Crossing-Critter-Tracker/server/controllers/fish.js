import express from "express";
import {
    getCatchList,
    getDonatedList,
    logCatch,
    deleteCatch,
    logDonation,
    deleteDonation
} from "../models/fish.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// GET /api/fish/caught
// Get a list of all the fish numbers the current user has logged as caught
router.get("/caught", requireAuth, async (req, res) => {
    try {
        const catchList = await getCatchList(req.user.id);
        res.status(200).json({ 
            catchList: [...catchList]
        });
    } catch (err) {
        console.error("Retrival error: ", err);
        res.status(500).json({ error: "Server error." });
    }
});

// GET /api/fish/donated
// Get a list of all the fish numbers the current user has logged as donated
router.get("/donated", requireAuth, async (req, res) => {
    try {
        const donatedList = await getDonatedList(req.user.id);
        res.status(200).json({ 
            donatedList: [...donatedList]
        });
    } catch (err) {
        console.error("Retrival error: ", err);
        res.status(500).json({ error: "Server error." });
    }
});

// POST /api/fish/:fish/caught
// Saves user has caught a specific fish
router.post("/:fish/caught", requireAuth, async (req, res) => {
    const { fish } = req.params;
    try {
        const log = await logCatch(req.user.id, fish);
        res.status(201).json({
            log: log
        });
    } catch (err) {
        console.error("Logging error: ", err);
        res.status(500).json({ error: "Server error." });
    }
});

// DELETE /api/fish/:fish/uncaught
// Delete record that user has caught a specific fish
router.delete("/:fish/uncaught", requireAuth, async (req, res) => {
    const { fish } = req.params;
    try {
        await deleteCatch(req.user.id, fish);
        res.status(201).json({
            log: "Success"
        });
    } catch (err) {
        console.error("Deletion error: ", err);
        res.status(500).json({ error: "Server error." });
    }
});

// POST /api/fish/:fish/donated
// Saves user has donated a specific fish
router.post("/:fish/donated", requireAuth, async (req, res) => {
    const { fish } = req.params;
    try {
        const log = await logDonation(req.user.id, fish);
        res.status(201).json({
            log: log
        });
    } catch (err) {
        console.error("Logging error: ", err);
        res.status(500).json({ error: "Server error." });
    }
});

// DELETE /api/fish/:fish/undonated
// Delete record that user has donated a specific fish
router.delete("/:fish/undonated", requireAuth, async (req, res) => {
    const { fish } = req.params;
    try {
        await deleteDonation(req.user.id, fish);
        res.status(201).json({
            log: "Success"
        });
    } catch (err) {
        console.error("Deletion error: ", err);
        res.status(500).json({ error: "Server error." });
    }
});

export default router;