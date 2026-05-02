// src/data/ToolData.js

import {  SiSpringboot, SiSpring, SiJsonwebtokens, SiTailwindcss, SiMui, SiAxios, SiPostgresql, SiDocker, SiVite, SiReact} from 'react-icons/si';
import { IoLogoReact } from 'react-icons/io5'; // Example of Io5 sub-path import

// General icons (often work from the main library, but defining them here for clarity)
import { FaLayerGroup, FaCloud, FaDatabase, FaJava } from 'react-icons/fa';


export const TOOLS = [
  // BACKEND
  {
    id: 1,
    name: "Java 21",
    category: "Backend Language",
    description: "The core language for the backend API logic.",
    logo: FaJava,
  },
  {
    id: 2,
    name: "Spring Boot",
    category: "Backend Framework",
    description: "A robust framework for building production-grade REST APIs.",
    logo: SiSpringboot,
  },
  {
    id: 3,
    name: "Spring Security",
    category: "Security",
    description: "Used to implement a secure, token-based authentication system.",
    logo: SiSpring,
  },
  {
    id: 4,
    name: "Spring Data JPA",
    category: "Data Access",
    description: "Simplified the data access layer for easy interaction with database tables.",
    logo: FaLayerGroup, // Represents the data access layer
  },
  {
    id: 5,
    name: "JWT",
    category: "Security Token",
    description: "JSON Web Token used for stateless, secure user authentication.",
    logo: SiJsonwebtokens, 
  },
  
  // FRONTEND
  {
    id: 6,
    name: "React",
    category: "Frontend Library",
    description: "Library for building a fast, component-based Single Page Application (SPA).",
    logo: SiReact,
  },
  {
    id: 7,
    name: "Vite",
    category: "Frontend Build Tool",
    description: "Modern build tool used for rapid development of the React application.",
    logo: SiVite,
  },
  {
    id: 8,
    name: "Tailwind CSS",
    category: "Styling",
    description: "Utility-first framework for rapid development of a responsive UI.",
    logo: SiTailwindcss,
  },
  {
    id: 9,
    name: "Material-UI (MUI)",
    category: "UI Components",
    description: "Component library used alongside Tailwind CSS for a professional UI.",
    logo: SiMui,
  },
  {
    id: 10,
    name: "React Query",
    category: "State Management",
    description: "Manages server state and API communication, especially for analytics data.",
    logo: IoLogoReact, // Using a React-themed icon
  },
  {
    id: 11,
    name: "Axios",
    category: "HTTP Client",
    description: "Promise-based HTTP client used for making API calls to the Spring Boot backend.",
    logo: SiAxios,
  },

  // DATABASE & DEVOPS
  {
    id: 12,
    name: "PostgreSQL",
    category: "Relational Database",
    description: "Robust relational database used for structured data and transactional integrity.",
    logo: SiPostgresql,
  },
  {
    id: 13,
    name: "Docker",
    category: "Containerization",
    description: "Containerizes the Spring Boot backend, ensuring a consistent runtime environment.",
    logo: SiDocker,
  },
  {
    id: 14,
    name: "Render / Netlify",
    category: "Cloud Deployment",
    description: "Cloud platforms used for seamless, Git-based deployment of the full stack.",
    logo: FaCloud,
  },
  {
    id: 15,
    name: "NeonDB",
    category: "Serverless Database",
    description: "A serverless PostgreSQL provider for a scalable and cost-effective production database.",
    logo: FaDatabase,
  },
];

export const fetchTools = () => { /* ... existing fetchTools function ... */ };