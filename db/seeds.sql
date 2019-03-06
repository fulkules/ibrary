CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE TABLE users (
    id serial primary key,
    email varchar(255),
    username varchar(100),
    password varchar(100)
)

CREATE TABLE task (
    id serial primary key,
    u_id int REFERENCES users(id),
    name varchar(255),
    time varchar(50),
    date varchar(50)
)

CREATE TABLE goal (
    id serial primary key,
    u_id int REFERENCES users(id),
    name varchar(255),
    time varchar(50),
    date varchar(50)
)

CREATE TABLE sub_task (
    id serial primary key,
    t_id int REFERENCES task(id),
    name varchar(255),
    complete boolean
)

CREATE TABLE sub_goal (
    id serial primary key,
    g_id int REFERENCES goal(id),
    name varchar(255),
    complete boolean
)

CREATE TABLE excite (
    id serial primary key,
    u_id int REFERENCES users(id),
    name varchar(255)
)

CREATE TABLE thanks (
    id serial primary key,
    u_id int REFERENCES users(id),
    name varchar(255)
)