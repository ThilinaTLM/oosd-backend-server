# Complaint Management System

Backend API of Public complaint Management System
at Galle District Secretariat Office

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

#### API-COMPLAINT
- POST add-complaint
- POST add-attachment/:complaintId/:attachmentId
- GET get-complaint/?query
- GET get-attachments/:complaintId
- GET get-complaint-log/:complaintId
- PUT update-status/:complaintId

#### API-UTILS
- POST add-div
- POST add-gn-office
- GET all-divs
- GET all-gn-offices

#### FILE
- GET /attachment/:attachmentId
- POST /upload/attachment


Database Details
> mysql -h sql12.freemysqlhosting.net -u sql12368059 -pjIlTR1bB9p -D sql12368059
> source ./src/database/migration/schema.sql
> source ./src/database/migration/insert.sql