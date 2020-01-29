import app from "../index";
import chai from 'chai';
import chaiHttp from 'chai-http';
var should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);

var { executeQuery } = require('../helper');

var { newUser, invalidToken, noUser, userDetail, duplicateUser } = require('./testAccounts');

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
            try{

                 executeQuery(sql).then(() => {
                    executeQuery(sql2).then(() => {
                        executeQuery(sql3).then(() => {
                            executeQuery(sql3a).then(() => {
                                executeQuery(sql4).then(() =>{
                                    executeQuery(sql5).then(() => {
                                        executeQuery(sql6).then(() => {
                                            executeQuery(sql7).then(() => done())
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
    after( function (done){
            var sql = '', sql2 = ''
         sql = sql + "DROP TABLE IF EXISTS user_roles;"
           sql2 = sql2 + "DROP TABLE IF EXISTS base_users;"
           let sql3 = "DROP TABLE IF EXISTS base_territory"
           let sql4 = "DROP TABLE IF EXISTS base_user_lga_access"
        try{
            executeQuery(sql4).then(() => {
                executeQuery(sql2).then(() => {
                    executeQuery(sql3).then(() => {
                        executeQuery(sql).then(() =>  done())
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
})
