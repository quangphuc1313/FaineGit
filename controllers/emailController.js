import Email from '../models/email';

// Controller to create a new email
export const createEmail = async (req, res) => {
    try {
        const { email, name, phone, clubs, time } = req.body;
        const newEmail = new Email({ email, name, phone, clubs, time });
        const savedEmail = await newEmail.save();

        res.status(201).json(savedEmail);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller to get all emails
export const getAllEmails = async (req, res) => {
    try {
        const emails = await Email.find();
        res.status(200).json(emails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller to get a specific email by ID
export const getEmailById = async (req, res) => {
    try {
        const { id } = req.params;
        const email = await Email.findById(id);

        if (!email) {
            return res.status(404).json({ message: 'Email not found' });
        }

        res.status(200).json(email);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller to update an email by ID
export const updateEmailById = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, name, phone, clubs, time } = req.body;

        const updatedEmail = await Email.findByIdAndUpdate(
            id,
            { email, name, phone, clubs, time },
            { new: true }
        );

        if (!updatedEmail) {
            return res.status(404).json({ message: 'Email not found' });
        }

        res.status(200).json(updatedEmail);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller to delete an email by ID
export const deleteEmailById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEmail = await Email.findByIdAndRemove(id);

        if (!deletedEmail) {
            return res.status(404).json({ message: 'Email not found' });
        }

        res.status(200).json({ message: 'Email deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
