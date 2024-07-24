import nodemailer from 'nodemailer'
const { SMTP_MAIL, SMTP_PASSWORD } = process.env

const sendMail = async (email, mailSubject, content) => {
  try {
    const transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: SMTP_MAIL,
        pass: SMTP_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }

    })
    const mailOptions = {
      from: SMTP_MAIL,
      to: email,
      subject: mailSubject,
      html: content
    }
   
    // Send the email
    const info = await transport.sendMail(mailOptions);
    console.log('Mail sent successfully:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending mail:', error.message);
    throw error;
  
  }

}
export default sendMail