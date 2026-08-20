import nodemailer from 'nodemailer';

// Configure SMTP Transporter (Using Gmail / Hostinger / SendGrid)
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || 'support@begaindia.org',
    pass: process.env.SMTP_PASS || '',
  },
});

// @desc Send Membership Confirmation Email with Digital ID Links
export const sendMembershipEmail = async ({
  toEmail,
  fullName,
  companyName,
  applicationNumber,
  membershipPlan,
}) => {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log(`[Notification Mock] Email dispatched to ${toEmail} with Member ID: ${applicationNumber}`);
      return { success: true, mocked: true };
    }

    const verificationUrl = `https://begaindia-platform.vercel.app/verify/${applicationNumber}`;
    const dashboardUrl = `https://begaindia-platform.vercel.app/dashboard/membership`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 24px; color: #1e293b;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden;">
          <div style="background-color: #0A3D91; padding: 20px; text-align: center; color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px; text-transform: uppercase;">BEGA INDIA</h2>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #fde047;">व्यवसाय सक्षमीकरण व विकास संघटना</p>
          </div>

          <div style="padding: 24px;">
            <h3 style="margin-top: 0; color: #0A3D91;">Membership Application Confirmed!</h3>
            <p style="font-size: 14px; line-height: 1.6;">
              Dear <strong>${fullName}</strong>, welcome to Maharashtra's premier business growth network. Your application for <strong>${companyName}</strong> has been processed successfully.
            </p>

            <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 16px; margin: 20px 0;">
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #64748b; font-weight: bold; text-transform: uppercase;">Official Member ID</p>
              <h2 style="margin: 0; font-family: monospace; color: #0A3D91; font-size: 22px;">${applicationNumber}</h2>
              <p style="margin: 8px 0 0 0; font-size: 13px; color: #334155;">Tier: <strong>${membershipPlan}</strong></p>
            </div>

            <div style="text-align: center; margin: 24px 0;">
              <a href="${dashboardUrl}" style="background-color: #F57C00; color: #ffffff; padding: 12px 24px; border-radius: 8px; font-weight: bold; text-decoration: none; display: inline-block; font-size: 14px;">
                Access Member Dashboard & Digital ID
              </a>
            </div>

            <p style="font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 16px;">
              Verify credentials instantly online: <a href="${verificationUrl}" style="color: #0A3D91;">${verificationUrl}</a>
            </p>
          </div>

          <div style="background-color: #0f172a; padding: 12px; text-align: center; color: #94a3b8; font-size: 11px;">
            Growth • Trust • Success | BEGA INDIA Head Office, Chhatrapati Sambhajinagar
          </div>
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"BEGA INDIA Secretariat" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: `Official Membership Confirmation — ${applicationNumber} | BEGA INDIA`,
      html: htmlContent,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email dispatch error:', error);
    return { success: false, error: error.message };
  }
};