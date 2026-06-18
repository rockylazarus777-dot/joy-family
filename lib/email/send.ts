import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  return transporter;
}

export async function sendNotificationEmail(subject: string, html: string) {
  const from = process.env.NOTIFICATION_FROM_EMAIL ?? process.env.SMTP_USER;
  const to = process.env.NOTIFICATION_TO_EMAIL;

  if (!process.env.SMTP_HOST || !to) {
    console.warn("[email] SMTP not configured — skipping email send. Subject:", subject);
    return { skipped: true };
  }

  const transport = getTransporter();
  await transport.sendMail({ from, to, subject, html });
  return { skipped: false };
}
