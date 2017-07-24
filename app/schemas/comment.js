var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var CommentSchema = new Schema({
	movie: {type: ObjectId, ref: 'Movie'},
	from: {type: ObjectId, ref: 'User'},
	to: {type: ObjectId, ref: 'User'},
	content: String,

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

CommentSchema.pre('save', function(next){//执行save方法前，先判断是不是新创建的，是的话更新meta的createAt,updateAt信息
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else{//否则只更新updateAt信息
		this.meta.updateAt = Date.now()
	}
	next()
})


CommentSchema.statics = {
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

module.exports = CommentSchema