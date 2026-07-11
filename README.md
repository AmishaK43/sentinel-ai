# 🚨 Sentinel AI

> AI-Powered Incident Commander for Slack

Sentinel AI is an intelligent incident response assistant that helps engineering teams detect, investigate, manage, and resolve production incidents directly within Slack using Large Language Models (LLMs).

Built for modern DevOps and Site Reliability Engineering (SRE) workflows.

---

## 📌 Problem Statement

Production incidents require engineers to manually:

- Detect issues
- Collect investigation details
- Coordinate responders
- Check recent deployments
- Maintain incident timelines
- Write postmortems

This process is repetitive, slow, and error-prone.

---

## 💡 Our Solution

Sentinel AI automates the complete incident response lifecycle by combining AI, Slack, and GitHub.

From a single Slack message, Sentinel AI can:

- Detect incidents using AI
- Guide responders through an investigation
- Create an incident workspace
- Analyze recent GitHub deployments
- Notify responders
- Track the investigation timeline
- Resolve incidents
- Generate AI-powered postmortems

---

# ✨ Features

## 🤖 AI Incident Detection

- Detects production incidents
- Identifies affected service
- Classifies severity
- Uses Groq Llama 3.3 70B

---

## 🔍 AI Investigation

Interactive Slack workflow:

- Environment selection
- Deployment confirmation
- Customer impact analysis
- AI-generated investigation summary

---

## 🚨 Incident Workspace

- Incident ID generation
- Automatic owner assignment
- Dynamic priority
- Status tracking
- Environment information

---

## 📂 GitHub Investigation

- Fetch latest commits
- Commit metadata
- Deployment assessment
- Direct GitHub links

---

## 📢 Team Collaboration

- Slack Block Kit UI
- Interactive buttons
- Team notifications
- Incident timeline

---

## ✅ Resolution

- Resolve incidents
- Calculate duration
- Timeline updates

---

## 📝 AI Postmortem

Automatically generates:

- Executive Summary
- Root Cause
- Business Impact
- Resolution
- Lessons Learned
- Action Items

---

# 🏗️ Architecture

![Architecture](docs/architecture.png)

---

# 🔄 Workflow

```text
User reports incident
        │
        ▼
🤖 AI Detection
        │
        ▼
🔍 Investigation
        │
        ▼
🚨 Create Incident
        │
        ▼
📂 GitHub Investigation
        │
        ▼
📢 Notify Team
        │
        ▼
📋 Timeline
        │
        ▼
✅ Resolve Incident
        │
        ▼
📝 AI Postmortem
```

---

# 📸 Screenshots

## AI Detection

*(Insert screenshot)*

---

## Investigation Workflow

*(Insert screenshot)*

---

## Incident Workspace

*(Insert screenshot)*

---

## GitHub Investigation

*(Insert screenshot)*

---

## Timeline

*(Insert screenshot)*

---

## AI Postmortem

*(Insert screenshot)*

---

# 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Backend | Node.js |
| AI | Groq API (Llama 3.3 70B) |
| Slack | Slack Bolt SDK |
| GitHub | GitHub REST API |
| UI | Slack Block Kit |
| Language | JavaScript |

---

# 📂 Project Structure

```text
src/
│
├── actions/
├── commands/
├── config/
├── database/
├── events/
├── prompts/
├── services/
│   ├── ai/
│   ├── github/
│   ├── incident/
│   └── slack/
│
├── app.js
└── index.js
```

---

# 🚀 Installation

```bash
git clone https://github.com/AmishaK43/sentinel-ai.git

cd sentinel-ai

npm install

npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file:

```env
SLACK_BOT_TOKEN=your_token
SLACK_APP_TOKEN=your_token
SLACK_SIGNING_SECRET=your_secret
GROQ_API_KEY=your_key
```

---

# 🌟 Future Enhancements

- PagerDuty Integration
- Jira Ticket Creation
- ServiceNow Integration
- Grafana Integration
- Datadog Integration
- Multi-channel Incident Support
- AI Auto Remediation

---

# 👩‍💻 Author

**Amisha Kumari**

Built with ❤️ using Slack, Groq AI, GitHub API and Node.js.

---

# ⭐ Support

If you found this project interesting, consider giving it a ⭐ on GitHub.