# Project Scope: Automated Vacation Management System

## System Purpose and Core Functionalities
The system's primary objective is to automate the vacation request, approval, and cancellation processes while providing robust reporting for efficient vacation management. It addresses inefficiencies in the current paper-based system, such as processing delays and inaccurate balance tracking due to manual errors and duplicate records.

Core functionalities include:
- **Vacation Request**: Employees submit requests via a mobile app, including auto-filled fields (Employee Name, ID), Vacation Type (Annual or Sick), Start/End Dates, Notes, and file attachments. Requests can be edited before submission.
- **Vacation Cancellation Request**: Employees cancel pending or approved requests before the start date via the mobile app, providing a cancellation reason and viewing original details.
- **Review and Approval**: Managers and HR review and approve/reject requests primarily on the website (with mobile viewing). Reviewers access full details in view mode and must provide reasons for decisions.
- **Vacation Inquiry**: Users search by Date Range, Department, Employee Name/ID, Vacation Type, and Status; results display in a grid.
- **Print Reports**:
  - **Single Transaction Report (PDF)**: Generated from inquiry results for approved requests, including request details, employee info, vacation specifics, reviewer names/titles, and approval timestamps.
  - **Comparative Annual Report (PDF)**: Annual view by department, showing total/remaining vacation days; optional "Details" includes employee names.

## Key Business Rules and Requirements
- **Approval Flow**: Multi-level process: Employee → Direct Manager → HR → General Manager. Balances update only after final approval.
- **Leave Types**: Limited to Annual and Sick Leave; sick leave requires verified document attachments.
- **Cancellation**: Allowed only before start date.
- **Overlapping Requests**: Rejected for the same employee.
- **Unused Days**: Forfeited annually; no carryover or compensation.
- **Entitlement**: 21 days/year standard; increases to 30 for employees with >10 years service or >50 years old.
- **Emergency Exceptions**: Supported via flags even with zero balance.
- **Rejections**: Based on missing documents or work needs.
- **Automation**: No manual overrides for balances.
- **Notifications**: Sent for approvals/rejections and cancellations; HR/managers receive header notifications with links.
- **Escalation**: Automatic after 2 days of delay.
- **History Logs**: Maintained for vacations; employees view non-editable reports.
- **Configurable Policies**: Variables for easy maintenance.
- **Employee Data**: Migrated from Excel to database.

## In-Scope Deliverables and Technical Requirements
- **State Diagram**: For vacation object states.
- **Wireframes (8 Total)**:
  1. Leave Request (Mobile).
  2. Leave Cancellation (Mobile).
  3. Review Leave Request (Web/Mobile).
  4. Review Leave Cancellation (Web/Mobile).
  5. Vacation Inquiry – Search Parameters.
  6. Vacation Inquiry – Results Grid.
  7. Single Transaction Report Layout (PDF).
  8. Comparative Annual Report Layout (PDF).
- **Data Dictionaries (11 Total)**: One per wireframe plus three for Master Data (Employee, Vacation Types, Departments), including Field Name, Type, Required, Source, Rules, and Defaults.
- **View Mode**: Available on all screens.
- **Report Standards**: Include print time, page number, and user name in footer on every page.
- **Reporting Dashboard (Web)**: For managers, featuring charts (Pie: Vacation Types; Bar: Per Department; Line: Monthly Trends) and summaries on weekly/monthly/yearly basis per department.

## Scope Limitations (Out of Scope)
- Appeal functionality for rejections.
- Bridging policies (e.g., 3 days = 1 week).
- Unofficial holidays.
- Carryover or compensation for unused days.
- Part-time employee support.
- Non-Saudi or non-Muslim employees (only Muslim Saudi employees supported).
- Unplanned vacations.
- Constraints on maximum simultaneous vacations per day.

## Specific Constraints and User Types
- Compliance: Saudi vacation regulations only.
- Organization: Single entity with multiple departments using uniform processes.
- Trainees: Flagged as ineligible for vacations.
- General Manager Requests: System must handle specially.