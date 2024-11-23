CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    email varchar(255) NOT NULL
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    status varchar(255) NOT NULL,
    user_id int NOT NULL,
    color varchar(255) NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    status varchar(255) NOT NULL,
    project_id int NOT NULL,
    color varchar(255) NOT NULL,

    FOREIGN KEY (project_id) REFERENCES projects(id)
);