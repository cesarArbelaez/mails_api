/**
 * MailController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = { 
    getMailNotifys: (req, res) => {
        var response = req.allParams();
        for(var mail in response)
        { 
            if(response[mail].event == "bounce" || response[mail].event == "dropped")
            {

                MailReport.create({
                    email: response[mail].email,
                    timestamp: response[mail].timestamp,
                    smtpid: response[mail]['smtp-id'],
                    event: response[mail].event,
                    reason: response[mail].reason,
                })
                .then(newEvent =>{
                    console.log(newEvent.smtpid)
                }).catch(error => {
                    return res.serverError(error);
                });      
            }
        }
        return res.json({answer: "true"})
    }
};

