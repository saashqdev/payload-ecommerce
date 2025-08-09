import nodemailer from "nodemailer";

import { getCachedGlobal } from "./getGlobals";

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

type EmailResponse = {
  success: boolean;
  messageId: string;
};

const createEmailTransporter = async () => {
  const { smtp } = await getCachedGlobal("emailMessages", "en", 1)();

  const { host, fromEmail, password, port, secure, user } = smtp ?? {};

  return {
    transporter: nodemailer.createTransport({
      host: host ?? process.env.SMTP_HOST,
      port: Number(port ?? 587),
      secure: secure ?? false,
      auth: { user: user ?? process.env.SMTP_USER, pass: password ?? process.env.SMTP_PASS },
    }),
    fromEmail: fromEmail ?? process.env.SMTP_USER,
  };
};

export const sendEmail = async ({ to, subject, html }: EmailPayload): Promise<EmailResponse> => {
  const { transporter, fromEmail } = await createEmailTransporter();

  try {
    const { messageId } = await transporter.sendMail({
      from: fromEmail,
      to,
      subject,
      html,
    });

    return { success: true, messageId };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown email error";
    throw new Error(`Failed to send email: ${errorMessage}`);
  }
};
