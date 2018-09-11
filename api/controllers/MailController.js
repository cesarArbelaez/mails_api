

/**
 * MailController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const sgMail = require('@sendgrid/mail');
const sendGridSettings = sails.config["sendGridSettings"];
sgMail.setApiKey(sendGridSettings.key);
module.exports = { 
    sendNotify: (req, res) => {
        var input = req.body;   
        const msg = {
            from: sendGridSettings.emailFrom,
            templateId: 'd-233e89e25b9f48f9816c598892cea1e9',
            personalizations:[  
                {   
                    to:[   
                        {  
                            email: input.email
                        }
                    ],
                    dynamic_template_data:{   
                        web: input.web, 
                        endDate: input.endDate, 
                        meetingName: input.meetingName, 
                        startDate: input.startDate, 
                        adminName: input.adminName, 
                        adminPhone: input.adminPhone, 
                        phone: input.phone, 
                        attendeeName: input.attendeeName, 
                        location: input.location, 
                        address: input.address, 
                        adminEmail: input.adminEmail, 
                        urlRegister: input.urlRegister
                    }
                }
            ]
        };
        var time = new Date().getTime();
        console.log(time)
        sgMail.send(msg)
        .then(result => {
            Mail.saveMailSending(input, time, result);      
            return res.json(result);
        })
        .catch(error => {
            return res.badRequest(error.toString())
        });
    },
    sendItinerary: (req, res) => {
        var input = req.body;   
        const msg = {
            from: sendGridSettings.emailFrom,
            templateId: 'd-43f7686030d34272a32b7354bc7848d0',
            personalizations:[  
                {   
                    to:[   
                        {  
                            email: input.email
                        }
                    ],
                    dynamic_template_data:{   
                        User: input.User,
                        meetingName: input.meetingName, 
                        pnrNumber: input.pnrNumber, 
                        meetingAdministrator: input.meetingAdministrator,   
                        emailNotification: input.emailNotification, 
                        urlItinerarey: input.urlItinerarey
                    }
                }
            ]
        };
        var time = new Date().getTime();
        console.log(time);
        sgMail.send(msg)
        .then(result => {
            Mail.saveMailSending(input, time, result); 
            return res.json(result);
        })
        .catch(error => {
            return res.badRequest(error.toString())
        });
    },
    sendCancelNoty: (req, res) => {
        var input = req.body;   
        const msg = {
            from: sendGridSettings.emailFrom,
            templateId: 'd-79b596549de445969b0fa5d88adce3ea',
            personalizations:[  
                {   
                    to:[   
                        {  
                            email: input.email
                        }
                    ],
                    dynamic_template_data:{   
                        answer: input.answer,
                        User: input.User, 
                        emailUser: input.email, 
                        PNR: input.PNR, 
                        meetingName: input.meetingName, 
                        userMessage: input.userMessage
                    }
                }
            ]
        };
        var time = new Date().getTime();
        console.log(time)
        sgMail.send(msg)
        .then(result => {
            Mail.saveMailSending(input, time, result);  
            return res.json(result);
        })
        .catch(error => {
            return res.badRequest(error.toString())
        });
    },
    sendCancelNotySW: (req, res) => {
        var input = req.body;   
        const msg = {
            from: sendGridSettings.emailFrom,
            templateId: 'd-c0af670f67dc41a1980341721db9e265',
            personalizations:[  
                {   
                    to:[   
                        {  
                            email: input.email
                        }
                    ],
                    dynamic_template_data:{   
                        meetingContactInfo: input.meetingContactInfo,
                        user: input.user, 
                        pnr: input.pnr, 
                    }
                }
            ]
        };
        var time = new Date().getTime();
        console.log(time);
        sgMail.send(msg)
        .then(result => {
            Mail.saveMailSending(input, time, result);   
            return res.json(result);
        })
        .catch(error => {
            return res.badRequest(error.toString())
        });
    },
    sendCancelError: (req, res) => {
        var input = req.body;   
        const msg = {
            from: sendGridSettings.emailFrom,
            templateId: 'd-da99a8b21bc64ac3b38b1b2d86786559',
            personalizations:[  
                {   
                    to:[   
                        {  
                            email: input.email
                        }
                    ],
                    dynamic_template_data:{   
                        user: input.user, 
                        agentEmail: input.agentEmail, 
                    }
                }
            ]
        };
        var time = new Date().getTime();
        console.log(time);
        sgMail.send(msg)
        .then(result => {
            Mail.saveMailSending(input, time, result);   
            return res.json(result);
        })
        .catch(error => {
            return res.badRequest(error.toString())
        });
    },
    getMailNotifys: (req, res) => {
        var response = req.allParams();
        for(var mail in response)
        { 
            if(response[mail].event == "bounce" || response[mail].event == "dropped")
            {

                MailReport.create({
                    email: response[mail].email,
                    timestamp: response[mail].timestamp,
                    smtpid: response[mail].sg_message_id,
                    event: response[mail].event,
                    reason: response[mail].reason,
                })
                .then(newEvent =>{
                    console.log(newEvent.smtpid);
                }).catch(error => {
                    console.log(error)
                });      
            }
        }
        return res.json({answer: "true"});
    }
};


