# Shariah Audit Tool with MUI

A modern web application for auditing financial contracts and documents for Shariah compliance. Built using **Next.js**, **Material UI (MUI)**, and **TypeScript**.

## 🌐 Overview

This application provides tools for financial institutions and individuals to ensure their contracts and financial documents adhere to Islamic financial principles.

### Core Capabilities

- **📝 Contract Analysis** – Analyze contract text for potential Shariah compliance issues.
- **💸 Zakat Calculator** – Calculate business Zakat based on AAOIFI FAS 9 standards.
- **📄 Detailed Reports** – Generate comprehensive compliance reports and Shariah certificates.

## 📸 Screenshots

Here are some screenshots of the application in action:

### Home Screen
![Home Screen](/public/images/home_screen.png)

### Standards Explorer
![Standards Explorer](/public/images/standards_explorer.png)

### Glossary Screen
![Glossary Screen](/public/images/glossary_screen.png)

### Tutorial Screen
![Tutorial Screen](/public/images/tutorial_screen.png)

### Application UI Samples
![Application UI](/screenshots/Screenshot%202025-05-18%20012417.png)
![Financial Analysis](/screenshots/Screenshot%202025-05-18%20012428.png)
![Compliance Reports](/screenshots/Screenshot%202025-05-18%20012435.png)
![Zakat Calculator](/screenshots/Screenshot%202025-05-18%20012441.png)

## ✨ Features

- 🔍 **Smart Contract Analysis** – Advanced NLP-based analysis to flag non-compliant clauses.
- 💰 **Zakat Calculation** – Professional-grade calculator following AAOIFI standards.
- 🌙 **Dark/Light Mode** – Full theme support with seamless transitions.
- 📱 **Responsive Design** – Optimized for mobile, tablet, and desktop devices.
- ⚡ **Fast Performance** – Built on Next.js for speed and scalability.
- 🛡️ **Type Safety** – Written entirely in TypeScript for maintainability.

## 🚀 Getting Started

### Prerequisites

- Node.js v16.8 or later
- Package manager: `npm`, `yarn`, or `pnpm`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AbdenourBouziane/shariah-audit-tool.git
   cd shariah-audit-tool
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Visit `http://localhost:3000` to view the application.

## 📁 Project Structure

```
/app               # App Router pages and routes
/components        # Reusable UI components
/types             # TypeScript type definitions
/theme             # MUI theme configuration
/actions           # API route handlers and utilities
```

## 🧰 Technology Stack

* **Frontend Framework:** Next.js (App Router)
* **UI Library:** Material UI (MUI)
* **Styling:** MUI styled-components, System props
* **State Management:** React Hooks
* **Theming:** `next-themes` for dark/light mode
* **Language:** TypeScript
* **API Handling:** Next.js server actions

## 🔌 Backend Integration

The app connects to a Shariah compliance analysis backend. On load, it checks backend availability:

* ✅ Available: Full functionality enabled
* ❌ Unavailable: Limited functionality mode

**To use your backend:**
Modify the API endpoints in `app/actions/*.ts`.

## 🎨 Customization

### Theming

Customize the Material UI theme in the `/theme` folder.

### Adding New Features

To add a feature:

1. Create a new directory under `/app`
2. Build components under `/components`
3. Define types in `/types` if needed


## 🙏 Acknowledgments

* Built with [Next.js](https://nextjs.org/)
* UI powered by [Material UI](https://mui.com/)
* Theme switching via [next-themes](https://github.com/pacocoursey/next-themes)

