
CREATE DATABASE dev_planner;


CREATE TABLE users(
    user_id SERIAL,
    username VARCHAR(50),
    user_password VARCHAR(50),
    user_role VARCHAR (8),
    PRIMARY KEY (user_id)
);

CREATE TABLE feedbacks(
    feedback_id SERIAL, 
    user_id SERIAL,
    feedback_text VARCHAR(1000),
    PRIMARY KEY (feedback_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE plans(
    plan_id SERIAL,
    plan_text VARCHAR(1000)
)

