
## A) Screen Data Dictionaries (8)

### 1. Vacation Request Screen
| Field Name   | Data/UI Type                | Is Required | Data Source        | Business Rules                                                                 | Default Values      |
|--------------|-----------------------------|-------------|-------------------|-------------------------------------------------------------------------------|---------------------|
| Employee ID  | Text Input (Read-only)      | Yes         | Employee Master    | Unique identifier; auto-filled; cannot be changed                             | Auto-filled         |
| Employee Name| Text Input (Read-only)      | Yes         | Employee Master    | Full legal name; auto-filled                                                  | Auto-filled         |
| Vacation Type| Dropdown (Annual, Sick)     | Yes         | Vacation Types     | Must select valid type                                                         | None                |
| Start Date   | Date Picker                 | Yes         | User Input         | Cannot be in past; must be ≤ End Date                                          | Today+1             |
| End Date     | Date Picker                 | Yes         | User Input         | Must be after Start Date                                                       | None                |
| Period (Days)| Text Display (Read-only)    | Yes         | System Calculation | End Date - Start Date + 1                                                      | Auto-calculated     |
| Notes        | Textarea                    | No          | User Input         | Optional comments                                                              | Blank               |
| Attachments  | File Upload                 | Conditional | User Upload        | Mandatory for Sick Leave; optional for Annual Leave                            | None                |

---

### 2. Vacation Cancellation Request Screen
| Field Name   | Data/UI Type                | Is Required | Data Source        | Business Rules                                           | Default Values      |
|--------------|-----------------------------|-------------|-------------------|---------------------------------------------------------|---------------------|
| Request ID   | Text Input (Read-only)      | Yes         | System             | References existing approved vacation                    | Auto-filled         |
| Employee ID  | Text Input (Read-only)      | Yes         | Employee Master    | Same employee who submitted the request                  | Auto-filled         |
| Employee Name| Text Input (Read-only)      | Yes         | Employee Master    | Same employee                                            | Auto-filled         |
| Vacation Type| Dropdown (Read-only)        | Yes         | Vacation Types     | Same as original request                                 | Auto-filled         |
| Start Date   | Date Picker (Read-only)     | Yes         | Original Request   | Must not be started yet                                  | Auto-filled         |
| End Date     | Date Picker (Read-only)     | Yes         | Original Request   | Auto-filled                                              | Auto-filled         |
| Reason       | Textarea                    | No          | User Input         | Optional cancellation justification                      | Blank               |
| Status       | Enum (Pending/Approved/Rejected)| Yes     | System             | Must pass HR/Manager approval before final cancellation | Pending             |

---

### 3. Review Vacation Request Screen
| Field Name   | Data/UI Type                | Is Required | Data Source        | Business Rules                                                       | Default Values      |
|--------------|-----------------------------|-------------|-------------------|-----------------------------------------------------------------------|---------------------|
| Request ID   | Text Display (Read-only)    | Yes         | System             | Unique request identifier                                             | Auto-generated      |
| Employee ID  | Text Display (Read-only)    | Yes         | Employee Master    | Same as original request                                              | Auto-filled         |
| Employee Name| Text Display (Read-only)    | Yes         | Employee Master    | Full employee name                                                    | Auto-filled         |
| Department   | Text Display (Read-only)    | Yes         | Department Master  | Employee’s department                                                 | Auto-filled         |
| Vacation Type| Text Display (Read-only)    | Yes         | Vacation Types     | From employee request                                                 | Auto-filled         |
| Start Date   | Text Display (Read-only)    | Yes         | Employee Request   | From request                                                          | Auto-filled         |
| End Date     | Text Display (Read-only)    | Yes         | Employee Request   | From request                                                          | Auto-filled         |
| Period       | Text Display (Read-only)    | Yes         | System Calculation | Auto-calculated                                                       | Auto-filled         |
| Notes        | Text Display                | No          | Employee Request   | Optional comments from request                                        | Blank               |
| Attachments  | File Link                   | Conditional | Employee Request   | Must be attached if Sick leave                                        | Auto-filled         |
| Reviewer Notes| Textarea                   | No          | Manager Input      | Optional manager comments                                             | Blank               |
| Action       | Buttons (Approve/Reject)    | Yes         | Manager Input      | Required decision by reviewer                                         | None                |

