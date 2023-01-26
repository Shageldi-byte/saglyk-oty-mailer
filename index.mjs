import cors from "cors";
import express from "express";
import fs from "fs";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const server=app.listen(6425, () => {
    console.log(`listening on port 6425`);
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
    auth: {
        user: 'saglykotyquestioncenter@gmail.com',
        pass: 'nxtrseyszcdbarmn'
    }
});

app.post('/send-mail', (req, res) => {
    let mailOptions = {
        from: 'saglykotyquestioncenter@gmail.com',
        to: 'saglykoty@gmail.com',
        subject: `Ulanyjy ${req.body.username}-den täze hat geldi`,
        html: `
        <h4>Ulanyjy ${req.body.username}, Elektron poçtasy ${req.body.email}</h4>
        <p>${req.body.text}</p>
        <h5><i>Saglyk oty sorag-jogap merkezi</i></h5>`
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.sendStatus(500);
        } else {
          res.send("Sent");
        }
      });
})
