/**
 * Mail.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  primaryKey: 'EmailReportsID',
  attributes: {
    EmailReportsID: {
      type: 'number',
      required: true,
      unique: true,
      columnName: 'EmailReportsID'
    },
  }
};

