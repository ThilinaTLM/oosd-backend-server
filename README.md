# Complaint Management System

Backend API of Public complaint Management System at Galle District Secretariat Office.

# Temporary Remote Database
```bash
scp -i ~/.ssh/awslinux.pem ./ecosystem.config.js ubuntu@$HOST:/home/ubuntu/projects/oosd-backend-server/
mysql -h sql12.freemysqlhosting.net -u sql12369606 -pPU3MyFCCf7 -D sql12369606
mysql -h ec2-54-237-84-93.compute-1.amazonaws.com --port 3307 -u root -proot -D cms
mysql -u tlm -p12345 -D cms
source ./mysql/migration/schema.sql
source ./mysql/migration/insert.sql
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



