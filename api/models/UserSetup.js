/**
 * UserSetup.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'ASetUpUser',
  primaryKey: 'UID',
  schema: false,
  attributes: {
    UID: {
      type: 'number',
      unique: true,
      columnName: 'UID'  
    }
  }

};