---

### 4. Review Vacation Cancellation Request Screen
| Field Name   | Data/UI Type                | Is Required | Data Source        | Business Rules                                                | Default Values      |
|--------------|-----------------------------|-------------|-------------------|--------------------------------------------------------------|---------------------|
| Cancellation Request ID| Text Display      | Yes         | System             | Links to original request                                    | Auto-generated      |
| Original Request ID    | Text Display      | Yes         | System             | Reference of canceled vacation                               | Auto-filled         |
| Employee ID  | Text Display (Read-only)    | Yes         | Employee Master    | From employee record                                         | Auto-filled         |
| Employee Name| Text Display (Read-only)    | Yes         | Employee Master    | From employee record                                         | Auto-filled         |
| Vacation Type| Text Display (Read-only)    | Yes         | Vacation Types     | From request                                                 | Auto-filled         |
| Start Date   | Text Display (Read-only)    | Yes         | Employee Request   | Must not have started                                        | Auto-filled         |
| End Date     | Text Display (Read-only)    | Yes         | Employee Request   | Auto-filled                                                  | Auto-filled         |
| Reason       | Textarea                    | No          | Employee Input     | Cancellation justification                                   | Blank               |
| Reviewer Notes| Textarea                   | No          | Manager Input      | Optional HR/Manager comments                                 | Blank               |
| Action       | Buttons (Approve/Reject)    | Yes         | Manager Input      | HR/Manager must approve before effective cancellation        | None                |

---

### 5. Vacation Inquiry – Search Parameters Screen
| Field Name   | Data/UI Type                | Is Required | Data Source        | Business Rules                                     | Default Values  |
|--------------|-----------------------------|-------------|-------------------|---------------------------------------------------|-----------------|
| Employee ID  | Text Input                  | No          | Employee Master    | Optional search filter                            | Blank           |
| Vacation Type| Dropdown (Annual, Sick)     | No          | Vacation Types     | Optional filter                                   | All             |
| Start Date   | Date Picker                 | No          | User Input         | Optional range                                    | Blank           |
| End Date     | Date Picker                 | No          | User Input         | Optional range                                    | Blank           |
| Status       | Dropdown (Pending/Approved/Rejected)| No | System             | Optional filter                                   | All             |
| Department   | Dropdown                    | No          | Department Master  | Optional filter                                   | All Departments |

---

### 6. Vacation Inquiry – Search Results Screen
| Field Name   | Data/UI Type                | Is Required | Data Source        | Business Rules                                     | Default Values  |
|--------------|-----------------------------|-------------|-------------------|---------------------------------------------------|-----------------|
| Request ID   | Text Display                | Yes         | System             | Unique identifier                                 | Auto-generated  |
| Employee ID  | Text Display                | Yes         | Employee Master    | From request                                      | Auto-filled     |
| Employee Name| Text Display                | Yes         | Employee Master    | From request                                      | Auto-filled     |
| Department   | Text Display                | Yes         | Department Master  | Employee’s department                             | Auto-filled     |
| Vacation Type| Text Display                | Yes         | Vacation Types     | From request                                      | Auto-filled     |
| Start Date   | Text Display                | Yes         | Employee Request   | From request                                      | Auto-filled     |
| End Date     | Text Display                | Yes         | Employee Request   | From request                                      | Auto-filled     |
| Period       | Text Display                | Yes         | System             | Auto-calculated                                   | Auto-filled     |
| Status       | Text Display                | Yes         | System             | Pending, Approved, or Rejected                    | Auto-filled     |
| Print Action | Button                      | No          | System             | Prints single transaction report                  | None            |

---

