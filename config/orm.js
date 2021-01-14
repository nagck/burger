const connection = require('./connection.js');

// Object Relational Mapper (ORM)

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection
// https://en.wikipedia.org/wiki/SQL_injection

// Helper function to distinguish what ? and ?? means
const printQuestionMarks = (num) => {
  const arr = [];

  for (let i=0; i < num; i++) {
      arr.push('?');
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
const objToSql = (ob) => {
    const arr = [];
  
    // Loop through the keys and push the key/value as a string int arr
    for (const key in ob) {
      let value = ob[key];
      // Check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // If string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === 'string' && value.indexOf(' ') >= 0) {
          value = `'${value}'`;
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(`${key}=${value}`);
      }
    }
  
    // Translate array of strings to a single comma-separated string
    return arr.toString();
};

// Methods required: selectAll(), insertOne(), updateOne()
const orm = {
  selectAll(tableInput, cb) {
    const queryString = `SELECT * FROM ${tableInput};`;
        connection.query(queryString, (err, result) => {
          if (err) {
            throw err;
          }
          cb(result);
        });
  },
  insertOne(table, cols, vals, cb) {
    let queryString = `INSERT INTO ${table}`;
      queryString += " (";
      queryString += cols.toString();
      queryString += ") ";
      queryString += "VALUES (";
      queryString += printQuestionMarks(vals.length);
      queryString += ") ";

    console.log(queryString);

      connection.query(queryString, vals, (err,result) => {
          if (err) {
              throw err;
          }
          cb(result);
      })
  },
  updateOne(table, objColVals, condition, cb) {
    let queryString = `UPDATE ${table}`;
      queryString += ' SET ';
      queryString += objToSql(objColVals);
      queryString += ' WHERE ';
      queryString += condition;
  
      console.log(queryString);
      connection.query(queryString, (err, result) => {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
  },
  // Delete the burgers whose condition is devoured = true
  delete(table, condition, cb) {
    let queryString = `DELETE FROM ${table}`;
      queryString += ' WHERE ';
      queryString += condition;

    connection.query(queryString, (err, result) => {
        if (err) {
            throw err;
        }

        cb(result);
    });
  },

};

module.exports = orm;
