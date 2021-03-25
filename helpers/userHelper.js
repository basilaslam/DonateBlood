var db = require('../config/connection')
var collection = require('../config/collections')
const bcrypt = require('bcrypt')
const detailHelpers = require('../helpers/detailHelper');
const { response } = require('express');

module.exports = {
            doSignup: (userData) => {
                return new Promise(async (resolve,reject)=>{
                    userData.password = await bcrypt.hash(userData.password,10)
                    db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
                       detailHelpers.addNewDetailes(userData)
                        console.log('registerd');
                        resolve(data.ops[0])
                    })
                    
                })
            
            },
            verifyDuplicate: (userData) => {

                return new Promise(async (resolve,reject)=>{
                    console.log(userData[0].username)
                    let user = await db.get().collection(collection.USER_COLLECTION).findOne({username:userData[0].username})
                    console.log(user)
                    if(user){

                        resolve({duplicate: true})

                    }else{

                        resolve({duplicate: false})

                    }
                    
                    
                })


            },
            doSignin : (userData)=>{
                let loginStatus = false
                let response = {}
                return new Promise(async(resolve,reject)=>{
                    let user = await db.get().collection(collection.USER_COLLECTION).findOne({username:userData.username})
                    if(user){
                        bcrypt.compare(userData.password,user.password).then((status)=>{
                            if(status){ console.log('login success')
                             response.user = user
                             response.status = true
                             resolve(response)
                        }else{console.log('not success');
                                resolve({status:false })
                        }
                        })
                    }else{
                        console.log('not success');
                        resolve({status:false})
                    }
                })
            },
            removeUser : (user) => {
                return new Promise((resolve,reject)=>{
                    db.get().collection(collection.USER_COLLECTION).removeOne({username :user}).then((response,err)=>{
                        console.log(user);
                        resolve(response)
                    })
                })

            }
            
};
