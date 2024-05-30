

const Article = require('../articles/ArticleModel')
const Category = require('../categories/CategoryModel')

const defineRelations = () =>{
    Category.hasMany(Article) //Relação ONE TO MANY. 1 categoria pertence á Muitos artigos. 
    Article.belongsTo(Category) //Relação ONE TO MANY. 1 artigo pertence á 1 categoria
}

module.exports = defineRelations
