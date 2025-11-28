
# LinkwayFDI Platform

The operating system for cross-border investment (FDI & ODI).

## 🚀 Quick Start / 快速开始

1.  **Install Dependencies / 安装依赖**
    ```bash
    npm install
    ```

2.  **Start Development Server / 启动开发服务器**
    ```bash
    npm run dev
    ```

3.  **Build for Production / 构建生产版本**
    ```bash
    npm run build
    ```

## 🌍 How to Deploy (GitHub + Vercel) / 如何部署

**Step 1: Push to GitHub**
1.  Create a new repository on GitHub.
2.  Run the following commands in your project folder:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    git push -u origin main
    ```

**Step 2: Connect to Vercel**
1.  Go to [Vercel.com](https://vercel.com) and log in.
2.  Click **"Add New..."** -> **"Project"**.
3.  Select **"Import"** next to your new GitHub repository.
4.  **CRITICAL**: In the "Environment Variables" section:
    *   Add Key: `API_KEY`
    *   Add Value: `(Your Google Gemini API Key)`
5.  Click **Deploy**.

## 🛠 Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI**: Google Gemini API
- **Language**: TypeScript
