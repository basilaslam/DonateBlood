
require('dotenv').config()


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken =  process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid,authToken);




module.exports = {

    sendOtp: (user,otp) => {
        otp = otp.toString()
client.messages.create({
    to:  user,
    from : '+13237460013',
    body:   otp
})
.then((message) => console.log(message.sid))
    
    },

}