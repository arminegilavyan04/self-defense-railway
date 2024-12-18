# SafeSense Platform

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
git clone https://github.com/arminegilavyan04/self-defense-railway.git
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
MYSQL_PUBLIC_URL=</code></pre>

#### 4. Run the application locally

```bash
npm start
```
<p>The application will be live on <a href="http://localhost:3000" target="_blank">http://localhost:3000</a> by default.</p>

#### 5. Automatic Deployment (via GitHub Push)

<p>This project is automatically built and deployed to production <strong>whenever changes are pushed to GitHub</strong>. Here’s how it works:</p>

<ol>
  <li><strong>GitHub Push</strong>: Once you push your code changes to the repository (to the <code>main</code> branch), the application will trigger the build and deployment automatically.</li>
  <li><strong>Build and Deploy</strong>: The build process generates a production-ready version of the app, and the deployment is automatically handled by your hosting platform (e.g., <strong>Railway</strong> in our case).</li>
  <li><strong>No Manual Steps</strong>: There is no need for manual intervention in the deployment process. Once the code is pushed to GitHub, the deployment will occur automatically.</li>
  <li><strong>As soon as the deployment is over, the updated public version will be live on </strong><a href="https://self-defense-railway-production.up.railway.app" target="_blank">https://self-defense-railway-production.up.railway.app</a></li>
</ol>
    
<h3>File Structure</h3>

<p>Here’s an overview of the folder structure:</p>

<pre><code>
/self-defense-railway
│
├── /backend              
├──├──frontend 
├──├──├──/images
├──├──├──/css  
├──├──├──/index.html 
├──├──├──/home.html 
├──├──├──/login.html
├──├──├──/about.html      
├──├──├──/chat.html          
├──├──├──/quiz.html
├──├──├──/quiz-content.html
├──├──├──/quiz-results.html
├──├──├──/quiz.js 
├──├──├──/vr-glasses.html 
├──├──/node_modules        
├──├──.env                 
├──├──/routes
├──├──├──/auth.js
├──├──/db.js
├──├──/index.js
├──├──package.json         
├──├──package-lock.json
├── railway.json  
└── README.md            
</code></pre>

<h3>Features in Detail</h3>

<h4>User Authentication</h4>

<p>Users must register and log in to access the platform. Authentication ensures that only registered users can take the quiz and start chatting with a coach.</p>

<h4>Quiz</h4>

<p>Users are prompted with a series of self-defense questions to evaluate their knowledge level. The quiz score determines which coach is the best match, but users are free to choose any coach.</p>

<ul>
  <li><strong>Quiz</strong>: A set of multiple-choice questions designed to assess users' knowledge of self-defense techniques.</li>
  <li><strong>Coach Matching</strong>: Based on the quiz score, users are provided with a coach recommendation. However, they are free to select any available coach.</li>
</ul>
<h4>Chat</h4>

Once logged in, users can choose a coach and start chatting. The platform uses <code>Tawk.to</code> for real-time chat functionality, where users can communicate directly with a coach or platform representative.

- **Real-Time Messaging**: Users can instantly message coaches for advice and guidance.

<h4>VR-Glasses Page</h4>  (Under Construction)

The VR training page is under development and will offer immersive training scenarios for self-defense.

<h4>Integration with Tawk.to</h4>

We use [Tawk.to](https://www.tawk.to/) for real-time chat integration. If you want to modify or update the Tawk.to integration, check the `/backend/tawk.js` file. You'll need to replace the Tawk.to widget code with your unique API key.

### Technologies Used

- **Ajax**: To send requests from the frontend 
- **Node.js**: Server-side environment.
- **Express.js**: For backend server handling.
- **Tawk.to**: Real-time chat integration.
- **MySQL DB**: For storing user data.
- **Railway**: For hosting and deployment.

### Contributing

We welcome contributions! If you'd like to help improve this project, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`.
3. Make your changes.
4. Commit your changes: `git commit -m 'Add new feature'`.
5. Push to your forked repository: `git push origin feature-branch`.
6. Create a pull request.

Please make sure to test your changes before submitting a pull request.

### Additional Information

- **Automatic Deployment**: After pushing changes to GitHub, the build and deployment process will occur automatically, thanks to the connected hosting platform (Railway).
- **Environment Variables**: Make sure to configure your production environment with the necessary environment variables for proper functionality (e.g., Tawk.to API key, database credentials).




