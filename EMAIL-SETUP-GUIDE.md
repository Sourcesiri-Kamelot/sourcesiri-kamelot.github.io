# 📧 Email Setup Guide for Helo I'm AI

## Admin Email Configuration
**Primary Email:** heloimai@helo-im.ai

---

## ✅ What's Been Implemented

### 1. **Consent Popup**
- Appears when users sign up (not on login)
- Requires privacy policy acceptance
- Optional marketing opt-in checkbox
- Users can't proceed without accepting privacy policy

### 2. **Email Notifications**
- New user registrations sent to: **heloimai@helo-im.ai**
- Includes: Name, Email, Marketing Consent status, Timestamp
- Automated on every new signup

### 3. **Privacy Policy**
- Created at `/privacy-policy.html`
- Linked in consent popup
- Explains data usage and marketing communications

---

## 🚀 Setup Instructions

### Option 1: Formspree (Recommended - Free & Easy)

1. **Sign up at [Formspree.io](https://formspree.io)**
   - Free tier: 50 submissions/month
   - Paid tier: Unlimited submissions

2. **Create a new form**
   - Set email to: `heloimai@helo-im.ai`
   - Copy your form ID (looks like: `xpznabcd`)

3. **Update the code**
   - Open `js/email-config.js`
   - Replace `YOUR_FORM_ID` with your actual Formspree ID:
   ```javascript
   formspreeEndpoint: 'https://formspree.io/f/xpznabcd'
   ```

4. **Test it**
   - Create a test account
   - Check heloimai@helo-im.ai for the notification

---

### Option 2: EmailJS (Alternative)

1. **Sign up at [EmailJS.com](https://www.emailjs.com)**
2. **Create email service** (Gmail, Outlook, etc.)
3. **Create email template**
4. **Update `js/email-config.js`** with EmailJS credentials

---

### Option 3: Custom Backend

If you want full control, set up a backend API:
- Node.js + Nodemailer
- Python + SendGrid
- PHP mail() function

---

## 📊 What Gets Collected

### On User Signup:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "privacyConsent": true,
  "marketingConsent": true,
  "timestamp": "2025-01-28T10:30:00Z"
}
```

### Email Sent to heloimai@helo-im.ai:
```
Subject: 🎉 New User: John Doe

New User Registration
Name: John Doe
Email: john@example.com
Marketing Consent: ✅ Yes
Registered: 1/28/2025, 10:30:00 AM

✉️ This user opted in for marketing emails!
```

---

## 🎯 Marketing Automation

### Users Who Opt-In Get:
- Product updates
- New feature announcements
- Exclusive promotions
- AI industry insights
- Community event invitations

### Recommended Tools:
1. **Mailchimp** - Free up to 500 contacts
2. **SendGrid** - 100 emails/day free
3. **ConvertKit** - Creator-focused
4. **Brevo (Sendinblue)** - 300 emails/day free

---

## 🔒 Privacy & Compliance

### GDPR Compliant:
- ✅ Explicit consent required
- ✅ Clear privacy policy
- ✅ Easy opt-out mechanism
- ✅ Data protection measures

### CAN-SPAM Compliant:
- ✅ Unsubscribe link in emails
- ✅ Physical address in footer
- ✅ Honest subject lines
- ✅ Prompt opt-out processing

---

## 🧪 Testing Checklist

- [ ] Sign up with test email
- [ ] Verify consent popup appears
- [ ] Check privacy policy link works
- [ ] Confirm email sent to heloimai@helo-im.ai
- [ ] Test marketing opt-in checkbox
- [ ] Test decline button
- [ ] Verify can't proceed without privacy consent

---

## 📝 Next Steps

1. **Set up Formspree** (5 minutes)
2. **Test signup flow** (2 minutes)
3. **Configure email marketing tool** (15 minutes)
4. **Create welcome email sequence** (30 minutes)
5. **Set up automated campaigns** (1 hour)

---

## 💡 Pro Tips

- **Segment your list**: Separate free vs paid users
- **A/B test subject lines**: Improve open rates
- **Send value first**: Don't just promote, educate
- **Monitor metrics**: Track opens, clicks, conversions
- **Clean your list**: Remove inactive subscribers quarterly

---

## 🆘 Support

Questions? Email: heloimai@helo-im.ai

---

**Last Updated:** January 2025
