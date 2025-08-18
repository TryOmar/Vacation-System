# Minutes Of Meeting  
**Date:** Thursday, 7 August  
**Time:** 11:00 AM - 2:00 PM  

---

## Agenda
1. Vacation request and approval process  
2. Issues with current system  
3. Proposed solutions and system requirements  

---

## Business Related Q&A
1. **Responsibility for vacation requests?**  
   ➔ Flow: Employee → Direct Manager → HR → General Manager (all must approve)

2. **Organization/department structure?**  
   ➔ One organization with multiple departments

3. **Uniform vacation policies?**  
   ➔ Yes, all departments follow same process

4. **Maximum concurrent vacations?**  
   ➔ No system constraints

5. **Non-Saudi/non-Muslim employees?**  
   ➔ Only Muslim Saudi employees in scope

6. **Causes of processing delays?**  
   ➔ High volume + single responsible employee + paper-based system

7. **Causes of balance inaccuracies?**  
   ➔ Multiple paper copies + cross-department errors

8. **Rejection reasons?**  
   ➔ Missing documents, insufficient days, or work needs

9. **HR override for balances?**  
   ➔ No - system-calculated only

10. **Part-time employees?**  
    ➔ Only full-time employees included

11. **Notifications for cancellations?**  
    ➔ Yes (to HR and manager)

12. **Request status notifications?**  
    ➔ Yes (required for acceptance/rejection)

13. **Mid-vacation cancellations?**  
    ➔ No - must cancel before start date

14. **Unused vacation carryover?**  
    ➔ Forfeited without compensation

15. **Leave types included?**  
    ➔ Annual and sick leave only

16. **Zero-balance exceptions?**  
    ➔ Yes (with variables/flags)

17. **Restricted vacation days?**  
    ➔ No (managers may reject based on work needs)

18. **Balance update timing?**  
    ➔ After General Manager approval

19. **Approval deadlines?**  
    ➔ No deadlines - auto-escalation after 2 days

---

## Application Related Q&A
1. **Overlapping request handling?**  
   ➔ Yes (for same employee only)

2. **Notification detail level?**  
   ➔ Header + system link only

3. **Include previous vacation data?**  
   ➔ Not required

4. **Platform requirements?**  
   ➔ Mobile app for requests, website for actions

5. **Trainee handling?**  
   ➔ No vacations + system flag for trainees

6. **Configurable policy variables?**  
   ➔ Yes (for cross-company maintainability)

7. **Vacation history logs?**  
   ➔ Yes

8. **Employee data management?**  
   ➔ Excel migration to system database

9. **Appeal functionality?**  
   ➔ Out of scope

10. **Unplanned vacation support?**  
    ➔ Planned vacations only

11. **Sick leave documentation?**  
    ➔ Yes (verified documents required)

12. **Bridging policy?**  
    ➔ Out of scope

13. **Vacation history access?**  
    ➔ Yes (non-editable reports)

---

## Key Notes & Requirements
### Policy
- Compliant with Saudi regulations only
- 21 vacation days/year standard
- 30 days/year for employees with >10 years service OR age ≥50
- Clarification needed: 10-year requirement within same company?
- Annual/sick leave only for Muslim Saudi full-time employees
- Official holidays out of scope
- No bridging policy
- No appeal process for rejections

### System Functionality
- Planned vacations only
- Fully automated process (no manual overrides)
- Weekly/monthly/yearly departmental reports
- Auto-escalation for delayed approvals
- Stage-based stakeholder notifications
- Special handling required for GM vacation requests
- Trainee flag implementation
- Configurable policy variables
- Non-editable historical reports