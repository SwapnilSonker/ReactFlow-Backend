// import { Agenda, Job } from "@hokify/agenda";
// import mongoose from "mongoose";
// import { ConnectDB } from "./data/database.js";

// // const mongoConnectionString = 'mongodb://127.0.0.1/agenda';
// const mongoConnectionString = 'mongodb+srv://swapnilsonker04:7fHxccXugdRKRx5g@cluster0.ztffk6e.mongodb.net/?retryWrites=true'
// mongoose.connect(mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('Connected to MongoDB');
//     })
//     .catch((error) => {
//         console.error('Error connecting to MongoDB:', error.message);
//     });


// export const agenda = new Agenda({db: {address: mongoConnectionString , collection:'agendaJobs'}});

// // const agendajobs = mongoose.connnection.db.collection('agendaJobs').find().toArray();
// console.log("agenda" , agenda);

// agenda.define('sendEmail' , async job => {
//     const {to , subject , body} = job?.attrs?.data;
// })

// await agenda.start()

// await agenda.every('2 seconds' , 'welcome')

// async function graceful() {
//     await agenda.stop();
//     process.exit(0);
// }

// process.on("SIGTERM" , graceful)
// process.on("SIGINT" , graceful)

// agendaSetup.js
import { Agenda } from '@hokify/agenda';
import { sendEmail } from './sendEmail.js';
import { ConnectDB } from './data/database.js';

const setupAgenda = async () => {
    await ConnectDB; // Connect to MongoDB

    const mongoConnectionString = 'mongodb+srv://swapnilsonker04:7fHxccXugdRKRx5g@cluster0.ztffk6e.mongodb.net/myDatabase?retryWrites=true';
    const agenda = new Agenda({ db: { address: mongoConnectionString, collection: 'agendaJobs' } });

    // Define a job to send email
    agenda.define('sendEmailJob', async job => {
        const { to, subject, body } = job.attrs.data;
        try {
            await sendEmail(to, subject, body);
            console.log(`Email sent to ${to} with subject: ${subject}`);
        } catch (error) {
            console.error('Failed to send email:', error.message);
        }
    });

    // Start agenda when ready
    agenda.on('ready', async () => {
        console.log('Agenda is ready');
        await agenda.start();
    });

    return agenda;
};

export default setupAgenda;
