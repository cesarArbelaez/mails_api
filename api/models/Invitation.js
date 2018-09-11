/**
 * Invitation.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    tableName: 'AAttendeeInvitation',
    primaryKey: 'GuestListID',
    schema: false,
    attributes: {
      GuestListID: {
        type: 'number',
        unique: true,
        columnName: 'GuestListID'
      },
      Meeting: {
        columnName: 'MID',
        model:'meeting'
      },
      EMail_Address: {
        type: 'string',
        isEmail: true,
        columnName: 'EMail_Address'
      }
    },

};

