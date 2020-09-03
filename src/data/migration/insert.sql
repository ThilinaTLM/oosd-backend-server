

INSERT INTO cms.authentications
        (user_id, username, hash, active, permission_code)
    VALUES
        (1, 'thilina', '$2b$10$ZEG9FptyxDFcuFo6dmw5N.c.349UbFCRlKISi.gVkFOK4U0vTp.KO', 1, 4294967295);
        -- user with admin level permission
        -- pass '12345'

INSERT INTO cms.authentications
        (user_id, username, hash, active, permission_code)
    VALUES
        (2, 'pasan', '$2b$10$ZEG9FptyxDFcuFo6dmw5N.c.349UbFCRlKISi.gVkFOK4U0vTp.KO', 1, 0);
        -- pass '12345'

INSERT INTO cms.authentications
        (user_id, username, hash, active, permission_code)
    VALUES
        (3, 'kaveesh', '$2b$10$ZEG9FptyxDFcuFo6dmw5N.c.349UbFCRlKISi.gVkFOK4U0vTp.KO', 1, 0);

INSERT INTO cms.users
    (id, first_name, last_name, email, telephone, role, office_id)
VALUES
    (1, 'Thilina', 'Lakshan', 'thilina.18@cse.mrt.ac.lk', '0723367565', '0', 0);