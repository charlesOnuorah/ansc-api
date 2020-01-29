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

CREATE TABLE IF NOT EXISTS BASE_TERRITORY(
lgaid int primary key AUTO_INCREMENT,
state varchar(100) not null,
lga varchar(100) not null,
datecreated timestamp default CURRENT_TIMESTAMP 
);

insert into BASE_TERRITORY(state, lga)
values ('LAGOS', 'KOSOFE'),
 ('LAGOS', 'Lagos Island'),
 ('LAGOS', 'OSHODI'),
 ('ENUGU', 'OJI RIVER'),
 ('LAGOS', 'Surulere');
 
select * from BASE_TERRITORY;

CREATE TABLE IF NOT EXISTS base_user_lga_access(
id int primary key AUTO_INCREMENT,
lgaid int not null,
mappedTo varchar(100) not null,
createdBy varchar(100) not null,
datecreated timestamp default CURRENT_TIMESTAMP,
FOREIGN KEY (lgaid)
REFERENCES base_territory (lgaid),
FOREIGN KEY (mappedTo)
REFERENCES base_users(username),
FOREIGN KEY (createdBy)
REFERENCES base_users(username)
);

insert into base_user_lga_access(lgaid, mappedTo, createdBy)
values (2, '08163113450', '07010671710');

select * from base_user_lga_access;


CREATE  INDEX username ON base_users(username);



CREATE TABLE IF NOT EXISTS user_roles(
roleid int primary key AUTO_INCREMENT,
rolename varchar(50) not null,
status TINYINT DEFAULT 1 NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
INSERT INTO user_roles(rolename) values ('enumerator');
CREATE TABLE IF NOT EXISTS base_users(
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
INSERT INTO base_users(firstname, lastname, email, contactLine, username, roleid)
values('charles','onuorah', 'charles.onuorah@yahoo.com', '08163113450',
'08163113450',1);


select * from base_users;