# Complaint Management System

Backend API of Public complaint Management System
at Galle District Secretariat Office

# End Points

#### USER
- GET check-username/:username
- POST register
- POST login
- GET get-user
- PUT update-user/:userId
- PUT update-credential/:userId
- PUT verify-user/:userId
- PUT disable-user/:userId

#### CUSTOMER
- POST add
- GET get-customer
- PUT update-customer/:customerId

#### COMPLAINT
- POST add
- GET get-complaint
- PUT update/:complaintId

#### UTILS
- POST add-div
- POST add-gn-office
- GET all-divs
- GET all-gn-offices