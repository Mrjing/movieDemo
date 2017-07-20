var mongoose = require('mongoose')

var MovieSchema = new mongoose.Schema({
	doctor: String,
	title: String,
	language: String,
	country: String,
	summary: String,
	flash: String,
	poster: String,
	year: Number,
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

MovieSchema.pre('save', function(next){//执行save方法前，先判断是不是新创建的，是的话更新meta的createAt,updateAt信息
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else{//否则只更新updateAt信息
		this.meta.updateAt = Date.now()
	}
	next()
})


MovieSchema.statics = {
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

module.exports = MovieSchema