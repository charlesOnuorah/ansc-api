import app from "../index";
import chai from 'chai';
import chaiHttp from 'chai-http';
var should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);

var { executeQuery } = require('../helper');

var { newUser, invalidToken, noUser, userDetail,uniqueSchool, duplicateUser, duplicateSchool } = require('./testAccounts');

describe('It should test all the end points', function (){
    before( function(done) {
        var sql = "", sql2 = '', sql3 = '', sql4 = ''
        sql = sql + "CREATE TABLE IF NOT EXISTS user_roles(\n"+
                        "roleid int primary key AUTO_INCREMENT,\n"+
                        "rolename varchar(50) not null,\n"+
                        "status TINYINT DEFAULT 1 NOT NULL,\n"+
                        "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);"
        sql2 = sql2 +     "INSERT INTO user_roles(rolename) values ('enumerator'), ('admin');"
        sql3 = sql3 +     "CREATE TABLE IF NOT EXISTS base_users(\n"+
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
                            "REFERENCES user_roles (roleid),\n"+
                            "status TINYINT DEFAULT 1 NOT NULL,\n"+
                            "authStatus TINYINT DEFAULT 0 NOT NULL,\n"+
                            "last_login TIMESTAMP,\n"+
                            "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n"+
                        ");"
        let sql3a = "CREATE  INDEX username ON base_users(username);"
        sql4 = sql4 + "INSERT INTO base_users(firstname, lastname, email, contactLine, username, roleid)\n"+
                        "values('charles','onuorah', 'charles.onuorah@yahoo.com', '08163113450',\n"+
                        "'08163113450',1), ('charles','onuorah', 'charles.onuorah@yahoo.com', '07010671710','07010671710',2);"
        let sql5 = '' + "CREATE TABLE IF NOT EXISTS base_territory(\n"+
                        "lgaid int primary key AUTO_INCREMENT,\n"+
                        "state varchar(100) not null,\n"+
                        "lga varchar(100) not null,\n"+
                        "datecreated timestamp default CURRENT_TIMESTAMP \n"+
                        ");"
        let sql6 = "" + "insert into base_territory(state, lga)\n"+
                        "values ('LAGOS', 'KOSOFE'),\n"+
                        "('LAGOS', 'Lagos Island'),\n"+
                        "('LAGOS', 'OSHODI'),\n"+
                        "('ENUGU', 'OJI RIVER'),"+
                        "('LAGOS', 'Surulere');"
        let sql7 = "" + "CREATE TABLE IF NOT EXISTS base_user_lga_access(\n"+
                        "id int primary key AUTO_INCREMENT,\n"+
                        "lgaid int not null,\n"+
                        "mappedTo varchar(100) not null,\n"+
                        "createdBy varchar(100) not null,\n"+
                        "datecreated timestamp default CURRENT_TIMESTAMP,\n"+
                        "FOREIGN KEY (lgaid)\n"+
                        "REFERENCES base_territory (lgaid),\n"+
                        "FOREIGN KEY (mappedTo)\n"+
                        "REFERENCES base_users(username),\n"+
                        "FOREIGN KEY (createdBy)\n"+
                        "REFERENCES base_users(username)\n"+
                        ");"
        let sql8 = "CREATE TABLE IF NOT EXISTS school_type (\n"+
            "id int primary key auto_increment,\n"+
            "type varchar(100) not null,\n"+
            "datecreated timestamp default current_timestamp);"
        let sql9 = "insert into school_type(type)\n"+
                    "values ('Technical'),\n"+
                    "('Junior'),\n"+
                    "('Senior'),\n"+
                    "('Junior & Senior'),\n"+
                    "('Private');"
        let sql10 =  "CREATE TABLE IF NOT EXISTS gender_category (id int primary key auto_increment,category varchar(100) not null,datecreated timestamp default current_timestamp);"
        
        let sql11 = "insert into gender_category(category)values ('Boy'),('Girls'),('Mixed');"
        let sql12 = "create table IF NOT EXISTS base_states( id int primary key auto_increment,state varchar(50) not null,datecreated timestamp default current_timestamp);"
        let sql13 = "insert into base_states(state)values ('Enugu'),('Lagos');" 
        let sql14 = "create table IF NOT EXISTS base_owners( id int primary key auto_increment,type varchar(100) not null,datecreated timestamp default current_timestamp);"  
        let sql15 = "insert into base_owners(type)values ('Proprietor'),('State Government'),('Federal Government');"
        let sql16 = "create index category on gender_category(category);"
        let sql16b = "create index type on school_type(type);"
        let sql16c = "create index state on  base_states(state);"
        let sql17 = "create table IF NOT EXISTS base_school(\n"+
                    "id int primary key AUTO_INCREMENT,\n"+
                    "schoolName varchar(250) not null,\n"+
                    "schoolNumber varchar(100) not null,\n"+
                    "address varchar(300) not null,\n"+
                    "lgaid int not null,\n"+
                    "stateid int not null,\n"+
                    "educationDistrict varchar(200) not null,\n"+
                    "schoolType int not null,\n"+
                    "schoolCategory int not null,\n"+
                    "principal varchar(100) not null,\n"+
                    "dateEstablishment date,\n"+
                    "telephoneNumber varchar(20) not null,\n"+
                    "mailingAddress varchar(100) not null,\n"+
                    "owner int not null,\n"+
                    "latitude varchar(100),\n"+
                    "longitude varchar(100),\n"+
                    "datecreated timestamp default current_timestamp,\n"+
                    "FOREIGN KEY (lgaid)\n"+
                    "REFERENCES base_territory (lgaid),\n"+
                    "FOREIGN KEY (stateid)\n"+
                    "REFERENCES base_states (id),\n"+
                    "FOREIGN KEY (schoolType)\n"+
                    "REFERENCES school_type (id),\n"+
                    "FOREIGN KEY (schoolCategory)\n"+
                    "REFERENCES gender_category (id),\n"+
                    "FOREIGN KEY (owner)\n"+
                    "REFERENCES base_owners (id));"
                    
        let sql18 = "create index schoolNumber on base_school(schoolNumber);"
        let sql19 = "insert into base_school (schoolName,schoolNumber,\n"+
            "address, lgaid, stateid, educationDistrict, schoolType, schoolCategory, principal,\n"+
            "dateEstablishment,telephoneNumber,mailingAddress, owner, latitude, longitude)\n"+
            "values ('okeyson shools','2348431', 'lekki phase 1', 1, 1, 'Victoria island', 1, 1, 'Mrs funke',null, '07010671710',\n"+
            "'1213',1, null, null);"
            
        try{

                 executeQuery(sql).then(() => {
                    executeQuery(sql2).then(() => {
                        executeQuery(sql3).then(() => {
                            executeQuery(sql3a).then(() => {
                                executeQuery(sql4).then(() =>{
                                    executeQuery(sql5).then(() => {
                                        executeQuery(sql6).then(() => {
                                            executeQuery(sql7).then(() => {
                                                executeQuery(sql8).then(() => {
                                                    executeQuery(sql9).then(() => {
                                                        executeQuery(sql10).then(() => {
                                                            executeQuery(sql11).then(() => {
                                                                executeQuery(sql12).then(() => {
                                                                    executeQuery(sql13).then(() => {
                                                                        executeQuery(sql14).then(() => {
                                                                            executeQuery(sql15).then(() => {
                                                                                executeQuery(sql16).then(() => {
                                                                                    executeQuery(sql16b).then(() => {
                                                                                        executeQuery(sql16c).then(() => {
                                                                                            executeQuery(sql17).then(() => {
                                                                                                executeQuery(sql18).then(() => {
                                                                                                    executeQuery(sql19).then(() => done())
                                                                                                })
                                                                                            })
                                                                                        })
                                                                                    })
                                                                                })
                                                                            })
                                                                        })
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            }catch(error){
                console.log('eeror', error)
               return done(error)
            }
    })
    after( function (done){
            var sql = '', sql2 = ''
         sql = sql + "DROP TABLE IF EXISTS user_roles;"
           sql2 = sql2 + "DROP TABLE IF EXISTS base_users;"
           let sql3 = "DROP TABLE IF EXISTS base_territory"
           let sql4 = "DROP TABLE IF EXISTS base_user_lga_access"
           let sql5 = "DROP TABLE IF EXISTS base_school;"
           let sql6 = "DROP TABLE IF EXISTS base_onwers;"
           let sql7 = "DROP TABLE IF EXISTS base_states;"
           let sql8 = "DROP TABLE IF EXISTS school_type;"
           let sql9 = "DROP TABLE IF EXISTS gender_category;"
        try{
            executeQuery(sql4).then(() => {
                executeQuery(sql2).then(() => {
                    executeQuery(sql5).then(() => {
                        executeQuery(sql3).then(() =>  {
                            executeQuery(sql).then(() => {
                                executeQuery(sql6).then(() => {
                                    executeQuery(sql7).then(() => {
                                        executeQuery(sql8).then(() => {
                                            executeQuery(sql9).then(() => done())
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        }catch(error){
            return done(error)
        }
    })

    
    describe('it should login a user',() => {
        
        it('response should be an object', (done) => {
            chai.request(app).post('/api/v1/auth/signin').type('form').send(newUser).end((err,res) => {
                
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done()
            })
        })

        it('It should not login a user not on database', (done) => {
            chai.request(app).post('/api/v1/auth/signin').type('form').send(noUser).end((err,res) => {
                
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('message');
                done()
            })
        })
        it('It should not login with incorrect password', (done) => {
            chai.request(app).post('/api/v1/auth/signin').type('form')
                .send({username:'08163113450', password:'icorrect'}).end((err,res) => {
                
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('message');
                done()
            })
        })
    })
    describe('it should not login a user without username',() => {
        
        it('response should be an object', (done) => {
            chai.request(app).post('/api/v1/auth/signin').type('form').send({password: 'jsuslsy'}).end((err,res) => {
                
                expect(res).to.be.an('object');
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('message');
                done()
            })
        })
    })
    describe('it should not login a user with no password',() => {
        
        it('response should be an object', (done) => {
            chai.request(app).post('/api/v1/auth/signin').type('form').send({username:'1234'}).end((err,res) => {
                expect(res).to.be.an('object');
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('message');
                done()
            })
        })

    })

    describe('it should signup an agent',() => {
        it('It should not allow action for headers without x-access-token', (done) => {
            chai.request(app).post('/api/v1/auth/agents/signup').type('form')
                .send({}).end((err,res) => {
                
                expect(res).to.be.an('object');
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('message');
                done()
            })
        })
        it('It should not allow action for non-admin and non-super admin role', (done) => {
            chai.request(app).post('/api/v1/auth/signin').type('form')
                    .send({username:"08163113450", password:"bacon"}).end((err, res) => {
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                const token = res.body.token
                chai.request(app).post('/api/v1/auth/agents/signup').set('x-access-token', token)
                    .send(userDetail).end((err, res) => {
                        expect(res).to.be.an('object');
                        expect(res).to.have.status(403);
                       // expect(res.body.data).to.have.property('message');
                        done()
                    })
            })
        })
        it('It should fail when the required fields are missing', (done) => {
            chai.request(app).post('/api/v1/auth/signin').type('form')
                    .send({username:"07010671710", password:"bacon"}).end((err, res) => {
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                const token = res.body.token
                chai.request(app).post('/api/v1/auth/agents/signup').set('x-access-token', token)
                    .send({}).end((err, res) => {
                        expect(res).to.be.an('object');
                        expect(res).to.have.status(400);
                       // expect(res.body.data).to.have.property('message');
                        done()
                    })
            })
        })
        it('It should fail when creating agents with same username', (done) => {
            chai.request(app).post('/api/v1/auth/signin').type('form')
                    .send({username:"07010671710", password:"bacon"}).end((err, res) => {
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                const token = res.body.token
                chai.request(app).post('/api/v1/auth/agents/signup').set('x-access-token', token)
                    .send(duplicateUser).end((err, res) => {
                        expect(res).to.be.an('object');
                        expect(res).to.have.status(406);
                        expect(res.body).to.have.property('message');
                        expect(res.body.message).to.equal('Username already exists')
                        done()
                    })
            })
        })
        it('It should create an agent successfully', (done) => {
            chai.request(app).post('/api/v1/auth/signin').type('form')
                    .send({username:"07010671710", password:"bacon"}).end((err, res) => {
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                const token = res.body.token
                chai.request(app).post('/api/v1/auth/agents/signup').set('x-access-token', token)
                    .send(userDetail).end((err, res) => {
                        expect(res).to.be.an('object');
                        expect(res).to.have.status(201);
                        expect(res.body).to.have.property('message');
                        expect(res.body.message).to.equal('User created successfully')
                        done()
                    })
            })
        })
        it('It should fail when passed an invalid token', (done) => {
            chai.request(app).post('/api/v1/auth/signin').type('form')
                    .send({username:"07010671710", password:"bacon"}).end((err, res) => {
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                const token = res.body.token
                chai.request(app).post('/api/v1/auth/agents/signup').set('x-access-token', invalidToken)
                    .send(userDetail).end((err, res) => {
                        expect(res).to.be.an('object');
                        expect(res).to.have.status(403);
                        expect(res.body).to.have.property('message');
                        expect(res.body.message).to.equal('Forbidden access')
                        done()
                    })
            })
        })
    })
    describe('it should successfully create school',() => {
        it('It should not allow action for headers without x-access-token', (done) => {
            chai.request(app).post('/api/v1/school/create_school').type('form')
                .send({}).end((err,res) => {
                
                expect(res).to.be.an('object');
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('message');
                done()
            })
        })
        it('It should not allow action for non-admin and non-super admin role and non-enumerator Admin', (done) => {
            chai.request(app).post('/api/v1/auth/signin').type('form')
                    .send({username:"08163113450", password:"bacon"}).end((err, res) => {
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                const token = res.body.token
                chai.request(app).post('/api/v1/school/create_school').set('x-access-token', token)
                    .send(uniqueSchool).end((err, res) => {
                        expect(res).to.be.an('object');
                        expect(res).to.have.status(403);
                       // expect(res.body.data).to.have.property('message');
                        done()
                    })
            })
        })
        it('It should fail when the required fields are missing', (done) => {
            chai.request(app).post('/api/v1/auth/signin').type('form')
                    .send({username:"07010671710", password:"bacon"}).end((err, res) => {
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                const token = res.body.token
                chai.request(app).post('/api/v1/school/create_school').set('x-access-token', token)
                    .send({}).end((err, res) => {
                        expect(res).to.be.an('object');
                        expect(res).to.have.status(400);
                       // expect(res.body.data).to.have.property('message');
                        done()
                    })
            })
        })
        it('It should fail when creating school with same school number', (done) => {
            chai.request(app).post('/api/v1/auth/signin').type('form')
                    .send({username:"07010671710", password:"bacon"}).end((err, res) => {
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                const token = res.body.token
                chai.request(app).post('/api/v1/school/create_school').set('x-access-token', token)
                    .send(duplicateSchool).end((err, res) => {
                        expect(res).to.be.an('object');
                        expect(res).to.have.status(406);
                        expect(res.body).to.have.property('message');
                        expect(res.body.message).to.equal('School Already exists')
                        done()
                    })
            })
        })
        it('It should fail when passed an invalid token', (done) => {
            chai.request(app).post('/api/v1/auth/signin').type('form')
                    .send({username:"07010671710", password:"bacon"}).end((err, res) => {
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                const token = res.body.token
                chai.request(app).post('/api/v1/school/create_school').set('x-access-token', invalidToken)
                    .send(duplicateSchool).end((err, res) => {
                        expect(res).to.be.an('object');
                        expect(res).to.have.status(403);
                        expect(res.body).to.have.property('message');
                        expect(res.body.message).to.equal('Forbidden access')
                        done()
                    })
            })
        })
        it('It should create a school successfully', (done) => {
            chai.request(app).post('/api/v1/auth/signin').type('form')
                    .send({username:"07010671710", password:"bacon"}).end((err, res) => {
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                const token = res.body.token
                chai.request(app).post('/api/v1/school/create_school').set('x-access-token', token)
                    .send(uniqueSchool).end((err, res) => {
                        expect(res).to.be.an('object');
                        expect(res).to.have.status(201);
                        expect(res.body).to.have.property('message');
                        expect(res.body.message).to.equal('School created sucessfully')
                        done()
                    })
            })
        })
    })

})


/*
"                "FOREIGN KEY (lgaid)\n"+
                "REFERENCES base_territory (lgaid),\n"+
                "FOREIGN KEY (stateid)\n"+
                "REFERENCES base_states (id),\n"+
                "FOREIGN KEY (schoolType)\n"+
                "REFERENCES school_type (id),\n"+
                "FOREIGN KEY (schoolCategory)\n"+
                "REFERENCES gender_category (id),\n"+
                "FOREIGN KEY (owner)\n"+
                "REFERENCES base_owners (id));"
*/