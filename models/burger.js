// Import the ORM to create functions that will interact with the database.
const orm = require('../config/orm');

const burger = {
  all(cb) {
    orm.selectAll('burgers', (res) => cb(res));
  },
  // The variables cols and vals are arrays.
  create(cols, vals, cb) {
    orm.insertOne('burgers', cols, vals, (res) => cb(res));
  },

  update(objColVals, condition, cb) {
    orm.updateOne('burgers', objColVals, condition, (res) => cb(res));
  },

  delete(condition, cb) {
    orm.delete('burgers', condition, (res) => cb(res));
  },
};
  
// Export the database functions for the controller (burgers_controller.js).
module.exports = burger;