import nodemailer from 'nodemailer';
import mailConfig from '../config/mail'
import { resolve} from "path";
import handlebars from 'express-handlebars'
import nodemailerhbs from 'nodemailer-express-handlebars'

class Mail {
    constructor() {
        const {host, port, secure, auth} = mailConfig;
        this.transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: auth.user ? auth : null
        })
        // this.configureTemplates();
    }

    sendMail(message) {
        return this.transporter.sendMail({
            ...mailConfig.default,
            ...message
        })
    }

    configureTemplates(){
        const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');
        this.transporter.use('compile', nodemailerhbs({
            viewEngine: handlebars.create({
                layoutsDir: resolve(viewPath, 'layouts'),
                partialsDir: resolve(viewPath, 'partials'),
                defaultLayout: 'default',
                extname: '.hbs'
            }),
            viewPath,
            extName: '.hbs'
        }));
    }
}

export default new Mail();
