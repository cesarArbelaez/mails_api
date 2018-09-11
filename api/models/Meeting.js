  /**
 * Meeting.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'AMeeting_Main_Setup',
    primaryKey: 'MeetingID',
    schema: false,
    attributes: {
      MeetingID: {
        type: 'number',
        unique: true,
        columnName: 'MeetingID'
      },
      Meeting_Name: {
        type: 'string',
        columnName: 'Meeting_Name'
      },
      Attendee: 
      {
        collection:'invitation',
        via: 'Meeting'
      },
    },
};

