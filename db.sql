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


--feedbacks
CREATE TABLE feedbacks (
  feedback_id SERIAL,
  user_id UUID,
  feedback_text VARCHAR(1000) NOT NULL,
  PRIMARY KEY (feedback_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);


--messages
-- What are messages for? I would have expected a message to have a sender and receiver user ID, but these only seem to have one user associated?
CREATE TABLE messages(
      message_id SERIAL,
      user_id UUID,
      message_text VARCHAR(1000) NOT NULL,
      PRIMARY KEY (message_id),
      FOREIGN KEY (user_id) REFERENCES users(user_id)
);

