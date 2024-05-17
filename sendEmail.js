import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, body) => {
  try {
    let transporter = nodemailer.createTransport(
        {
            host: 'smtp.gmail.com',
            port: 587, 
            secure: false,
            auth:{
                user: "swapnilsonker04@gmail.com",
                pass: "Swapnil@official04",
            },
        }
    )

    let info = await transporter.sendMail({
        from : "sonkerswapnildev@gmail.com",
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
