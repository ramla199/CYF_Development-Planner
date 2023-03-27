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
  sender_username VARCHAR,
  message_title VARCHAR(100),
  message_text VARCHAR(1000),
  PRIMARY KEY (message_id),
  FOREIGN KEY (sender_id) REFERENCES users(user_id),
  FOREIGN KEY (receipient_id) REFERENCES users(user_id), 
  FOREIGN KEY (sender_username) REFERENCES users(username)


CREATE TABLE messages(
      message_id SERIAL,
      user_id UUID,
      message_text VARCHAR(1000) NOT NULL,
      PRIMARY KEY (message_id),
      FOREIGN KEY (user_id) REFERENCES users(user_id)

);















-- ba9ca488-6484-4bd2-a29b-547ab891a078 pumba
--  2ddc9080-32ca-4942-a452-4fc53dbf4bbe barbie


-- e65edccf-d4b2-4a14-9fbd-70b3d57429c7 bobafett

-- 697e6d96-4291-4151-b153-79c36d5b89cc sawgererra
