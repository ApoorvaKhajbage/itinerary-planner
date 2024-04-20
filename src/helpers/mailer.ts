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
              { $set: {
                 verifyToken: hashedToken,
                 verifyTokenExpiry: Date.now() + 3600000 
              }
                
                });
      } else if (emailType === 'RESET') {
          actionText = "Reset your password";
          actionUrl = `${process.env.DOMAIN}/resetpassword?token=${hashedToken}`;
          await User.findByIdAndUpdate(userId,
            { 
                $set:{
                    forgotPasswordToken: hashedToken, 
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
                 }
            );
      }

      const transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
              user: "247532123226f5",
              pass: "fadc5ac2d95aaf"
          }
      });

    //   const mailOptions = {
    //       from: 'apoorva@apoorva.ai',
    //       to: email,
    //       subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
    //       html: `<p> Click <a href="${actionUrl}"> here </a> to ${actionText} or copy and paste the link below in your browser.
    //       <br> ${actionUrl}
    //       </p>`,
    //   }
    const mailOptions = {
        from: 'apoorva@apoorva.ai',
        to: email,
        subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
        html: `
          <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: none; background-color: #f4f4f4;">
            <tr>
              <td style="padding: 20px;">
                <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: none; background-color: #ffffff; width: 100%; max-width: 600px; margin: 0 auto;">
                  <tr>
                    <td style="padding: 30px; text-align: center;">
                      <h1 style="margin: 0; font-family: Arial, sans-serif; font-size: 24px;color:indigo">Explore Ease</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 30px; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5;">
                      <h2 style="margin-top: 0;">${emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password'}</h2>
                      <p>Click the button below to ${actionText} or copy and paste the link in your browser:</p>
                      <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: none;">
                        <tr>
                          <td style="padding: 10px 0;">
                            <a href="${actionUrl}" style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">
                              ${actionText}
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0;">
                            <p style="margin: 0; color:blue;">${actionUrl}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px; text-align: center; font-family: Arial, sans-serif; font-size: 14px; color: #666666;">
                      <p style="margin: 0;">This email was sent by Explore Ease.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        `,
      };

      const mailResponse = await transport.sendMail(mailOptions);
      return mailResponse;
  } catch (error: any) {
      throw new Error(error.message);
  }
}
