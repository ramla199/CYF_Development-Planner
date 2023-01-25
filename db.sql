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
CREATE TABLE messages(
      message_id SERIAL,
      user_id UUID,
      message_text VARCHAR(1000) NOT NULL,
      PRIMARY KEY (message_id),
      FOREIGN KEY (user_id) REFERENCES users(user_id)
);



-- Users
INSERT INTO users (user_fname, user_lname, username, user_email, user_password, user_role) 
                           VALUES ('joe','bloggs','joeb', 'joeb@gmail.com', 'joeb', 'student');

INSERT INTO users (user_fname, user_lname, username, user_email, user_password, user_role) 
                        VALUES ('fred','bloggs','fredb', 'fredb@gmail.com','fredb', 'student');                                

-- Plans

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
                'I''d like to start training every day to run a marathon. ' ||
                    'I will use my Apple Watch to track my training progress as my mileage increases. ' ||
                    'I''ve already run a half-marathon this year, so I have a solid base-fitness level.'
            );


INSERT INTO plans (username, created_timestamp,  amended_timestamp,
                                splan, mplan, aplan, rplan, tplan, preamble) 
     VALUES ('joeb',':20230103:124522',':20230103:124522', 
                    'I''d like to write a novel.',
                    'I want to write at least 2,000 words a day for three months.',
                    'I''m retired now, so I have more time to dedicate to this project.',
                    'Reading and writing have always been a passion of mine.',
                    'I''ll start writing in the first week of July and finish my first draft by December.',
                    'I''d like to write a novel. ' ||
                    'I want to write at least 2,000 words a day for three months. ' ||
                    'I''m retired now, so I have more time to dedicate to this project.'
            );


INSERT INTO plans (username, created_timestamp,  amended_timestamp,
                                splan, mplan, aplan, rplan, tplan, preamble) 
     VALUES ('joeb',':20230106:124522',':20230106:124522', 
                    'I will learn new sales techniques to increase sales at work.',
                    'My goal is to double my sales in four months.',
                    'I''ve been a sales associate for two years now. ' ||
                          'I know the basics, and I''m ready to learn more.',
                    'I want to feel more confident at my job and learn new skills.',
                    'Tomorrow, I''ll start doing a LinkedIn training course on sales tactics ' ||
                           'and implement them on Monday at work. I have four months to see results.',
                    'I will learn new sales techniques to increase sales at work. ' ||
                          'My goal is to double my sales in four months. ' ||
                          'I''ve been a sales associate for two years now. ' ||
                          'I know the basics, and I''m ready to learn more. ' || 
                          'I want to feel more confident at my job and learn new skills.'
            );


INSERT INTO plans (username, created_timestamp,  amended_timestamp,
                                splan, mplan, aplan, rplan, tplan, preamble) 
     VALUES ('joeb',':20230107:102522',':20230107:102522', 
                    'I will ensure that my team members can count on me as a strong leader.',
                    'My goal is to survey my team members now and in three months to see how ' || 
                          'supported they feel.',
                    'I''ve been in this position for six months now, ' ||
                          'and I have previous management experience at my prior job.',
                    'As our company grows, I want to make sure that I''m supporting my team ' ||
                          'so they can learn and grow too.',
                    'I will become a better leader by the end of this quarter before the company ' ||
                          'takes on new projects and hire more staff.',
                    'I will ensure that my team members can count on me as a strong leader. ' ||
                          'My goal is to survey my team members now and in three months to see how ' || 
                          'supported they feel. ' ||
                          'I''ve been in this position for six months now, ' ||
                          'and I have previous management experience at my prior job.'
            );


INSERT INTO plans (username, created_timestamp,  amended_timestamp,
                                splan, mplan, aplan, rplan, tplan, preamble) 
     VALUES ('fredb',':20230108:082522',':20230108:082522', 
                    'I will help my team feel like they can communicate effectively ' ||
                          'and freely since we work virtually.',
                    'I''ll use more Slack channels to communicate with team members to encourage ' ||
                          'communication and see how often they use them.',
                    'All of us are tech-savvy and understand that communication skills are ' ||
                          'important for a team, so I''d like to strengthen those abilities.',
                    'I was just told that our work will remain virtual for the future, ' ||
                          'so we need to get better at communicating entirely online with one another.',
                    'I will send Slack invites to everyone tomorrow morning, and in a month, ' ||
                          'I''ll ask everyone how they feel about their communication abilities ' ||
                          'in our meeting.',      
                    'I will help my team feel like they can communicate effectively ' ||
                          'and freely since we work virtually. ' ||
                          'I''ll use more Slack channels to communicate with team members to encourage ' ||
                          'communication and see how often they use them.' ||
                          'All of us are tech-savvy and understand that communication skills are ' ||
                          'important for a team, so I''d like to strengthen those abilities.'
            );


INSERT INTO plans (username, created_timestamp,  amended_timestamp,
                                splan, mplan, aplan, rplan, tplan, preamble) 
     VALUES ('fredb',':20230111:184522',':20230111:184522', 
                    'I want to wake up earlier each morning to have more time for my morning routine.',
                    'I''ll start setting my alarm clock for 7:30 AM this week, and each week ' ||
                          'set it earlier by 30 minutes. Plus, I''ll write on my calendar the time ' ||
                          'when I actually woke up to measure progress.',
                    'My schedule allows me to go to bed at a decent time each night, ' ||
                          'so waking up earlier won''t take many hours of rest.',
                    'My morning routines are filled with social media, and I feel rushed trying ' ||
                          'to get to work each day, so waking up early would help me feel calmer.',
                    'In four weeks, I want to wake up two hours earlier than when I usually wake up now.',      
                    'I want to wake up earlier each morning to have more time for my morning routine. ' ||
                          'I''ll start setting my alarm clock for 7:30 AM this week, and each week ' ||
                          'set it earlier by 30 minutes. Plus, I''ll write on my calendar the time ' ||
                          'when I actually woke up to measure progress.'
           );