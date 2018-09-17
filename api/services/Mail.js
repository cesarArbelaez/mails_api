const meetingsSettings = sails.config.meetingsSettings;
const sgMail = require('@sendgrid/mail');
const sendGridSettings = sails.config.sendGridSettings;
const dateformat = require('dateformat');
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
        var invite;
        console.log('now date : ' + dateNow)
        Invitation.find({mailSend : false, IsDeleted: false}).then
        (invitations =>{
            console.log(JSON.stringify(invitations));
            for (invite of invitations) {
                meetingId=invite.Meeting;
                attende = invite;
                verifySending(dateNow, attende);
            }           
        }).catch(error =>
        {
            console.log(error);
        });
    }
}


async function verifySending(dateNow, attende) {
    meeting = await Meeting.findOne({ MeetingID: meetingId });
    if (meeting.MailScheduleDate != null) {
        console.log('meeting with schedule : ' + meetingId);
        var dbDate = new Date(meeting.MailScheduleDate);
        var diff = Math.abs(dateNow - dbDate);
        diff = diff / (1000 * 60 * 60);
        console.log('date diff is : ' + diff);
        if (diff > 0) {
            console.log('sending invitation : ' + attende.GuestListID);
            sendInvitation(meeting, attende);
        }
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
                        urlRegister: meetingsSettings.site + '/Onboarding/meeting-info/' + meeting.MeetingID + '?idAttendee=' + invitation.GuestListID + '&code=' + invitation.Validate_Identity
                    }
                }
            ]
        };
        var time = new Date().getTime();
        console.log(time);
        sgMail.send(msg)
        .then(result => {
            const input =
            {
                email: invitation.EMail_Address,
                MeetingID : meeting.MeetingID 
            };
            Mail.saveMailSending(input, time, result);
            console.log(result);
        })
        .catch(error => {
            console.log(error.toString());
        });
        Invitation.update({ GuestListID: invitation.GuestListID })
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

