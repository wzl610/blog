var Post = require('../lib/mongo').Post;
var marked = require('marked');

//将Post的content从markdowm 转换成 html
Post.plugin('contentToHtml',{
	afterFind:function(posts){
		return posts.map(function(post){
			post.content = marked(post.content);
			return post;
		});
	},
	afterFindOne:function(post){
		if(post){
			post.content = marked(post.content);
		}
		return post;
	}
});
module.exports = {
	//创建一篇文章
	create:function(post){
		return Post.create(post).exec();
	},
	//通过文章id获取一篇文章
	getPosts:function(postId){
		return Post
			.findOne({_id:postId})
			.populate({path:'author',model:'User'})
			.addCreateAt()
			.contentToHtml()
			.exec();
	},
	//按创建时间降序获取所有用户文章或者某个特定用户的所有文章
	getPosts:function(author){
		var query = {};
		if(author){
			query.author = author;
		}
		return Post
			.find(query)
			.populate({path:'author',model:'User'})
			.sort({_id:-1})
			.addCreatedAt()
			.contentToHtml()
			.exec();
	},

	//通过文章id给pv加1
	incPv : function(postId){
		return Post
			.update({_id:postId},{$inc:{pv:1}})
			.exec();
	}
};