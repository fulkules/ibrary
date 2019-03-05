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
    id int NOT NULL,
    u_id int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (u_id) REFERENCES users (id),
    name varchar(255),
    time varchar(50),
    date varchar(50)
)

CREATE TABLE goal (
    id int NOT NULL,
    u_id int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (u_id) REFERENCES users (id),
    name varchar(255),
    time varchar(50),
    date varchar(50)
)

CREATE TABLE sub_task (
    id int NOT NULL,
    t_id int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (t_id) REFERENCES task (id),
    name varchar(255),
    complete boolean
)

CREATE TABLE sub_goal (
    id int NOT NULL,
    g_id int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (g_id) REFERENCES goal (id),
    name varchar(255),
    complete boolean
)

CREATE TABLE excite (
    id int NOT NULL,
    u_id int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (u_id) REFERENCES users (id),
    name varchar(255)
)

CREATE TABLE thanks (
    id int NOT NULL,
    u_id int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (u_id) REFERENCES users (id),
    name varchar(255)
)