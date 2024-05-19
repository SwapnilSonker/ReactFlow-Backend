import express from "express";
import { ConnectDB } from "./data/database.js";
import { config } from "dotenv";
import mongoose from "mongoose";
import setupAgenda from "./jobs.js";

const app = express();

config({
  path: "./data/config.env",
});

//using middlewares
app.use(express.json());
ConnectDB();
console.log("Database is connected to the app");

app.get("/log-agenda-jobs", async (req, res) => {
  try {
    const agendaJobs = await mongoose?.connection?.db
      ?.collection("agendaJobs")
      .find();
    console.log("Agenda Jobs:", agendaJobs);
    res.status(200).json(agendaJobs);
  } catch (error) {
    console.error("Error fetching agenda jobs:", error.message);
    res.status(500).json({ error: "Failed to fetch agenda jobs" });
  }
});

// Setingup Agenda
setupAgenda().then((agenda) => {

    app.post('/schedule-email', async (req, res) => {
        const { to, subject, body } = req.body;

        try {
            // Calculate the time 1 hour from now
            const now = new Date();
            const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000); // Adding 1 hour in milliseconds

            // Schedule the job to send email after 1 hour
            await agenda.schedule(oneHourLater, 'sendEmailJob', { to, subject, body });
            res.status(200).json({ message: 'Email scheduled successfully' });
        } catch (error) {
            console.error('Error scheduling email:', error.message);
            res.status(500).json({ error: 'Failed to schedule email' });
        }
    });

  app.listen(6001, () => {
    console.log(`Server is working in development mode in ${6001}`);
  });

  async function graceful() {
    await agenda.stop();
    process.exit(0);
  }

  process.on("SIGTERM", graceful);
  process.on("SIGINT", graceful);
});

export default app;

// app.post('/send-email', (req, res) => {
//     const { time, email_body, subject, email_address } = req.body;

//     if (!time || !email_body || !subject || !email_address) {
//         return res.status(400).json({ error: 'Missing required fields' });
//     }

//    console.log(`Time: ${time}`);
//     console.log(`Email Body: ${email_body}`);
//     console.log(`Subject: ${subject}`);
//     console.log(`Email Address: ${email_address}`);

//     res.status(200).json({ message: 'Email request received successfully' });
// });
