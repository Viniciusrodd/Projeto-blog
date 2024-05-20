

const Article = require('../articles/ArticleModel')
const Category = require('../categories/CategoryModel')

const defineRelations = () =>{
    Article.belongsTo(Category) //Relação ONE TO MANY. 1 artigo pertence á 1 categoria
    Category.hasMany(Article) //Relação ONE TO MANY. 1 categoria pertence á Muitos artigos. 
}

module.exports = defineRelations
