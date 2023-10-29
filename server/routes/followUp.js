import express from 'express'

import { getFollowUp, getFollowUps, createFollowUp, deleteFollowUp, deleteWholeCollection, getFollowUpsStats, } from '../controllers/followUp.js'
import { verifyEmployee, verifyToken } from '../middleware/auth.js'

const router = express.Router()

// GET
router.get('/get/single/:followUpId', verifyToken, verifyEmployee, getFollowUp)
router.get('/get/all/:leadId', verifyToken, verifyEmployee, getFollowUps)
router.get('/get/stats', getFollowUpsStats)

// POST
router.post('/create', verifyToken, verifyEmployee, createFollowUp)

// DELETE
router.delete('/delete/:followUpId', verifyToken, verifyEmployee, deleteFollowUp)
router.delete('/delete-whole-collection', deleteWholeCollection)

export default router