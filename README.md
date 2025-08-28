# Vacation Management System

A comprehensive system for managing employee vacation requests, approvals, and reporting with automated documentation tools.

## 🎯 Learning Objectives

This project demonstrates core **Business Analysis skills** including:
- **Use Case Development** - Creating detailed use case specifications
- **Business Process Modeling** - Workflow diagrams and state transitions
- **Requirements Gathering** - System requirements and stakeholder analysis
- **UI/UX Design** - Wireframes and user interface mockups
- **Data Modeling** - Data dictionaries and entity relationships
- **Documentation Standards** - Professional documentation practices

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
│   ├── SRS_Vacation_Management_System.pdf    # Software Requirements Specification
│   ├── SRS_Vacation_Management_System.tex    # LaTeX source for SRS
│   ├── Project-Scope.md                      # Project boundaries and objectives
│   └── MinutesOfMeeting_Thursday_7Aug.md     # Stakeholder meeting minutes
├── Use-Cases/                # Detailed use case documentation (UC-1 to UC-12)
│   ├── UC-1-Employee-Vacation-Request/       # Vacation request workflow
│   ├── UC-2-Employee-Vacation-Cancellation-Request/  # Cancellation process
│   ├── UC-3-My-Vacation-Requests/            # Employee dashboard
│   ├── UC-4-Review-Vacation-Request/         # Manager approval workflow
│   ├── UC-5-Review-Vacation-Cancellation-Request/    # Cancellation approval
│   ├── UC-6-Pending-Vacation-Requests/       # Manager dashboard
│   ├── UC-7-Vacation-Inquiry-Search-Parameters/      # Search interface
│   ├── UC-8-Vacation-Inquiry-Search-Results/ # Results display
│   ├── UC-9-Print-Single-Vacation-Transaction-Report/ # Individual reports
│   ├── UC-10-Print-Comparative-Annual-Report/        # Annual comparisons
│   ├── UC-11-Notifications-Center/            # Communication hub
│   ├── UC-12-Automated-Update-of-Employee-Annual-Vacation-Balance/ # Auto-updates
│   ├── Use-Case-Template/                     # Standard template
│   ├── Generated-UseCases-JSON/               # Consolidated use case data
│   └── Messages-Table/                        # System message definitions
├── Wireframes/               # UI/UX wireframes and mockups
│   ├── Vacation-Request/                      # Main request form
│   ├── Vacation-Cancellation-Request/         # Cancellation form
│   ├── My-Vacation-Requests/                  # Employee view
│   ├── Pending-Vacation-Requests/             # Manager view
│   ├── Review-Vacation-Request/               # Approval interface
│   ├── Review-Vacation-Cancellation-Request/  # Cancellation approval
│   ├── Vacation-Inquiry-Search-Parameters/   # Search form
│   ├── Vacation-Inquiry-Search-Results/      # Results display
│   ├── Notifications-Center/                  # Notification interface
│   ├── Requests-Center/                       # Request management
│   ├── Print-Layout-Single-Transaction-Report/ # Report layouts
│   └── Print-Layout-Annual-Comparative-Report/
├── Diagrams/                 # System architecture and workflow diagrams
│   ├── Context/                               # System context and boundaries
│   ├── State-Diagram/                        # Vacation request states
│   └── Workflows/                            # Business process flows
│       ├── Vacation-Request-Basic-Flow/      # Standard request flow
│       ├── Vacation-Request-Escalation-to-Sponsor/  # Escalation process
│       └── Vacation-Request-Resubmission-After-Rejection/ # Resubmission flow
├── Data-Dictionary/          # Data structure definitions and schemas
│   ├── Master-Data-Dictionaries/              # Core entity definitions
│   │   ├── Employee-Master-Data-Data-Dictionary/     # Employee data schema
│   │   ├── Departments-Master-Data-Data-Dictionary/  # Department structure
│   │   └── Vacation-Types-Master-Data-Data-Dictionary/ # Leave type definitions
│   ├── Screen-Data-Dictionaries/              # Screen-specific data models
│   │   ├── Vacation-Request-Screen-Data-Dictionary/  # Request form data
│   │   ├── Review-Vacation-Request-Screen-Data-Dictionary/ # Approval data
│   │   ├── Notifications-Center-Screen-Data-Dictionary/    # Notification data
│   │   └── [Additional screen data dictionaries...]
│   └── Data-Dictionary-Template/              # Standard template
├── Scripts/                  # Utility scripts for automation
│   ├── collect-usecases.ps1                   # Use case data extraction
│   ├── batch-html-to-pdf.js                  # Document conversion
│   ├── generate-tree.js                       # Project tree generation
│   └── package.json                           # Node.js dependencies
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
