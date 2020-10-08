# Complaint Management System

Backend API of Public complaint Management System at Galle District Secretariat Office.

# Temporary Remote Database
```bash
mysql -h sql12.freemysqlhosting.net -u sql12369606 -pPU3MyFCCf7 -D sql12369606 | (2020-10-08)
mysql -h db4free.net -u thilinatlm2 -pTLM98@mysql -D cms_dev_oosd
mysql -u tlm -p12345 -D cms
source ./src/database/migration/schema.sql
source ./src/database/migration/insert.sql
```

---
# End Points

#### API-USER
- POST register
- POST login
- GET check-username/:username
- GET get-user/?query
- PUT update-user/:userId
- PUT update-credential/:userId
- PUT verify-user/:userId
- PUT disable-user/:userId

#### API-CUSTOMER
- POST add
- GET get-customer/?query
- PUT update-customer/:customerId
- GET count

#### API-COMPLAINT
- POST add-complaint
- POST add-attachment/:complaintId/:attachmentId
- GET get-complaint/?query
- GET get-attachments/:complaintId
- GET get-complaint-log/:complaintId
- PUT update-status/:complaintId
- GET get-count/?query

#### API-UTILS
- POST add-div
- POST add-gn-office
- GET all-divs
- GET all-gn-offices

#### FILE
- GET /attachment/:attachmentId
- POST /upload/attachment

---
# Business Login Models

## User Roles
- Administrator
- District Officer
- District Secretariat
- Divisional Officer
- Divisional Secretariat

## Complaint states
- Draft
- Awaiting Approval
- Approved
- Awaiting Accept
- In Progress
- Awaiting Div Sec Review
- Div Sec Reviewed
- Awaiting Dis Sec Reviewed
- Dis Sec Reviewed
- Solved
- Rejected

## Complaint Types
- Direct to Division
- Direct to District
- By Presidential Office
- By Prime Minister Office
- Third-party Department

## User Fields

### Credentials
- username
- password
- verified

### Details
- User ID
- First Name
- Last Name
- Role
- Email
- Telephone
- Office

## Customer Fields
- Customer ID
- Full Name
- NIC
- Email
- Telephone
- Address
- Divisional Office
- Grama Niladhari Office

## Divisional | Grama Niladhari Office Fields
- Name
- Address

## Complaint Fields
- Complaint ID
- Ref No
- Type
- Customer ID
- Subject
- Description
- Status
- Created Date
- Assigned Division
- Assigned By
- Assigned Date



