const nodemailer = require('nodemailer');

const handleContact = async (req, res) => {
    const { firstname, lastname, email, message } = req.body;

    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      secureConnection: false,
      port: 587,
      auth: {
        user: 'myfitnessfinalproject@outlook.com',
        pass: 'MyFitEmail'
      }
    });

  let mailOptions = {
    from: 'myfitnessfinalproject@outlook.com',
    to: 'myfitnessfinalproject@outlook.com',
    subject: 'Contact Us',
    text: `Name: ${firstname} ${lastname}\nEmail: ${email}\n\nMessage: ${message}`
  };
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
}

module.exports = {
    handleContact
};