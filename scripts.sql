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

=== SCHOOLS ==========



CREATE TABLE IF NOT EXISTS school_type (
 id int primary key auto_increment,
 type varchar(100) not null,
 datecreated timestamp default current_timestamp
);

insert into school_type(type)
values ('Technical'),
 ('Junior'),
 ('Senior'),
 ('Junior & Senior'),
 ('Private');

 CREATE TABLE IF NOT EXISTS gender_category (
 id int primary key auto_increment,
 category varchar(100) not null,
 datecreated timestamp default current_timestamp
);

insert into gender_category(category)
values ('Boy'),
('Girls'),
('Mixed');

create table IF NOT EXISTS base_states
( id int primary key auto_increment,
  state varchar(50) not null,
  datecreated timestamp default current_timestamp
);

insert into base_states(state)
values ('Enugu'),
('Lagos');

create table IF NOT EXISTS base_owners(
id int primary key auto_increment,
type varchar(100) not null,
datecreated timestamp default current_timestamp
);


insert into base_owners(type)
values ('Proprietor'),
('State Government'),
('Federal Government');

create index category on gender_category(category);
create index type on school_type(type);
create index state on  base_states(state);


create table IF NOT EXISTS base_school(
	id int primary key auto_increment,
    schoolName varchar(250) not null,
    schoolNumber varchar(100) not null,
    address varchar(300) not null,
    lgaid int not null,
    stateid int not null,
    educationDistrict varchar(200) not null,
    schoolType int not null,
    schoolCategory int not null,
    principal varchar(100) not null,
    dateEstablishment date,
    telephoneNumber varchar(20) not null,
    mailingAddress varchar(100) not null,
    owner int not null,
    latitude varchar(100),
    longitude varchar(100),
    datecreated timestamp default current_timestamp,
    FOREIGN KEY (lgaid)
REFERENCES base_territory (lgaid),
FOREIGN KEY (stateid)
REFERENCES base_states (id),
FOREIGN KEY (schoolType)
REFERENCES school_type (id),
FOREIGN KEY (schoolCategory)
REFERENCES gender_category (id),
FOREIGN KEY (owner)
REFERENCES base_owners (id)
);  

create index schoolNumber on base_school(schoolNumber);

insert into base_school (schoolName, schoolNumber,
address, lgaid, stateid, educationDistrict, schoolType, schoolCategory, principal,
dateEstablishment,telephoneNumber,mailingAddress, owner, latitude, longitude)
values ('chir','23432', 'lekki phase 1', 1, 1, 'Victoria island', 1, 1, 'Mrs funke',null, '07010671710',
'1213',1, null, null
);


CREATE TABLE teachers(
	id int primary key auto_increment,
    schoolNumber varchar(100) not null,
    oracleNumber varchar(100) not null,
    registrationNumber varchar(100) not null,
    surname varchar(50) not null,
    firstname varchar(50) not null,
    otherNames varchar(100),
    sex varchar(25) not null,
    maidenName varchar(50) not null,
    gradeLevel varchar(25) not null,
    stateid int not null,
    dateOfBirth date not null,
    dateOfFirstAppointment date,
    dateOfInterStateTransfer date,
    dateOfConfirmation date,
    dateOfLastPromotion date,
    homeAddress varchar(100),
    telephoneNumber  varchar(25),
    pfa varchar(100),
    pfaNumber  varchar(100),
    stateResidentRegNumber varchar(100),
    email varchar(100),
    exitDate date,
    remark varchar(300),
    FOREIGN KEY (schoolNumber)
	REFERENCES base_school (schoolNumber),
    FOREIGN KEY (stateid)
	REFERENCES base_states (id),
    datecreated timestamp default current_timestamp
);



CREATE TABLE teacher_qualification(
id int primary key auto_increment,
qualification varchar(300) not null,
dateAcquired date not null,
teacherId int not null,
FOREIGN KEY (teacherId)
REFERENCES teachers (id),
datecreated timestamp default current_timestamp
);

create Table teacher_subjects(
id int primary key auto_increment,
subjectName varchar(100) not null,
teacherId int not null,
FOREIGN KEY (teacherId)
REFERENCES teachers (id),
datecreated timestamp default current_timestamp
);



CREATE TABLE IF NOT EXISTS students(
id int primary key auto_increment,
sPin varchar(20),
otherName varchar(100),
surname varchar(100) not null,
firstname varchar(100) not null,
dateOfBirth date not null,
placeOfBirth date,
sex varchar(20),
schoolNumber varchar(50),
stateid int not null,
lgaid int not null,
town varchar(100) not null,
religion varchar(100) not null,
class varchar(50) not null,
age varchar(50) not null,
dateOfAdmission date not null,
admissionNo varchar(50) not null,
studentAddress varchar(150) not null,
fatherFullName varchar(100) not null,
fatherAddress varchar(150),
motherAddress varchar(150),
fatherContact varchar(20) not null,
fatherOccupation varchar(20),
motherOccupation varchar(20),
guardianContact varchar(20) not null,
guardianName varchar(50) not null,
guardianAddress varchar(100) not null,
signatureOfGuardian varchar(300),
signatureOfStudent varchar(300),
medicalCondition varchar(300),
passportOfStudent varchar(300),
passportOfGuardian varchar(300),
FOREIGN KEY (stateid)
REFERENCES base_states (id),
FOREIGN KEY (lgaid)
REFERENCES base_territory (lgaid),
FOREIGN KEY (schoolNumber)
REFERENCES base_school (schoolNumber)
);

CREATE TABLE IF NOT EXISTS student_hobby(
id int primary key auto_increment,
hobby varchar(100),
studentId int not null,
FOREIGN KEY (studentId)
REFERENCES students (id)
);
