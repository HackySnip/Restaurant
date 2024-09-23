import { client, sender } from "./mailtrap";
import {
  generatePasswordResetEmailHtml,
  generateResetSuccessEmailHtml,
  generateWelcomeEmailHtml,
  htmlContent,
} from "./htmlEmail";

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
) => {
  const recipients = [{ email }];

  try {
    const res = await client.send({
      from: sender,
      to: recipients,
      html: htmlContent.replace("{verificationToken}", verificationToken),
      subject: "Verify your email",
      category: "Email Verification",
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send email verification");
  }
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  const recipients = [{ email }];
  const htmlContent = generateWelcomeEmailHtml(name);
  try {
    const res = await client.send({
      from: sender,
      to: recipients,
      html: htmlContent,
      subject: "Welcome to Rushi Eats",
      template_variables: {
        company_info_name: "Rushi Eats",
        name: name,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send welcome email");
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  resetUrl: string
) => {
  const recipients = [{ email }];
  const htmlContent = generatePasswordResetEmailHtml(resetUrl);
  try {
    const res = await client.send({
      from: sender,
      to: recipients,
      html: htmlContent,
      subject: "Reset your password",
      category: "Reset Password",
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send reset password email");
  }
};

export const sendResetSuccessEmail = async (email: string) => {
  const recipients = [{ email }];
  const htmlContent = generateResetSuccessEmailHtml();

  try {
    const res = await client.send({
      from: sender,
      to: recipients,
      html: htmlContent,
      subject: "Password reset successfully",
      category: "Password Reset",
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send password reset success email");
  }
};
