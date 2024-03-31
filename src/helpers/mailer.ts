import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: { email: string, emailType: string, userId: string }) => {
  try {
      // configure mail for usage
      const hashedToken = await bcrypt.hash(userId.toString(), 10);
      let actionText, actionUrl;
      if (emailType === 'VERIFY') {
          actionText = "Verify your email";
          actionUrl = `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`;
          await User.findByIdAndUpdate(userId,
              { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 });
      } else if (emailType === 'RESET') {
          actionText = "Reset your password";
          actionUrl = `${process.env.DOMAIN}/resetpassword?token=${hashedToken}`;
          await User.findByIdAndUpdate(userId,
              { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 });
      }

      const transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
              user: "247532123226f5",
              pass: "fadc5ac2d95aaf"
          }
      });

      const mailOptions = {
          from: 'apoorva@apoorva.ai',
          to: email,
          subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
          html: `<p> Click <a href="${actionUrl}"> here </a> to ${actionText} or copy and paste the link below in your browser.
          <br> ${actionUrl}
          </p>`,
      }

      const mailResponse = await transport.sendMail(mailOptions);
      return mailResponse;
  } catch (error: any) {
      throw new Error(error.message);
  }
}