### 7. Print – Single Transaction Report
| Field Name   | Data/UI Type                | Is Required | Data Source        | Business Rules                                     | Default Values  |
|--------------|-----------------------------|-------------|-------------------|---------------------------------------------------|-----------------|
| Employee ID  | Text Display                | Yes         | Employee Master    | Shown in header                                   | Auto-filled     |
| Employee Name| Text Display                | Yes         | Employee Master    | Shown in header                                   | Auto-filled     |
| Department   | Text Display                | Yes         | Department Master  | Included in report                                | Auto-filled     |
| Vacation Type| Text Display                | Yes         | Vacation Types     | Included                                          | Auto-filled     |
| Start Date   | Text Display                | Yes         | Employee Request   | Included                                          | Auto-filled     |
| End Date     | Text Display                | Yes         | Employee Request   | Included                                          | Auto-filled     |
| Period       | Text Display                | Yes         | System Calculation | Included                                          | Auto-filled     |
| Notes        | Text Display                | No          | Employee Request   | Optional                                          | Blank           |
| Attachments  | File Link                   | Conditional | Employee Request   | Required if Sick leave                            | Auto-filled     |
| Approvals    | Text List                   | Yes         | System Log         | Names & job titles of approvers                   | Auto-filled     |
| Footer Info  | Text Display                | Yes         | System             | Print time, page #, user who printed              | Auto-filled     |

---

### 8. Print – Comparative Annual Report
| Field Name   | Data/UI Type                | Is Required | Data Source        | Business Rules                                     | Default Values  |
|--------------|-----------------------------|-------------|-------------------|---------------------------------------------------|-----------------|
| Department   | Text Display                | Yes         | Department Master  | Group by Department                               | Auto-filled     |
| Total Days   | Number Display              | Yes         | System Calculation | Sum of all employees’ vacation days               | Auto-calculated |
| Details Flag | Checkbox                    | No          | User Input         | If checked, expand employees under department     | Unchecked       |
| Employee Name| Text Display (Conditional)  | No          | Employee Master    | Shown only if Details checked                     | Auto-filled     |
| Period       | Text Display                | Yes         | System             | Report year                                       | Auto-filled     |
| Footer Info  | Text Display                | Yes         | System             | Print time, page #, user who printed              | Auto-filled     |

---

## B) Master Data Dictionaries (3)

### 9. Employee Master Data
| Field Name    | Data/UI Type | Is Required | Data Source | Business Rules                                        | Default Values |
|---------------|--------------|-------------|-------------|------------------------------------------------------|----------------|
| Employee ID   | Text         | Yes         | HR System   | Unique; Primary Key                                  | Auto-assigned  |
| Employee Name | Text         | Yes         | HR System   | Full legal name                                      | None           |
| Department    | Dropdown     | Yes         | Department Master | Must map to valid department                    | None           |
| Job Title     | Text         | Yes         | HR System   | Used in reporting                                    | None           |
| Employee Status| Enum        | Yes         | HR System   | Active, Trainee, Inactive; Trainees not eligible     | Active         |
| Hire Date     | Date         | Yes         | HR System   | Used to calculate entitlement (21/30 days rule)      | None           |
| Leave Balance | Number       | Yes         | System Calc | Auto-calculated: Total – Taken – Pending = Balance   | Auto-calc      |

---

### 10. Vacation Types Master Data
| Field Name     | Data/UI Type | Is Required | Data Source | Business Rules                                      | Default Values |
|----------------|--------------|-------------|-------------|----------------------------------------------------|----------------|
| Vacation Type  | Enum         | Yes         | Config      | Annual, Sick only                                  | None           |
| Entitlement    | Number       | Yes         | Config      | 21 or 30 days depending on years of service        | 21 days        |
| Carry Over     | Boolean      | Yes         | Config      | Annual: No carry-over; Sick: No carry-over         | False          |
| Proof Required | Boolean      | Yes         | Config      | Sick leave requires attachment                     | True for Sick  |

---

### 11. Departments Master Data
| Field Name    | Data/UI Type | Is Required | Data Source | Business Rules                                     | Default Values |
|---------------|--------------|-------------|-------------|---------------------------------------------------|----------------|
| Department ID | Text         | Yes         | Config      | Unique ID                                         | Auto-assigned  |
| Department Name| Text        | Yes         | Config      | Used in filters, reports, and groupings           | None           |
| Parent Dept   | Text (Optional)| No        | Config      | Supports hierarchy if needed                      | Null           |

---
