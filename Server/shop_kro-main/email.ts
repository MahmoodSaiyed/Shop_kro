import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';

const app = express();
const port = 9000;


// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to handle sending emails
app.post('/sendEmail', async (req: Request, res: Response) => {
    const { email, name, subject, message, phone } = req.body;

    try {
        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'mahmoodsaiyed1@gmail.com', // Your Gmail email address
                pass: 'm1.2s3a4i5y6e7d8' // Your Gmail password (or app-specific password)
            }
        });

        // Construct the email options
        const mailOptions = {
            from: 'mahmoood.saiyed@nntsoftware.in', // Sender address
            to: 'mahmood61saiyed@gmail.com', // Recipient address (change as needed)
            subject: subject,
            text: `
                Name: ${name}\n
                Email: ${email}\n
                Phone: ${phone}\n
                Message: ${message}
            `
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        console.log('Email sent:', info);

        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
