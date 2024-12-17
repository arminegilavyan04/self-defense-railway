# Self-Defense Platform

Welcome to the Self-Defense Platform! This web application helps users assess their self-defense knowledge through quizzes, connect with coaches for personalized chat support, and explore VR-based training (coming soon!).

## Features

- **User Authentication**: Users must log in or register to access the quiz and chat features.
- **Self-Defense Quiz**: Users can take a quiz to determine their knowledge level, which helps in selecting the best-fit coach.
- **Coach Matching**: Based on quiz scores, users are recommended a coach but can also choose any coach to start chatting.
- **Real-Time Chat**: Integration with Tawk.to allows users to chat with their selected coach or a platform representative.
- **VR-Glasses Page (Under Construction)**: The VR training section is still being developed and will provide users with an immersive self-defense experience.

## Getting Started

### Prerequisites

Before you start, make sure you have the following installed for **local development**:

- **Node.js** (v14 or later)
- **npm** (Node Package Manager)

If you don't have Node.js, download it from [here](https://nodejs.org/).

### Local Development Setup

If you're working on the project locally (for development purposes), follow these steps:

#### 1. Clone the repository

```bash
git clone https://github.com/your-username/self-defense-platform.git
cd self-defense-platform
```
#### 2. Install dependencies

```bash
npm install
```

#### 3. Set up environment variables (local)

<p>Create a <code>.env</code> file at the root of your project and add the necessary configuration for your local development environment.</p>

<p>For example:</p>

<pre><code>MYSQL_URL=
MYSQL_PUBLIC_URL</code></pre>

#### 4. Run the application locally

```bash
npm start
```
<p>The application will be live on <a href="http://localhost:3000" target="_blank">http://localhost:3000</a> by default.</p>

#### 5. Automatic Deployment (via GitHub Push)

<p>This project is automatically built and deployed to production <strong>whenever changes are pushed to GitHub</strong>. Here’s how it works:</p>

<ol>
  <li><strong>GitHub Push</strong>: Once you push your code changes to the repository (usually to the <code>main</code> branch), the application will trigger the build and deployment automatically.</li>
  <li><strong>Build and Deploy</strong>: The build process generates a production-ready version of the app, and the deployment is automatically handled by your hosting platform (e.g., <strong>Railway</strong>, <strong>Vercel</strong>, etc.).</li>
  <li><strong>No Manual Steps</strong>: There is no need for manual intervention in the deployment process. Once the code is pushed to GitHub, the deployment will occur automatically.</li>
</ol>

