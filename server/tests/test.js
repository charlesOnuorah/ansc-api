import app from "../index";
import chai from 'chai';
import chaiHttp from 'chai-http';
var should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);

var { executeQuery } = require('../helper');

var { newUser, wrongUserPassword, noUser } = require('./testAccounts');

describe('It should test all the end points', function (){
    before( function(done) {
        var sql = "", sql2 = '', sql3 = '', sql4 = ''
        sql = sql + "CREATE TABLE IF NOT EXISTS user_roles(\n"+
                        "roleid int primary key AUTO_INCREMENT,\n"+
                        "rolename varchar(50) not null,\n"+
                        "status TINYINT DEFAULT 1 NOT NULL,\n"+
                        "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);"
        sql2 = sql2 +     "INSERT INTO user_roles(rolename) values ('enumerator');"
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
        sql4 = sql4 + "INSERT INTO base_users(firstname, lastname, email, contactLine, username, roleid)\n"+
                        "values('charles','onuorah', 'charles.onuorah@yahoo.com', '08163113450',\n"+
                        "'08163113450',1);"
            try{

                 executeQuery(sql).then(() => {
                    executeQuery(sql2).then(() => {
                        executeQuery(sql3).then(() => {
                            executeQuery(sql4).then(() => done())
                            
                        })
                    })
                })
            }catch(error){
                console.log(error)
               return done(error)
            }
    })
    after( function (done){
            var sql = '', sql2 = ''
         sql = sql + "DROP TABLE IF EXISTS user_roles;"
           sql2 = sql2 + "DROP TABLE IF EXISTS base_users;"
        try{
            executeQuery(sql2).then(() => {
                executeQuery(sql).then(() => done() )
            })
        }catch(error){
            console.log(error)
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
})
