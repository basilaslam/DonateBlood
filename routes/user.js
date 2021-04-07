var express = require('express');
var router = express.Router();
const detailHelpers = require('../helpers/detailHelper');
const userHelpers = require('../helpers/userHelper');
const otp = require('../helpers/otpHelper');

  var otpGenerator = require("otp-generator");
const { response } = require('express');



// Temporery Signup details

var userDetailes = []

var genaratedOtp = 

// Get Home Function


/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('index');
});



// Get Home Page
router.get('/home',(req,res)=>{

  detailHelpers.getAllDetailes().then((allUsers)=>{
    console.log(allUsers);
    res.render('user/home', {user:req.session.user,allUsers})
  })
  console.log(req.session.user);

  
})

// Get SignUp Page
router.get('/signup',(req,res)=>{

  res.render('user/signup')
})
// Post
router.post('/signup',(req,res)=>{
  userDetailes.push(req.body)
  userHelpers.verifyDuplicate(userDetailes).then((response)=>{
    console.log(response);
    if(response.duplicate == true){
      var message = 'Username or contact number alredy used'
      res.render('user/signup', {message:message})
    }else{
      res.redirect('/user/verify')
    }
  })
  

})

// User Validation
router.get('/user/verify',(req,res)=>{
  
  //  genaratedOtp = otpGenerator.generate(4, { upperCase: false, specialChars: false, alphabets: false});
  genaratedOtp = 1111
  console.log(genaratedOtp);
  
  // otp.sendOtp(userDetailes[0].phone, genaratedOtp)
  
  res.render('user/verify')
})

router.post('/user/verify',(req,res)=>{

console.log(req.body);

  // otp.sendOtp()
  if (req.body.otp == genaratedOtp){
    userHelpers.doSignup(userDetailes[0])
      userDetailes = []
      console.log('sucssess');
      res.redirect('/login')

  }else{
    res.json({
      status : 'Not Ok'
    })
  }
  
})


// Sign-in Page
 
router.get('/login',(req,res)=>{
  
  if(req.session.user){
    res.redirect('/home')
  }else{
  res.render('user/login')
  }
})


// Post Sign-in
router.post('/login',(req,res)=>{
   
  userHelpers.doSignin(req.body).then((response)=>{

    if(response.status){

      req.session.loggedIn=true
      req.session.user = response.user
      console.log(response);

      res.redirect('/home')

    }else{
    let loginstatus = 'Wrong username or password'
      res.render('user/login', {loginstatus} )

    }
  })
  console.log(req.body);
})



// Log Out
router.get('/logout',(req,res)=>{
  req.session.loggedIn=false
      req.session.user = false
      res.redirect('/login')
})


// Filter{
router.post('/home/filter/',(req,res)=>{
  console.log(req.body);

   

   if(req.body.name == '' && req.body.blood == '' && req.body.country == '' && req.body.state == '' && req.body.distric == ''){

    console.log(req.body)
      res.redirect('/home')

  }else{
    console.log(req.body)

detailHelpers.filteredDetailes(req.body).then((filterdUsers)=>{
  
  res.render('user/home', {user:req.session.user,allUsers:filterdUsers})

})

}
  
})
// }





module.exports = router;
