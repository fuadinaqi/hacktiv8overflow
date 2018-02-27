function sendEmail (user) {
    const nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
      service : 'gmail',
      secure  : false,
      port    : 5432,
      auth    : {
        user: 'sportshubfuadhi@gmail.com',
        pass: 'fuadhiarta'
      },
      tls:{
        rejectUnauthorized: false
      }
    })

    let HelperOptions = {
      from    : "Naqi-overflow" <'sportshubfuadhi@gmail.com',
      to      : 'fuadinaqi@aisifoundation.org',
      subject : "Thanks for sign up to naqi-overflow",
      text    : `
    Please enjoy!
    `
    };

    transporter.sendMail(HelperOptions, (err, info)=>{
      if(err){
         return console.log(err);
      } else {
        console.log("The message was sent!");
        console.log(info);
      }
    })
  }

module.exports = sendEmail
