# Vacation Management System

A comprehensive system for managing employee vacation requests, approvals, and reporting with automated documentation tools.

## 🏗️ System Overview

The Vacation Management System handles the complete lifecycle of employee vacation management:
- **Employee vacation requests** with approval workflows
- **Manager review and approval** processes
- **Vacation balance tracking** and automated updates
- **Comprehensive reporting** and inquiry capabilities
- **Notification system** for all stakeholders

## 📁 Project Structure

```
Vacation System/
├── Requirements/              # System requirements and specifications
├── Use-Cases/                # Detailed use case documentation
├── Wireframes/               # UI/UX wireframes and mockups
├── Diagrams/                 # System architecture and workflow diagrams
├── Data-Dictionary/          # Data structure definitions and schemas
├── Scripts/                  # Utility scripts for automation
└── index.html                # Auto-generated project navigation
```

## 📋 Core Components

### Requirements & Specifications
- **SRS Document** - Complete system requirements specification
- **Project Scope** - Detailed project boundaries and objectives
- **Meeting Minutes** - Stakeholder discussions and decisions

### Use Cases (UC-1 to UC-12)
- **UC-1**: Employee Vacation Request
- **UC-2**: Vacation Cancellation Request
- **UC-3**: My Vacation Requests
- **UC-4**: Review Vacation Request
- **UC-5**: Review Cancellation Request
- **UC-6**: Pending Requests Dashboard
- **UC-7**: Vacation Inquiry Search
- **UC-8**: Search Results Display
- **UC-9**: Single Transaction Reports
- **UC-10**: Comparative Annual Reports
- **UC-11**: Notifications Center
- **UC-12**: Automated Balance Updates

### System Design
- **Wireframes** - User interface mockups for all screens
- **Data Dictionaries** - Master data and screen-specific schemas
- **Workflow Diagrams** - Business process flows and state transitions
- **Context Diagrams** - System boundaries and external interactions

## 🛠️ Utility Scripts

The project includes automation scripts for documentation management:

- **`collect-usecases.ps1`** - Extracts and consolidates use case data
- **`batch-html-to-pdf.js`** - Converts documentation to PDF/PNG formats
- **`generate-tree.js`** - Creates project structure navigation

*For detailed script documentation, see [Scripts/README.md](Scripts/README.md)*

## 🚀 Smart Documentation Features

All project documentation can be automatically processed and converted:
- **Batch HTML to PDF conversion** with configurable settings
- **Automated use case collection** from HTML files
- **Dynamic project tree generation** with git integration
- **Consistent formatting** across all document types

## 📦 Quick Start

1. **Clone the repository**
2. **Install dependencies**: `cd Scripts && npm install`
3. **Generate project tree**: `node Scripts/generate-tree.js`
4. **View documentation**: Open `index.html` in your browser

## 🔗 Git Integration

The project automatically maintains documentation through git hooks:
- **Post-commit automation** keeps project tree updated
- **Version-controlled documentation** with every change
- **Consistent project structure** across all environments

## 📚 Documentation Standards

- **HTML-based** documentation for easy viewing and editing
- **Consistent templates** across all document types
- **Automated conversion** to PDF and image formats
- **Version control** integration for change tracking

---

*This project demonstrates modern documentation practices with automated maintenance and consistent formatting across all deliverables.*
