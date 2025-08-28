# Vacation Management System

A comprehensive Business Analysis learning project demonstrating core BA deliverables and documentation standards.

## 🎯 Learning Objectives

This repository serves as a **practical Business Analysis learning resource** that demonstrates:

- **Requirements Engineering** - Software Requirements Specification (SRS) development
- **Use Case Modeling** - Detailed use case specifications with actors and flows
- **Business Process Modeling** - Workflow diagrams and state transitions
- **Data Modeling** - Data dictionaries and entity relationship definitions
- **UI/UX Design** - Wireframes and user interface mockups
- **Documentation Standards** - Professional BA deliverable templates

## 🏗️ System Overview

The Vacation Management System exemplifies real-world Business Analysis by modeling:
- **Employee vacation request workflows** with approval processes
- **Manager review and approval** business processes
- **Vacation balance tracking** and automated business rules
- **Reporting and inquiry** capabilities for stakeholders
- **Notification systems** for business communication

## 📁 Project Structure

```
Vacation System/
│   .gitignore
│   index.html
│   README.md
│   SRS_Vacation_Management_System.pdf
│   SRS_Vacation_Management_System.tex
│
├───Data-Dictionary
│   ├───Data-Dictionary-Template
│   ├───Master-Data-Dictionaries
│   │   ├───Departments-Master-Data-Data-Dictionary
│   │   ├───Employee-Master-Data-Data-Dictionary
│   │   └───Vacation-Types-Master-Data-Data-Dictionary
│   └───Screen-Data-Dictionaries
│       ├───Vacation-Request-Screen-Data-Dictionary
│       ├───Review-Vacation-Request-Screen-Data-Dictionary
│       ├───Notifications-Center-Screen-Data-Dictionary
│       └───[Additional screen data dictionaries...]
│
├───Diagrams
│   ├───Context
│   ├───State-Diagram
│   └───Workflows
│       ├───Vacation-Request-Basic-Flow
│       ├───Vacation-Request-Escalation-to-Sponsor
│       └───Vacation-Request-Resubmission-After-Rejection
│
├───Requirements
│   ├───SRS_Vacation_Management_System.pdf
│   ├───Project-Scope.md
│   └───MinutesOfMeeting_Thursday_7Aug.md
│
├───Scripts
│   ├───collect-usecases.ps1
│   ├───batch-html-to-pdf.js
│   ├───generate-tree.js
│   └───package.json
│
├───Use-Cases
│   ├───UC-1-Employee-Vacation-Request
│   ├───UC-2-Employee-Vacation-Cancellation-Request
│   ├───UC-3-My-Vacation-Requests
│   ├───UC-4-Review-Vacation-Request
│   ├───UC-5-Review-Vacation-Cancellation-Request
│   ├───UC-6-Pending-Vacation-Requests
│   ├───UC-7-Vacation-Inquiry-Search-Parameters
│   ├───UC-8-Vacation-Inquiry-Search-Results
│   ├───UC-9-Print-Single-Vacation-Transaction-Report
│   ├───UC-10-Print-Comparative-Annual-Report
│   ├───UC-11-Notifications-Center
│   ├───UC-12-Automated-Update-of-Employee-Annual-Vacation-Balance
│   ├───Use-Case-Template
│   ├───Generated-UseCases-JSON
│   └───Messages-Table
│
└───Wireframes
    ├───Vacation-Request
    ├───Vacation-Cancellation-Request
    ├───My-Vacation-Requests
    ├───Pending-Vacation-Requests
    ├───Review-Vacation-Request
    ├───Review-Vacation-Cancellation-Request
    ├───Vacation-Inquiry-Search-Parameters
    ├───Vacation-Inquiry-Search-Results
    ├───Notifications-Center
    ├───Requests-Center
    ├───Print-Layout-Single-Transaction-Report
    └───Print-Layout-Annual-Comparative-Report
```

## 📋 Business Analysis Deliverables

### Requirements & Specifications
**Why Business Analysts Create These:**
Requirements are the foundation of any project. BAs create these documents to ensure all stakeholders understand what the system should do, why it's needed, and what success looks like.

- **SRS Document** - Complete software requirements specification demonstrating requirements gathering
- **Project Scope** - Business requirements and project boundaries definition  
- **Meeting Minutes** - Stakeholder engagement and requirements elicitation documentation

### Use Case Modeling (UC-1 to UC-12)
**Why Business Analysts Create Use Cases:**
Use cases capture how users interact with the system to achieve business goals. They help BAs understand user needs, define system behavior, and ensure all scenarios are covered before development begins.

