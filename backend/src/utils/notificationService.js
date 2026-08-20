import axios from 'axios';

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'support@begaindia.org';
const SENDER_NAME = 'BEGA INDIA Secretariat';

// @desc Send Membership Confirmation Email via Brevo API
export const sendMembershipEmail = async ({
  toEmail,
  fullName,
  companyName,
  applicationNumber,
  membershipPlan,
}) => {
  try {
    if (!BREVO_API_KEY) {
      console.warn('[Notification] BREVO_API_KEY not configured. Email skipped.');
      return { success: false, message: 'BREVO_API_KEY is not defined' };
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

    const payload = {
      sender: {
        name: SENDER_NAME,
        email: SENDER_EMAIL,
      },
      to: [
        {
          email: toEmail,
          name: fullName,
        },
      ],
      subject: `Official Membership Confirmation — ${applicationNumber} | BEGA INDIA`,
      htmlContent,
    };

    const response = await axios.post(BREVO_API_URL, payload, {
      headers: {
        accept: 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
      },
    });

    return { success: true, messageId: response.data?.messageId };
  } catch (error) {
    console.error('Brevo API Error:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};