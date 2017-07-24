var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
var SALT_WORK_FACTOR = 10


var UserSchema = new mongoose.Schema({
	name: {
		unique: true,
		type: String
	},
	password: String,
	//0 normal user
	//1 verified user
	//2 professional user

	// 
	role: {
		type: Number,
		default: 0
	},
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})

UserSchema.pre('save', function(next){//执行save方法前，先判断是不是新创建的，是的话更新meta的createAt,updateAt信息
	var user = this;
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else{//否则只更新updateAt信息
		this.meta.updateAt = Date.now()
	}
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
		if(err){
			return next(err)
		}
		bcrypt.hash(user.password, salt, function(err, hash){
			if(err){
				return next(err)
			}
			user.password = hash
			next()
		})
	})
	console.log('salt********')
	console.log(user)
})

UserSchema.methods = {
	comparePassword: function(_password, cb){
		
		var password = this.password;
		bcrypt.compare(_password, password, function(err, isMatch){//第一个_password为登录传进来的password，第二个为从数据库中查询出来的(加盐了)
			console.log('_password')
			console.log(_password)
			console.log('password')
			console.log(password)
			if(err){
				return cb(err)
			}
			console.log('1111')
			cb(null, isMatch)
		})
	}
}


UserSchema.statics = {
	fetch: function(cb){
		return this
		.find({})
		.sort('meta.updateAt')
		.exec(cb)
	},
	findById: function(id, cb){
		return this
		.findOne({_id: id})
		.exec(cb)
	}
}

module.exports = UserSchema