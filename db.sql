
-- CREATE DATABASE dev_planner;


-- CREATE TABLE users(
--     user_id SERIAL,
--     username VARCHAR(50),
--     user_password VARCHAR(50),
--     user_role VARCHAR (8),
--     PRIMARY KEY (user_id)
-- );

-- CREATE TABLE feedbacks(
--     feedback_id SERIAL, 
--     user_id SERIAL,
--     feedback_text VARCHAR(1000),
--     PRIMARY KEY (feedback_id),
--     FOREIGN KEY (user_id) REFERENCES users(user_id)
-- );

-- CREATE TABLE plans(
--     plan_id SERIAL,
--     plan_text VARCHAR(1000)
-- )



CREATE DATABASE dev_planner;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--users
CREATE TABLE users(
    user_id uuid DEFAULT uuid_generate_v4(),
    user_fname VARCHAR(50) NOT NULL,
    user_lname VARCHAR(50) NOT NULL,
    -- Need to ensure that 'every user name' is unique
    -- However I suggest we remove 'UNIQUE' from user_email
    username VARCHAR(50) NOT NULL UNIQUE,
    user_email VARCHAR(50) NOT NULL,
    --
    user_password VARCHAR(250) NOT NULL,
    user_role VARCHAR(8) NOT NULL,
    PRIMARY KEY (user_id)
);

--feedbacks
CREATE TABLE feedbacks (
  feedback_id SERIAL,
  user_id UUID,
  feedback_text VARCHAR(1000) NOT NULL,
  PRIMARY KEY (feedback_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE messages (
  message_id SERIAL,
  user_id UUID,
  message_text VARCHAR(500),
  PRIMARY KEY (message_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Plans
INSERT INTO users (user_fname, user_lname, username, user_email, user_password, user_role) 
                                VALUES ('joe','bloggs','joeb', 'joeb','joeb@gmail.com','student');


INSERT INTO users (user_fname, user_lname, username, user_email, user_password, user_role) 
                                VALUES ('fred','bloggs','fredb', 'fredb','fredb@gmail.com','student');

CREATE TABLE plans(    
    plan_serial_id SERIAL,
    username VARCHAR(50) NOT NULL,
    created_timestamp CHAR(16) NOT NULL,
    amended_timestamp CHAR(16) NOT NULL,
    splan VARCHAR(1500) NOT NULL,
    mplan VARCHAR(1500) NOT NULL,
    aplan VARCHAR(1500) NOT NULL,
    rplan VARCHAR(1500) NOT NULL,
    tplan VARCHAR(1500) NOT NULL,
    preamble VARCHAR(300) NOT NULL,
    PRIMARY KEY (username, created_timestamp)
);

DELETE FROM plans WHERE username = 'joeb';
DELETE FROM plans WHERE username = 'fredb';


-- Plans from https://www.betterup.com/blog/smart-goals-examples

INSERT INTO plans (username, created_timestamp,  amended_timestamp,
                                splan, mplan, aplan, rplan, tplan, preamble) 
     VALUES ('joeb',':20230101:123400',':20230101:123400', 
                    'I''d like to start training every day to run a marathon.',
                    'I will use my Apple Watch to track my training progress as my mileage increases.',
                    'I''ve already run a half-marathon this year, so I have a solid base-fitness level.',
                    'I value my health and wellness, and this goal will help me sustain that.',
                    'The marathon is a year away, so I need to be ready by then.',
                    'I''d like to start training every day to run a marathon.');


INSERT INTO plans (username, created_timestamp,  amended_timestamp,
                                splan, mplan, aplan, rplan, tplan, preamble) 
     VALUES ('joeb',':20230103:124522',':20230103:124522', 
                    'I''d like to write a novel.',
                    'I want to write at least 2,000 words a day for three months.',
                    'I''m retired now, so I have more time to dedicate to this project.',
                    'Reading and writing have always been a passion of mine.',
                    'I''ll start writing in the first week of July and finish my first draft by December.',
            'I''ll start writing in the first week of July and finish my first draft by December.');