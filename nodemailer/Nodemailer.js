const nodemailer = require('nodemailer')


const sendEmail = async(options)=>{


console.log(12)
    let transporter = nodemailer.createTransport({
  
        
      host:"smtp-mail.outlook.com",
      port:587,
            service:"hotmail",
        auth: {
          user:"passwordReset921@hotmail.com",

          pass:"passwordReset@921",
        },
      });
console.log(23)

      const mailOptions = ({
          from:"passwordReset921@hotmail.com",
          to:options.email,
          subject:options.subject,
         text:options.message
      })
      console.log(34)

      await transporter.sendMail(mailOptions)
      console.log(45)

}


module.exports = sendEmail