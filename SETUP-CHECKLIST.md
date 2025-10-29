# ✅ Setup Checklist - Helo I'm AI

## 🎯 Configuration Complete - Action Items

---

## ✅ Already Done

- [x] Created central configuration (`/js/config.js`)
- [x] Updated all API clients to use config
- [x] Fixed Ollama endpoints for AI Twins
- [x] Set admin email to heloimai@helo-im.ai
- [x] Updated backend Ollama service
- [x] Fixed all hardcoded URLs
- [x] Created comprehensive documentation

---

## ⚠️ Action Required (You Need To Do)

### 1. **Formspree Email Setup** (5 minutes)

- [ ] Go to https://formspree.io
- [ ] Sign up / Log in
- [ ] Click "New Form"
- [ ] Set email to: `heloimai@helo-im.ai`
- [ ] Copy your form ID (looks like: `xpznabcd`)
- [ ] Open `/js/config.js`
- [ ] Replace `YOUR_FORM_ID` with your actual ID:
  ```javascript
  formspree: 'https://formspree.io/f/xpznabcd'
  ```
- [ ] Save file

### 2. **Ollama Setup** (10 minutes)

- [ ] Install Ollama:
  ```bash
  curl https://ollama.ai/install.sh | sh
  ```
- [ ] Start Ollama service:
  ```bash
  ollama serve
  ```
- [ ] Pull AI models (in new terminal):
  ```bash
  ollama pull llama2
  ollama pull mistral
  ollama pull codellama
  ```
- [ ] Verify it's running:
  ```bash
  curl http://localhost:11434/api/tags
  ```

### 3. **Backend Setup** (5 minutes)

- [ ] Navigate to backend:
  ```bash
  cd backend
  ```
- [ ] Copy environment file:
  ```bash
  cp .env.example .env
  ```
- [ ] Install dependencies:
  ```bash
  npm install
  ```
- [ ] Start development server:
  ```bash
  npm run dev
  ```
- [ ] Verify it's running (should see "Server running on port 3000")

### 4. **Test Everything** (5 minutes)

- [ ] Open your website in browser
- [ ] Open browser console (F12)
- [ ] Test config is loaded:
  ```javascript
  console.log(window.CONFIG)
  ```
- [ ] Test AI Twins:
  ```javascript
  const client = new AITwinsClient();
  client.chat('llama2', 'Hello!').then(console.log);
  ```
- [ ] Test email (after Formspree setup):
  ```javascript
  window.sendEmailNotification({
      to: 'heloimai@helo-im.ai',
      subject: 'Test Email',
      message: 'Testing email system'
  });
  ```
- [ ] Check heloimai@helo-im.ai inbox for test email

---

## 🚀 Production Deployment (When Ready)

### Pre-Deployment Checklist:

- [ ] Formspree form ID configured
- [ ] All tests passing locally
- [ ] Backend builds successfully (`npm run build`)
- [ ] Environment variables set on production server
- [ ] SSL certificate installed (HTTPS)
- [ ] Domain DNS pointing to server
- [ ] Nginx/Apache configured for reverse proxy

### Deployment Steps:

1. **Backend Deployment:**
   ```bash
   cd backend
   npm run build
   
   # On production server:
   export OLLAMA_HOST=http://localhost:11434
   export PORT=3000
   export FRONTEND_URL=https://helo-im.ai
   
   npm start
   ```

2. **Frontend Deployment:**
   - Upload all files to web server
   - Ensure `/js/config.js` is loaded first
   - Test in production environment

3. **Verify Production:**
   - [ ] Website loads correctly
   - [ ] AI Twins chat works
   - [ ] Email notifications work
   - [ ] No console errors
   - [ ] HTTPS working

---

## 📊 System Requirements

### Development:
- Node.js 18+ 
- npm 9+
- Ollama installed
- 8GB RAM minimum
- 10GB free disk space

### Production:
- Linux server (Ubuntu 20.04+ recommended)
- Node.js 18+
- Nginx or Apache
- SSL certificate
- 16GB RAM recommended
- 50GB free disk space

---

## 🆘 Troubleshooting

### Ollama Won't Start:
```bash
# Check if already running
ps aux | grep ollama

# Kill existing process
killall ollama

# Start fresh
ollama serve
```

### Backend Won't Start:
```bash
# Check port 3000 is free
lsof -i :3000

# Kill process using port
kill -9 <PID>

# Try again
npm run dev
```

### Frontend Can't Connect:
1. Check browser console for errors
2. Verify config.js is loaded: `console.log(window.CONFIG)`
3. Check backend is running: `curl http://localhost:3000`
4. Check CORS settings in backend

### Email Not Sending:
1. Verify Formspree form ID is correct
2. Check browser network tab for failed requests
3. Verify email address in Formspree dashboard
4. Check Formspree submission limit (50/month free)

---

## 📞 Support

**Email**: heloimai@helo-im.ai

**Documentation**:
- `API-CONFIGURATION-GUIDE.md` - Full setup guide
- `CONFIGURATION-SUMMARY.md` - Quick overview
- `EMAIL-SETUP-GUIDE.md` - Email configuration

---

## 🎉 Success Criteria

You'll know everything is working when:

✅ Ollama responds to chat requests
✅ Backend API returns responses
✅ Email notifications arrive at heloimai@helo-im.ai
✅ No console errors in browser
✅ All API clients use correct endpoints
✅ Environment auto-detection works

---

**Estimated Total Setup Time**: 25 minutes

**Status**: Ready for setup
**Last Updated**: January 2025
