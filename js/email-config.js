// Email Configuration for Helo I'm AI
// Admin email: heloimai@helo-im.ai
// NOTE: This file is deprecated - use js/config.js instead

const EMAIL_CONFIG = {
    adminEmail: window.CONFIG?.email?.admin || 'heloimai@helo-im.ai',
    formspreeEndpoint: window.CONFIG?.email?.formspree || 'https://formspree.io/f/YOUR_FORM_ID', // Replace with your Formspree ID
    
    // Email templates
    templates: {
        newUserRegistration: (userData) => ({
            to: EMAIL_CONFIG.adminEmail,
            subject: `🎉 New User: ${userData.name}`,
            html: `
                <h2>New User Registration</h2>
                <p><strong>Name:</strong> ${userData.name}</p>
                <p><strong>Email:</strong> ${userData.email}</p>
                <p><strong>Marketing Consent:</strong> ${userData.marketingConsent ? '✅ Yes' : '❌ No'}</p>
                <p><strong>Registered:</strong> ${new Date().toLocaleString()}</p>
                ${userData.marketingConsent ? '<p style="color: green;">✉️ This user opted in for marketing emails!</p>' : ''}
            `
        })
    }
};

// Send email notification
async function sendEmailNotification(emailData) {
    try {
        const response = await fetch(EMAIL_CONFIG.formspreeEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(emailData)
        });
        
        if (response.ok) {
            console.log('✅ Email sent successfully');
            return { success: true };
        } else {
            throw new Error('Email send failed');
        }
    } catch (error) {
        console.error('❌ Email error:', error);
        return { success: false, error };
    }
}

// Export for use in other scripts
window.emailConfig = EMAIL_CONFIG;
window.sendEmailNotification = sendEmailNotification;