Each use case demonstrates proper BA documentation practices:
- **UC-1**: Employee Vacation Request - Basic workflow modeling
- **UC-2**: Vacation Cancellation Request - Alternative flow handling
- **UC-3**: My Vacation Requests - User interface requirements
- **UC-4**: Review Vacation Request - Approval process modeling
- **UC-5**: Review Cancellation Request - Exception handling
- **UC-6**: Pending Requests Dashboard - Manager requirements
- **UC-7**: Vacation Inquiry Search - Search functionality specification
- **UC-8**: Search Results Display - Output requirements
- **UC-9**: Single Transaction Reports - Reporting requirements
- **UC-10**: Comparative Annual Reports - Analytics requirements
- **UC-11**: Notifications Center - Communication requirements
- **UC-12**: Automated Balance Updates - Business rule automation

### Business Process Modeling
**Why Business Analysts Create Process Models:**
Process models help BAs visualize how work flows through an organization, identify inefficiencies, and ensure the new system supports optimal business processes. They bridge the gap between current and future state.

- **Context Diagrams** - System boundaries and external interactions
- **State Diagrams** - Business process states and transitions
- **Workflow Diagrams** - Detailed business process flows including:
  - Basic vacation request flow
  - Escalation processes
  - Resubmission workflows

### Data Modeling
**Why Business Analysts Create Data Models:**
Data models ensure BAs understand what information the system needs to store, how it's organized, and how different parts of the system share data. This prevents data inconsistencies and integration issues.

- **Master Data Dictionaries** - Core business entities (Employee, Department, Vacation Types)
- **Screen Data Dictionaries** - User interface data requirements
- **Data Dictionary Templates** - Standardized data definition formats

### UI/UX Design
**Why Business Analysts Create Wireframes:**
Wireframes help BAs communicate interface requirements to stakeholders and developers. They ensure the system is intuitive, efficient, and meets user needs before expensive development begins.

- **Wireframes** - User interface mockups for all business functions
- **Screen Designs** - Complete user experience specifications
- **Print Layouts** - Report and output design requirements

## 🛠️ Automation Tools

**Why Business Analysts Use Automation:**
Automation helps BAs focus on analysis rather than repetitive tasks. These tools demonstrate how BAs can streamline documentation maintenance, ensure consistency, and reduce manual errors in large projects.

The project includes utility scripts demonstrating BA automation:
- **`collect-usecases.ps1`** - Automated use case data extraction
- **`batch-html-to-pdf.js`** - Document format conversion
- **`generate-tree.js`** - Project structure maintenance

*For detailed script documentation, see [Scripts/README.md](Scripts/README.md)*

## 🚀 Smart Documentation Features

**Why Business Analysts Need Smart Documentation:**
Modern BA projects require efficient documentation management. These features help BAs maintain consistency, track changes, and ensure all stakeholders have access to current information.

This project demonstrates modern BA practices:
- **Automated documentation maintenance** through git integration
- **Consistent formatting** across all deliverable types
- **Version-controlled requirements** with automated updates
- **Professional templates** for all BA artifacts

## 📦 Quick Start

**Why Business Analysts Need Quick Setup:**
Efficient project setup allows BAs to focus on analysis rather than technical configuration. This demonstrates how to organize a BA project for easy navigation and collaboration.

1. **Clone the repository**
2. **Install dependencies**: `cd Scripts && npm install`
3. **Generate project tree**: `node Scripts/generate-tree.js`
4. **Explore deliverables**: Open `index.html` for navigation

## 🔗 Git Integration

**Why Business Analysts Use Version Control:**
Version control helps BAs track changes to requirements, maintain audit trails, and collaborate with stakeholders. It ensures everyone works with the latest documentation and can see what changed and why.

Automated documentation maintenance through git hooks:
- **Post-commit automation** keeps project structure updated
- **Version-controlled requirements** with every change
- **Consistent project organization** across environments

## 📚 Business Analysis Learning Path

**Why This Learning Path Matters:**
Business Analysis requires systematic learning. This path follows the natural progression of a BA project, from understanding business needs to delivering complete specifications. Each step builds on the previous one.

This repository provides a complete learning journey:

1. **Start with Requirements** - Study the SRS and project scope
2. **Understand Use Cases** - Analyze UC-1 through UC-12 for modeling techniques
3. **Study Process Flows** - Review workflow and state diagrams
4. **Examine Data Models** - Learn data dictionary structures
5. **Review UI Designs** - Understand wireframe and interface requirements
6. **Practice Automation** - Use scripts to maintain documentation

## 🎓 What You'll Learn

**Why These Skills Are Essential:**
These are the core competencies every Business Analyst needs. They represent the complete toolkit for analyzing business problems, designing solutions, and communicating with stakeholders effectively.

- **Requirements Elicitation** techniques and documentation
- **Use Case Modeling** best practices and standards
- **Business Process Modeling** with diagrams and workflows
- **Data Modeling** principles and dictionary creation
- **UI/UX Requirements** specification and wireframing
- **Professional Documentation** standards and templates
- **Requirements Management** with version control

---

*This project demonstrates professional Business Analysis deliverables and serves as a comprehensive learning resource for BA practitioners and students.*
