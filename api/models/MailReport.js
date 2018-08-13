/**
 * MailReport.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'EmailReports',
  primaryKey: 'EmailReportsID',
  attributes: {
    EmailReportsID: {
      type: 'number',
      unique: true,
      columnName: 'EmailReportsID'
    },
    email: {
      type: 'string',
      isEmail: true,
      columnName:'Email'
    },
    timestamp: {
      type: 'number',
      columnName: 'Stamp'
    },
    smtpid: {
      type: 'string',
      columnName:'SmtpId'
    },
    event: {
      type: 'string',
      columnName:'EventType'
    },
    reason: {
      type: 'string',
      columnName:'Reason'
    }
  },

};

