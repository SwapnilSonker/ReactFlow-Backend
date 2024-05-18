import { configDotenv } from "dotenv";
import nodemailer from "nodemailer";


configDotenv()
export const sendEmail = async (to, subject, body) => {

  const password = process.env.password

  try {
    let transporter = nodemailer.createTransport(
        {
            service:"gmail",
            host: 'smtp.gmail.com',
            port: 587, 
            secure: false,
            auth:{
                user: "swapnilsonker04@gmail.com",
                pass: password,
            },
        }
    )

    let info = await transporter.sendMail({
        from : "swapnilsonker04@gmail.com",
        to: to,
        subject: subject,
        text: body
    })

    console.log('Email sent: %s' , info?.messageId);
    return info.messageId

  } catch (error) {
    console.log("Error sending email :", error.message)
    throw new Error('Failed to send Email');

  }
};
