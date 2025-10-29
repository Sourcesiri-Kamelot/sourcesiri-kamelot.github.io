# 🔧 API Configuration Guide - Helo I'm AI

## ✅ Configuration Status

All API endpoints and URLs have been centralized in `/js/config.js`

---

## 📍 Current Configuration

### **Domain**
- Production: `https://helo-im.ai`
- Development: `http://localhost`

### **Backend API (Node.js + Express)**
- Development: `http://localhost:3000`
- Production: `https://helo-im.ai/api`

### **Ollama (AI Twins)**
- Development: `http://localhost:11434`
- Production: `https://helo-im.ai/ollama`
- Environment Variable: `OLLAMA_HOST`

### **Email**
- Admin: `heloimai@helo-im.ai`
- Formspree: `https://formspree.io/f/YOUR_FORM_ID` ⚠️ **NEEDS SETUP**

### **WebSocket Endpoints**
- Price Feed: `wss://helo-im.ai/ws/price-feed`
- Analytics: `wss://helo-im.ai/ws/analytics`

---

## 🚀 Setup Instructions

### 1. **Ollama Setup (AI Twins)**

#### Local Development:
```bash
# Install Ollama
curl https://ollama.ai/install.sh | sh

# Start Ollama service
ollama serve

# Pull AI models
ollama pull llama2
ollama pull mistral
ollama pull codellama

# Verify it's running
curl http://localhost:11434/api/tags
```

#### Backend Configuration:
```bash
cd backend
cp .env.example .env

# Edit .env file:
OLLAMA_HOST=http://localhost:11434
PORT=3000
FRONTEND_URL=https://helo-im.ai
```

#### Start Backend:
```bash
npm install
npm run dev
```

---

### 2. **Email Setup (Formspree)**

1. Go to [Formspree.io](https://formspree.io)
2. Sign up (free tier: 50 submissions/month)
3. Create a new form
4. Set email to: `heloimai@helo-im.ai`
5. Copy your form ID (e.g., `xpznabcd`)
6. Update `/js/config.js`:
   ```javascript
   email: {
       admin: 'heloimai@helo-im.ai',
       formspree: 'https://formspree.io/f/xpznabcd', // Your actual ID
   }
   ```

---

### 3. **Frontend Configuration**

The frontend automatically detects environment:
- **Development**: Uses `localhost:3000` for API
- **Production**: Uses `helo-im.ai/api` for API

No changes needed! Just load `/js/config.js` before other scripts:

```html
<script src="js/config.js"></script>
<script src="js/ai-twins-client.js"></script>
<script src="js/email-config.js"></script>
```

---

## 📁 Files Updated

### ✅ Configuration Files:
- `/js/config.js` - **NEW** Central configuration
- `/js/email-config.js` - Updated to use config.js
- `/backend/.env.example` - Ollama configuration

### ✅ API Clients:
- `/js/ai-twins-client.js` - Uses config.js
- `/js/ai-twins-client-legacy.js` - Uses config.js
- `/js/download-tracker.js` - Uses config.js
- `/js/real-time-analytics.js` - Uses config.js

### ✅ Backend:
- `/backend/src/services/OllamaService.ts` - Ollama integration
- `/backend/src/routes/aiTwinsRoutes.ts` - AI Twins API

---

## 🧪 Testing

### Test Ollama Connection:
```bash
# From backend directory
npm test

# Or manually test:
curl -X POST http://localhost:3000/api/v1/ai-twins/chat \
  -H "Content-Type: application/json" \
  -d '{"model":"llama2","prompt":"Hello, who are you?"}'
```

### Test Frontend:
```javascript
// Open browser console on your site
const client = new AITwinsClient();
client.chat('llama2', 'Hello!').then(console.log);
```

### Test Email:
```javascript
// Open browser console
window.sendEmailNotification({
    to: 'heloimai@helo-im.ai',
    subject: 'Test Email',
    message: 'This is a test'
});
```

---

## 🔒 Security Checklist

- [ ] Ollama is running on localhost (not exposed to internet)
- [ ] Backend API has CORS configured for helo-im.ai only
- [ ] Formspree form ID is configured
- [ ] No API keys in frontend code
- [ ] Environment variables set in backend/.env
- [ ] HTTPS enabled in production

---

## 🌐 Production Deployment

### Backend Deployment:
```bash
# Build backend
cd backend
npm run build

# Set environment variables on server:
export OLLAMA_HOST=http://localhost:11434
export PORT=3000
export FRONTEND_URL=https://helo-im.ai

# Start production server
npm start
```

### Nginx Configuration (for reverse proxy):
```nginx
# API endpoint
location /api/ {
    proxy_pass http://localhost:3000/;
}

# Ollama endpoint (optional, if exposing)
location /ollama/ {
    proxy_pass http://localhost:11434/;
}

# WebSocket endpoints
location /ws/ {
    proxy_pass http://localhost:3000/ws/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

---

## 📊 API Endpoints Reference

### AI Twins API:
```
POST /api/v1/ai-twins/chat
Body: { "model": "llama2", "prompt": "Hello", "stream": false }
Response: { "response": "Hi there!" }
```

### Analytics API:
```
POST /api/v1/analytics/download
Body: { "resource": "pitch-deck" }
Response: { "success": true }
```

---

## 🆘 Troubleshooting

### Ollama Not Connecting:
```bash
# Check if Ollama is running
ps aux | grep ollama

# Check port
lsof -i :11434

# Restart Ollama
killall ollama
ollama serve
```

### Backend Not Starting:
```bash
# Check logs
npm run dev

# Verify .env file exists
cat backend/.env

# Check port availability
lsof -i :3000
```

### Frontend Can't Connect:
1. Open browser console
2. Check for CORS errors
3. Verify config.js is loaded: `console.log(window.CONFIG)`
4. Test API manually: `fetch('http://localhost:3000/api/v1/ai-twins/chat')`

---

## 📞 Support

**Email**: heloimai@helo-im.ai

**Issues**: Check console logs and network tab in browser DevTools

---

**Last Updated**: January 2025
**Status**: ✅ All configurations centralized and ready for deployment
