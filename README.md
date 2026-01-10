# Resumind — AI Resume Analyzer

A concise, production-ready resume analysis web app that helps job seekers get AI-powered feedback and ATS scoring for uploaded resumes.

---

## 🚀 Overview

**Resumind** analyzes an uploaded resume (PDF) using an AI model and returns a structured `Feedback` object with an overall score and section-specific recommendations:

- Tone & Style
- Content
- Structure
- Skills
- ATS suggestions

It stores uploaded files and metadata using a runtime-provided KV/file store and uses Puter.js for authentication, file ops, and AI calls.

## 🔍 Key Features

- Upload PDF resumes and convert them to preview images
- Persist resume metadata and analysis results in KV
- Generate AI-driven structured feedback (JSON) for multiple categories
- Visualize scores and detailed tips in an accordion UI
- Authentication and secure file access via Puter.js

---

## 📁 Data Model

Important types are defined in `types/index.d.ts`:

- Resume: `{ id, companyName, jobTitle, imagePath, resumePath, feedback }`
- Feedback: `{ overallScore, ATS, toneAndStyle, content, structure, skills }`
- Tip: `{ type: "good" | "improve", tip: string, explanation?: string }`

> Note: AI responses must be strict JSON matching the `Feedback` schema — the UI parses and relies on that structure.

---

## 🏗️ Architecture & Key Files

- Frontend: React + TypeScript + React Router
  - Routes: `app/routes/home.tsx`, `auth.tsx`, `upload.tsx`, `resume.tsx`
  - Components: `Navbar`, `FileUploader`, `ResumeCard`, `Summary`, `ATS`, `Details`
- Runtime bridge: `app/libs/puter.ts` (wraps `window.puter` APIs for auth, fs, kv, ai)
- Utilities: `app/libs/pdf2img.ts` (PDF → image), `app/libs/utils.ts` (`cn()` helper)
- Constants & sample data: `constants/index.ts`
## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## 💻 Local Development

1. Install dependencies:

```bash
npm install
```

2. Start dev server with HMR:

```bash
npm run dev
```

3. Open the app:

```
http://localhost:5173
```

4. Build for production:

```bash
npm run build
```

---

## 🧭 How it works (end-to-end)

1. User logs in via Puter.js auth.
2. User uploads PDF on `/upload` which:
   - uploads the PDF via `puter.fs.upload`,
   - converts the PDF to an image for preview (via `pdf2img`),
   - uploads the image and writes metadata to KV (`resume:<id>`).
3. App prepares instructions using `prepareInstructions()` and calls `puter.ai.chat` to request `Feedback` JSON.
4. App stores the AI feedback in KV and navigates to `/resume/:id` for viewing.

---

## 🧪 Testing & Debugging Tips

- Avoid redirect flicker by waiting for `isLoading` before redirecting (see `home.tsx` and `resume.tsx`).
- Ensure AI responses are valid JSON and conform to the `Feedback` format defined in `constants/index.ts`.

---

## 🔧 Deployment

- Docker build + run:

```bash
docker build -t resumind .
docker run -p 3000:3000 resumind
```

- Deploy the production build artifacts to any Node hosting or container platform.

---

## 🤝 Contributing

Contributions are welcome — open issues or PRs for bug fixes, tests, or feature improvements.

---

Built with ❤️ by Hammad Durrani.
