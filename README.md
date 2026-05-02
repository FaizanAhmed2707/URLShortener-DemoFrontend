# LinkShrinky Frontend

This is the React frontend for the LinkShrinky URL shortener service. It provides the user interface for link generation, user authentication, and visual analytics dashboards. 

**Live Demo:** [https://lshrink.fzdev.in](https://lshrink.fzdev.in)

## Tech Stack
*   **Core:** React 19, Vite
*   **Routing:** React Router DOM
*   **Styling:** Tailwind CSS
*   **State / Data Fetching:** Context API, Axios, React Query
*   **UI Components:** Framer Motion (animations), Recharts/Chart.js (analytics), React Hot Toast (notifications)
*   **Hosting:** Netlify
*   **DNS & Security:** Cloudflare

## Core Features
*   **Dynamic Shortening:** Instant alias generation via the Spring Boot backend.
*   **Environment-Agnostic Routing:** Uses native browser APIs (`window.location`) to construct final shareable links, eliminating hardcoded domain variables.
*   **Analytics Dashboard:** Visual representation of click data filtered by date intervals.
*   **Clipboard Integration:** One-click copying using `react-copy-to-clipboard`.
*   **Authentication Flow:** JWT-based login and registration screens.

## Environment Variables
Create a `.env` file in the root directory. Because the application dynamically reads its own host domain, you only need to define the backend API route.

```properties
# Connects to the Azure Spring Boot backend
VITE_BACKEND_URL=https://linkshrinky-backend-api-cvhcb3awcufbewbg.eastasia-01.azurewebsites.net
```

## Local Development Setup

1.  Clone the repository.
    ```bash
    git clone https://github.com/FaizanAhmed2707/URLShortener-DemoFrontend.git
    cd URLShortener-DemoFrontend
    ```
2.  Install dependencies. Use the legacy peer deps flag to bypass strict version conflicts between React 19 and older packages like `react-copy-to-clipboard`.
    
```bash
    npm install --legacy-peer-deps
    ```
3.  Start the Vite development server.
    ```bash
    npm run dev
    ```
4.  The application will run on `http://localhost:5173`.

## Production Deployment (Netlify)

This application is configured for continuous deployment on Netlify via the `main` branch.

**Netlify Build Configuration:**
*   **Build command:** `npm run build`
*   **Publish directory:** `dist`

**Required Netlify Environment Variables:**
1.  `VITE_BACKEND_URL`: Set to your production Azure App Service URL.
2.  `NPM_FLAGS`: Set the value to `--legacy-peer-deps`. This is mandatory; otherwise, Netlify's strict dependency checks will fail the build due to React 19 peer dependency conflicts. 

---
**Author:** Syed Faizan Ahmed
```
