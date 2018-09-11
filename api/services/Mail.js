const meetingsSettings = sails.config.meetingsSettings;
const sgMail = require('@sendgrid/mail');
const sendGridSettings = sails.config.sendGridSettings;
sgMail.setApiKey(sendGridSettings.key);

module.exports = {
    saveMailSending : (input, time, result) =>{
        SendingMail.create({
            email: input.email,
            timestamp: time,
            smtpid: result[0].headers['x-message-id'],
            MeetingID: input.MeetingID,
        })
        .then(newSending => {
            console.log(newSending.smtpid);
        }).catch(error => {
            console.log(error);
        });
    },
    scheduleSending : () =>{
        var dateNow = Date.now();
        Invitation.find({mailSend : false}).then
        (invitations =>{
            for (i = 0; i < invitations.length; i++) { 
                meetingId=invitations[i].MID;
                Meeting.findOne(meetingId).then(meeting => {
                    if (meeting.MailScheduleDate != null)
                    {
                        var dbDate = new Date(meeting.MailScheduleDate);
                        var diff = Math.abs(dateNow - dbDate);
                        diff = diff / (1000 * 60 * 60);
                        if (diff > 0)
                        {
                            sendInvitation(meeting, invitations[i]);
                        }
                    }
                }).catch(error =>
                {
                    console.log(error);
                });
            }           
        }).catch(error =>
        {
            console.log(error);
        });
    }
}


function sendInvitation(meeting, invitation) {
    var start = new Date(meeting.Start_Date);
    start = dateformat(start, "dddd, mmmm dS, yyyy");
    var end = new Date(meeting.End_Date);
    end = dateformat(end, "dddd, mmmm dS, yyyy");
    UserSetup.findOne({ UID: meeting.UID }).then(user => {
        const msg = {
            from: sendGridSettings.emailFrom,
            templateId: 'd-233e89e25b9f48f9816c598892cea1e9',
            personalizations: [
                {
                    to: [
                        {
                            email: invitation.EMail_Address,
                        }
                    ],
                    dynamic_template_data: {
                        web: meeting.Website,
                        endDate: end,
                        meetingName: meeting.Meeting_Name,
                        startDate: start,
                        adminName: user.First_Name + " " + user.Last_Name,
                        adminPhone: user.Phone,
                        phone: meeting.Phone,
                        attendeeName: invitation.First_Name + ' ' + invitation.Last_Name,
                        location: meeting.Location,
                        address: meeting.Address,
                        adminEmail: meeting.Admin_Address,
                        urlRegister: meetingsSettings.site + '/Onboarding/meeting-info/' + meetingId + '?idAttendee=' + invitation.id + '&code=' + invitation.Validate_Identity
                    }
                }
            ]
        };
        var time = new Date().getTime();
        console.log(time);
        sgMail.send(msg)
        .then(result => {
            saveMailSending(input, time, result);
            console.log(result);
        })
        .catch(error => {
            console.log(error.toString());
        });
        Invitation.update({ GuestListID: inviteToMeeting.GuestListID })
        .set({
            mailSend: true
        })
        .then(invite => {
            console.log(invite);
        }).catch(error => console.log(error));
    }).catch(error => {
        console.log(error);
    });
}

