const nodemailer = require('nodemailer')


const sendEmail = async(options)=>{



    let transporter = nodemailer.createTransport({
  
        
      host:"smtp-mail.outlook.com",
      port:587,
            service:"hotmail",
        auth: {
          user:"passwordReset921@hotmail.com",

          pass:"passwordReset@921",
        },
      });


      const mailOptions = ({
          from:"passwordReset921@hotmail.com",
          to:options.email,
          subject:options.subject,
         text:options.message
      })
    

      await transporter.sendMail(mailOptions)

}


module.exports = sendEmail