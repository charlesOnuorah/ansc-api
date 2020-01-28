CREATE TABLE IF NOT EXISTS USER_ROLES(
	roleid int primary key AUTO_INCREMENT,
    rolename varchar(50) not null,
    status TINYINT DEFAULT 1 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO USER_ROLES(rolename)
values ('enumerator'),
('enumerator_admin');

CREATE TABLE IF NOT EXISTS BASE_USERS(
	userid int primary key AUTO_INCREMENT,
    firstname varchar(100) not null,
    lastname varchar(100) not null,
    email varchar(250) not null,
    contactLine varchar(20) not null,
    username varchar(20) not null,
    password varchar(300) default '$2a$10$2g3Ms3pU0W4jZMCDa5Jnze9khHomZMuTkT2fuuWjhcKdraMp1nikC',
    roleid int not null,
    resetPassword TINYINT DEFAULT 1,
    last_password_rest TIMESTAMP,
    FOREIGN KEY (roleid)
    REFERENCES USER_ROLES (roleid),
    status TINYINT DEFAULT 1 NOT NULL,
    authStatus TINYINT DEFAULT 0 NOT NULL,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO BASE_USERS(firstname, lastname, email, contactLine, username, roleid)
values('charles','onuorah', 'charles.onuorah@yahoo.com', '08163113450', 
'08163113450',1);

  "INSERT INTO user_roles(rolename) values ('enumerator');\n"+
                    "INSERT INTO user_roles(rolename)values ('enumerator_admin');\n"+
                    "CREATE TABLE IF NOT EXISTS base_users(\n"+
                        "userid int primary key AUTO_INCREMENT,\n"+
                        "firstname varchar(100) not null,\n"+
                        "lastname varchar(100) not null,\n"+
                        "email varchar(250) not null,\n"+
                        "contactLine varchar(20) not null,\n"+
                        "username varchar(20) not null,\n"+
                        "password varchar(300) default '$2a$10$2g3Ms3pU0W4jZMCDa5Jnze9khHomZMuTkT2fuuWjhcKdraMp1nikC',\n"+
                        "roleid int not null,\n"+
                        "resetPassword TINYINT DEFAULT 1,\n"+
                        "last_password_rest TIMESTAMP,\n"+
                        "FOREIGN KEY (roleid)\n"+
                        "REFERENCES user_roles (roleid),\n"
                        "status TINYINT DEFAULT 1 NOT NULL,\n"+
                        "authStatus TINYINT DEFAULT 0 NOT NULL,\n"+
                        "last_login TIMESTAMP,\n"+
                        "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n"+
                    ");\n"+
                    "INSERT INTO base_users(firstname, lastname, email, contactLine, username, roleid)\n"+
                    "values('charles','onuorah', 'charles.onuorah@yahoo.com', '08163113450',\n"+
                    "'08163113450',1);"