var express = require('express');
var router = express.Router();
const detailHelpers = require('../helpers/detailHelper');
const userHelpers = require('../helpers/userHelper');
const otp = require('../helpers/otpHelper');

  var otpGenerator = require("otp-generator");
const { response } = require('express');
/* GET admin listing. */
router.get("/home", (req, res) => {
  detailHelpers.getAllDetailes().then((allUsers) => {

    res.render("admin/adminHome", { allUsers });
  });


});

router.get('/delete-user/',(req,res)=>{
  let user__name = req.query.user
  userHelpers.removeUser(user__name).then((response)=>{
    console.log('User Is Dead');
    

  })
  detailHelpers.removeUserDetailes(user__name).then((response)=>{
      console.log('Detaile Deleted');
      res.redirect('/admin/home')
    })
    
})


router.get("/campaign", (req, res) => {

    res.render("admin/adminCampaign");

});
// Filter 

router.post('/admin/home/adminFilter/',(req,res)=>{

   

  if(req.body.name == '' && req.body.blood == '' && req.body.country == '' && req.body.state == '' && req.body.distric == ''){

   console.log(req.body)
     res.redirect('/admin/home')
     console.log('1');


 }else{
   console.log(req.body)

detailHelpers.filteredDetailes(req.body).then((filterdUsers)=>{
 
 res.render('admin/adminHome', {allUsers:filterdUsers})

})

}
 
})

module.exports = router;
