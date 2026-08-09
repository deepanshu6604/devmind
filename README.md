# DevMind

### AI-Powered Codebase Intelligence Platform

DevMind is a full-stack repository analysis platform designed to help developers understand unfamiliar software projects faster.

It analyzes an uploaded repository and generates structured information about the codebase, including project metadata, technology stack, repository statistics, folder structure, and detected entry points.

The goal of DevMind is to turn an unfamiliar repository into an understandable project overview.

---

## Live Demo

**Frontend:**  
https://devmind-orpin.vercel.app/

**Backend API:**  
https://devmind-backend-uqk4.onrender.com/

---

## Why DevMind?

Understanding an unfamiliar codebase can require manually exploring:

- Folder and file structure
- Frontend and backend technologies
- Project type
- Entry points
- Repository statistics
- Configuration and dependencies

DevMind automates the initial repository exploration process and presents the extracted information through a web interface.

---

## Key Features

### Repository Upload

- Upload a repository as a ZIP file.
- Store repository metadata and analysis results.
- Track analyzed repositories through the application.

### Automated Repository Analysis

DevMind scans the uploaded repository and extracts structured information such as:

- Project name
- Project type
- Frontend technology
- Backend technology
- Technology stack
- File statistics
- File extensions
- Folder structure
- Detected entry points

### Repository Report

The application presents the analysis through structured sections including:

- Project Summary
- Detected Stack
- Repository Statistics
- Entry Points
- Repository Tree

### Analysis History

Previously analyzed repositories can be stored and retrieved through the application.

### Developer-Oriented Interface

The frontend provides a dashboard-style interface for:

- Managing repositories
- Viewing analysis results
- Exploring repository structure
- Selecting repositories
- Accessing repository-aware workflows

---

## System Architecture

```text
                    ┌──────────────────────┐
                    │      Developer       │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │   TypeScript + Vite  │
                    └──────────┬───────────┘
                               │
                         REST API / Axios
                               │
                               ▼
                    ┌──────────────────────┐
                    │   FastAPI Backend    │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
       Repository         Analysis         Database
          Upload           Services        / Storage
              │                │                │
              └────────────────┼────────────────┘
                               │
                               ▼
                    Structured Repository
                         Analysis Result