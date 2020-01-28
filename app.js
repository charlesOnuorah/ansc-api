var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

var hash = bcrypt.hashSync('bacon', salt);


const res = bcrypt.compareSync('strin', '$2a$10$2g3Ms3pU0W4jZMCDa5Jnze9khHomZMuTkT2fuuWjhcKdraMp1nikC')

const res1 = bcrypt.compareSync('bacon', '$2a$10$2g3Ms3pU0W4jZMCDa5Jnze9khHomZMuTkT2fuuWjhcKdraMp1nikC')

console.log('your hash is:', hash)
console.log('your invalid', res)
console.log('your valid', res1)