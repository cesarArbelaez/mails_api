/**
 * SendingMail.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'EmailSendings',
  primaryKey: 'EmailSendID',
  attributes: {
    EmailSendID: {
      type: 'number',
      unique: true,
      columnName: 'EmailSendID'
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
    MeetingID: {
      type: 'number',
      columnName:'MeetingID'
    }
  },

};

