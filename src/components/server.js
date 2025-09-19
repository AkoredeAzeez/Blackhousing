// server.js
import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(express.json());

const WAITLIST_FILE = './waitlist.json';

// Helper to save email
const saveEmail = (email) => {
  let emails = [];
  if (fs.existsSync(WAITLIST_FILE)) {
    emails = JSON.parse(fs.readFileSync(WAITLIST_FILE, 'utf-8'));
  }
  emails.push({ email, timestamp: new Date().toISOString() });
  fs.writeFileSync(WAITLIST_FILE, JSON.stringify(emails, null, 2));
};

app.post('/api/waitlist', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email required' });

  saveEmail(email);
  return res.json({ message: 'Email saved successfully' });
});

app.listen(5000, () => console.log('Server running on port 5000'));
