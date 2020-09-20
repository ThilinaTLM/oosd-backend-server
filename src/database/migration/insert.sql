
-- User Roles
INSERT INTO user_roles VALUES ('Admin', '');
INSERT INTO user_roles VALUES ('District Officer', '');
INSERT INTO user_roles VALUES ('District Secretariat', '');
INSERT INTO user_roles VALUES ('Divisional Officer', '');
INSERT INTO user_roles VALUES ('Divisional Secretariat', '');

-- Complaint States
INSERT INTO complaint_states VALUES ('Draft', '');
INSERT INTO complaint_states VALUES ('Awaiting Approval', '');
INSERT INTO complaint_states VALUES ('Approved', '');
INSERT INTO complaint_states VALUES ('Awaiting Accept', '');
INSERT INTO complaint_states VALUES ('In Progress', '');
INSERT INTO complaint_states VALUES ('Awaiting Div Sec Review', '');
INSERT INTO complaint_states VALUES ('Div Sec Reviewed', '');
INSERT INTO complaint_states VALUES ('Awaiting Dis Sec Reviewed', '');
INSERT INTO complaint_states VALUES ('Dis Sec Reviewed', '');
INSERT INTO complaint_states VALUES ('Solved', '');
INSERT INTO complaint_states VALUES ('Rejected', '');

-- Complaint Types
INSERT INTO complaint_types VALUES ('Direct', '');
INSERT INTO complaint_types VALUES ('By Presidential Office', '');
INSERT INTO complaint_types VALUES ('By Prime Minister Office', '');
INSERT INTO complaint_types VALUES ('Third-party Department', '');

-- Users
INSERT INTO users VALUES ('f1d41c52-2219-4bee-8aa0-035c2a16e786', 'Admin', 'Admin', 'User', '', '', NULL);
INSERT INTO credentials VALUES ('f1d41c52-2219-4bee-8aa0-035c2a16e786', 'admin', '$2b$10$K.4B6mFBrtUltu8gjQOICOPORLSQ0FfILsrN1iKty5PAbYaQ7CJ8u', 1 );
