-- https://bcrypt-generator.com/ used to encrypt plaintext password
-- 10 salt rounds used!

INSERT INTO cms.authentications
        (user_id, username, hash, active, permission_code)
    VALUES
        (1, 'thilina', '$2y$10$zo.Juib5hfltN1vLm3.KPuxQ5pbV/yr59HDde/W6QV5W.Gw6jGo7i', 1, 4294967295);
        -- user with admin level permission
        -- pass 'thilina123'

INSERT INTO cms.authentications
        (user_id, username, hash, active, permission_code)
    VALUES
        (2, 'pasan', '$2y$10$x56hNW6IqsTfBIPjd25av.l1kfAlNOAvqSqEHewuksLQ3eZTmiz9.', 1, 0);
        -- pass '12345'

INSERT INTO cms.authentications
        (user_id, username, hash, active, permission_code)
    VALUES
        (3, 'kaveesh', '$2y$10$x56hNW6IqsTfBIPjd25av.l1kfAlNOAvqSqEHewuksLQ3eZTmiz9.', 1, 0);