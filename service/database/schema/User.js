const mongoose = require('mongoose') //引入Mongoose
const Schema = mongoose.Schema //声明Schema
let ObjectId = Schema.Types.ObjectId //声明Object类型


const userSchema = new Schema({
  UserId: ObjectId,
  userName: {
    unique: true,
    type: String
  },
  password: String,
  createAt: {
    type: Date,
    default: Date.now()
  },
  lastLoginAt: {
    type: Date,
    default: Date.now()
  }
})
const bcrypt = require('bcrypt')
let SALT_WORK_FACTOR =10 //加盐

userSchema.pre('save', function(next){
  //let user = this
  console.log(this)
  bcrypt.genSalt( SALT_WORK_FACTOR,(err,salt)=>{
      if(err) return next(err)
      bcrypt.hash(this.password,salt, (err,hash)=>{
          if(err) return next(err)
          this.password = hash
          next()
      })
  })
})
mongoose.model('User', userSchema)
