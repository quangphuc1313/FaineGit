import express from 'express';
import * as emailController from '../controllers/emailController';

const router = express.Router();

// Create a new email
router.post('/emails', emailController.createEmail);

// Get all emails
router.get('/emails', emailController.getAllEmails);

// Get a specific email by ID
router.get('/emails/:id', emailController.getEmailById);

// Update an email by ID
router.put('/emails/:id', emailController.updateEmailById);

// Delete an email by ID
router.delete('/emails/:id', emailController.deleteEmailById);

export default router;
