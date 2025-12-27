🏆 PromptRank
Master the Art of Prompt Engineering. > An intelligent, logic-based web application that scores your AI prompts against industry best practices to help you become a better Prompt Engineer.

📸 Screenshots
<img width="1366" height="768" alt="App Interface" src="https://via.placeholder.com/1366x768/0f172a/a855f7?text=PromptRank+Cyberpunk+Interface" /> <img width="1366" height="768" alt="Score Analysis" src="https://via.placeholder.com/1366x768/0f172a/22c55e?text=Score+Analysis+Dashboard" />

📖 Overview
PromptRank is a single-file, serverless educational tool designed to analyze and grade the quality of text prompts used for Large Language Models (LLMs). Built with a stunning Cyberpunk/Dark Mode aesthetic, it utilizes advanced Regular Expressions (Regex) to instantly evaluate inputs based on five critical dimensions: Length, Persona, Output Clarity, Chain of Thought, and Few-Shot examples.

The application features a "Bring Your Own Key" (BYOK) architecture simulation to mimic real-world SaaS security environments while keeping all logic client-side.

✨ Key Features
🧠 Smart Scoring Algorithm: A JavaScript-based engine that calculates a quality score (0-100) based on proven prompt engineering techniques.

🔐 BYOK Security Gate: Implements a strict overlay that prevents access until an API Key (simulated or real) is provided, storing it safely in Session Storage.

📊 Visual Feedback Loop: Features an animated circular gauge and color-coded progress bars (Red/Orange/Green) to represent prompt health visually.

⚡ Real-Time Analysis: Instantly checks for "Act as", "Step by step", output formats (JSON/Markdown), and more, providing actionable tips for improvement.

📱 Fully Responsive: Optimized for both desktop and mobile devices using a stacked layout.

🎨 Cyberpunk UI: Deep blacks (#0f172a), neon purples, and vibrant greens create an immersive coding environment.

🛠️ Tech Stack
Core Framework: Vue.js 3 (via CDN)

Styling: Tailwind CSS (via CDN)

Logic: Pure JavaScript (ES6+) & Regex

Architecture: Single File Component (HTML5)

🚀 Getting Started
To run this project locally, follow these steps:

Prerequisites
A modern web browser (Chrome, Edge, Firefox).

No Node.js or NPM required!

Installation
Clone the repository:

Bash

git clone https://github.com/WillByers/PromptRank.git
cd PromptRank
Run the app: Simply double-click index.html to launch the application.

Optional: Serve with a live server:

Bash

npx serve .
🎮 Usage
Authenticate: Upon loading, enter any API Key (e.g., sk-proj...) to unlock the interface. This simulates a secure login environment.

Draft: Type your prompt into the main text area (e.g., "Write a python script...").

Analyze: Click the "Analyze Prompt" button.

Review:

Check your score on the gauge.

Review the checklist on the right to see missing elements (e.g., "Add a Persona").

Refine: Edit your prompt based on the feedback and re-analyze to hit a perfect 10/10.

🛡️ Privacy Note
PromptRank operates entirely on the client-side. Your API keys and prompt texts are processed within your browser's memory and are never transmitted to any external server or database.

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the Project

Create your Feature Branch (git checkout -b feature/NewMetric)

Commit your Changes (git commit -m 'Add new scoring metric')

Push to the Branch (git push origin feature/NewMetric)

Open a Pull Request

📄 License
Distributed under the MIT License. See LICENSE for more information.

<div align="center">

CLICK TO USE
If the link doesn't work here is the URL: https://willbyers1.github.io/PromptRank/

Created by Mert Batu Bülbül

💻 Computer Engineering Freshman (1st Year Student) 💻

</div>