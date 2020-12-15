import nodemailer from 'nodemailer';
import { Message } from "./message";

interface mailOptions {
    from: string,
    to: string,
    subject: string,
    text: string
}

export class EmailSender {

    private readonly email: string
    private transporter: any


    constructor(email: string, password: string) {
        this.email = email;
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: email,
                pass: password
            }
        });
    }

    sendMail(msg: Message | null) {
        if (!msg) return
        const mailOptions = {
            from: this.email,
            to: msg.to,
            subject: msg.subject,
            content: msg.content
        }
        this.transporter.sendMail(mailOptions, function(error: any, info: any){
            if (error) {
                console.log(error);
            } else {
                console.log('Email Sent: ' + info.response);
            }
        });
    }
}