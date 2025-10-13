import express from 'express';
import ContactMessage from '../models/ContactMessage.js';

const router = express.Router();

// Submit contact form
router.post('/submit', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Please enter a valid email address'
      });
    }

    // Create contact message
    const contactMessage = new ContactMessage({
      name,
      email,
      subject,
      message
    });

    await contactMessage.save();

    res.status(201).json({
      message: 'Thank you for your message! We will get back to you soon.',
      success: true
    });

  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({
      message: 'Failed to send message. Please try again later.',
      success: false
    });
  }
});

// Get all contact messages (admin only)
router.get('/all', async (req, res) => {
  try {
    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({
      message: 'Failed to fetch messages',
      success: false
    });
  }
});

// Mark message as read
router.put('/:id/read', async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status: 'read' },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        message: 'Message not found',
        success: false
      });
    }

    res.json({
      message: 'Message marked as read',
      success: true,
      message
    });
  } catch (error) {
    console.error('Error marking message as read:', error);
    res.status(500).json({
      message: 'Failed to update message status',
      success: false
    });
  }
});

// Respond to message
router.put('/:id/respond', async (req, res) => {
  try {
    const { response } = req.body;

    if (!response) {
      return res.status(400).json({
        message: 'Response is required',
        success: false
      });
    }

    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      {
        status: 'responded',
        respondedAt: new Date(),
        response
      },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        message: 'Message not found',
        success: false
      });
    }

    // Here you could also send an email to the user
    // await sendEmail(message.email, 'Re: ' + message.subject, response);

    res.json({
      message: 'Response sent successfully',
      success: true,
      message
    });
  } catch (error) {
    console.error('Error responding to message:', error);
    res.status(500).json({
      message: 'Failed to send response',
      success: false
    });
  }
});

export default router;
