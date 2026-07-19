import express from "express";
import {
  getCatchList,
  getDonatedList,
  logCatch,
  deleteCatch,
  logDonation,
  deleteDonation
} from "../models/bugs.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// GET /api/bugs/caught
// Get a list of all the bug numbers the current user has logged as caught
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

// GET /api/bugs/donated
// Get a list of all the bug numbers the current user has logged as donated
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

// POST /api/bugs/:bug/caught
// Saves user has caught a specific bug
router.post("/:bug/caught", requireAuth, async (req, res) => {
    const { bug } = req.params;
    try {
        const log = await logCatch(req.user.id, bug);
        res.status(201).json({
            log: log
        });
    } catch (err) {
        console.error("Logging error: ", err);
        res.status(500).json({ error: "Server error." });
    }
});

// DELETE /api/bugs/:bug/uncaught
// Delete record that user has caught a specific bug
router.delete("/:bug/uncaught", requireAuth, async (req, res) => {
    const { bug } = req.params;
    try {
        await deleteCatch(req.user.id, bug);
        res.status(201).json({
            log: "Success"
        });
    } catch (err) {
        console.error("Deletion error: ", err);
        res.status(500).json({ error: "Server error." });
    }
});

// POST /api/bugs/:bug/donated
// Saves user has donated a specific bug
router.post("/:bug/donated", requireAuth, async (req, res) => {
    const { bug } = req.params;
    try {
        const log = await logDonation(req.user.id, bug);
        res.status(201).json({
            log: log
        });
    } catch (err) {
        console.error("Logging error: ", err);
        res.status(500).json({ error: "Server error." });
    }
});

// DELETE /api/bugs/:bug/undonated
// Delete record that user has donated a specific bug
router.delete("/:bug/undonated", requireAuth, async (req, res) => {
    const { bug } = req.params;
    try {
        await deleteDonation(req.user.id, bug);
        res.status(201).json({
            log: "Success"
        });
    } catch (err) {
        console.error("Deletion error: ", err);
        res.status(500).json({ error: "Server error." });
    }
});

export default router;