import config from "@/config"
import nodemailer, { SendMailOptions, Transporter } from "nodemailer"

let transporter: Transporter

function createTransporter(): Transporter {
  if (config.nodeEnv === "development") {
    return nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: config.MAILTRAP.user,
        pass: config.MAILTRAP.pass,
      },
    })
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.GOOGLE.user,
      pass: config.GOOGLE.pass,
    },
  })
}

function getTransporter(): Transporter {
  if (!transporter) {
    transporter = createTransporter()
  }
  return transporter
}

async function sendMail({ from, to, html, subject, ...rest }: SendMailOptions) {
  const result = await getTransporter().sendMail({
    from,
    to,
    subject,
    html,
    ...rest,
  })
  return result
}

export default sendMail
