var _ = require('lodash')

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.map(x => x.likes).reduce((total, x) => { return total + x })
}

const favoriteBlog = (blogs) => {
	const result = blogs.reduce((prev, curr) => prev.likes>curr.likes ? prev:curr) 
	delete result.__v
	delete result._id
	delete result.url
	
	return result
}

const mostBlogs = (blogs) => {
	let most_author = ''
	let num_blogs = 0
	_.forEach(_.countBy(blogs, 'author'), (num, author) => {
		if (num > num_blogs){
			most_author = author
			num_blogs = num
		}
	})
	
	return ({ 'author':most_author, 'blogs':num_blogs })
}

const mostLikes = (blogs) => {
	let most_likes = 0
	let author = ''
	
	_(blogs).groupBy('author').forEach(
		(x, y) => {
			total_likes = _.sumBy(x, 'likes')
			if (total_likes > most_likes){
				most_likes = total_likes
				author = y
			}
		}
	)
	
	return ({
		'author':author,
		'likes':most_likes
	})
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}