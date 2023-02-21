CREATE DATABASE dev_planner;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--users
CREATE TABLE users(
    user_id uuid DEFAULT uuid_generate_v4(),
    user_fname VARCHAR(50) NOT NULL,
    user_lname VARCHAR(50) NOT NULL,  
    username VARCHAR(50) NOT NULL UNIQUE,
    user_email VARCHAR(50) NOT NULL UNIQUE,
    user_password VARCHAR(250) NOT NULL,
    user_role VARCHAR(8) NOT NULL,
    PRIMARY KEY (user_id)
);

--drafts
CREATE TABLE drafts (
  draft_id SERIAL,
  user_id UUID,
  draft_title VARCHAR(100),
  draft_text VARCHAR(1000),
  PRIMARY KEY (draft_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE messages (
  message_id SERIAL,
  sender_id UUID,
  receipient_id UUID,
  draft_id SERIAL,
  PRIMARY KEY (message_id),
  FOREIGN KEY (sender_id) REFERENCES users(user_id),
  FOREIGN KEY (receipient_id) REFERENCES users(user_id),
  FOREIGN KEY (draft_id) REFERENCES drafts(draft_id)
);

-- -- users
--  a9d1da0a-6360-4837-8661-5ed0db982a65 | Helen      | Rog        | helen     | helen@gmail.com      | $2b$10$rCEThhHVb23YqWQh8nL7W.g8PtG0ouArZOD1Q0gpHt0Y1FObaClX6 | student
--  2bc5297f-2234-4231-9ed9-c0e77aed72a7 | John       | Smith      | john      | john@gmail.com       | $2b$10$1HRA35522NzSp.d88D18j.f91TbZU/ujxKZU4t3qOJ1d2W1ngziSS | mentor
--  f0c9a000-df5a-454b-b50e-cc96e877d8fe | ali        | nuri       | ali       | ali@gmail.com        | $2b$10$8lzh495i126HmTY0uEb6cujcdUqtJW9EHPDV4ikr0HvcmXqF6itTa | student
--  40847662-d22a-492a-b23f-88ab009709db | hello      | world      | heloworld | helloworld@gmail.com | $2b$10$Ghp9ypckeXs0EA4rItXFF.D6bsHfZvA0cDeycAQgVbccFXGTtFJqi | mentor


-- -- drafts
--   12 | 2bc5297f-2234-4231-9ed9-c0e77aed72a7 | hello 1     | hello 123
--        18 | f0c9a000-df5a-454b-b50e-cc96e877d8fe | hello 123   | hello 123
--        19 | f0c9a000-df5a-454b-b50e-cc96e877d8fe | hello 2     | hello text 2
--        27 | 40847662-d22a-492a-b23f-88ab009709db | message     | message to send

--    SELECT users.username, drafts.draft_id, drafts.draft_title, drafts.draft_text FROM users INNER JOIN drafts ON users.user_id = drafts.user_id WHERE users.user_id = $1 and drafts.draft_id=$2,

--    SELECT user_id, drafts.draft_id, drafts_draft_title, drafts.draft_text from drafts where user_id=$1 and draft_id=$2;

--    ALTER TABLE table_name 
-- ADD COLUMN column_name datatype column_constraint;

