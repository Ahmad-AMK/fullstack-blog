const { PrismaClient } = require('@prisma/client')
const { faker } = require('@faker-js/faker')

const User = new PrismaClient().User
const category = new PrismaClient().category
const Article = new PrismaClient().Article
const Commentaire = new PrismaClient().Commentaire
const Articlcategory = new PrismaClient().Articlcategory

module.exports = async function seedFunction() {

    // *****supprimer tout les donnes de la base de donnees*****

    await Articlcategory.deleteMany();
    await Article.deleteMany();
    await Commentaire.deleteMany();
    await User.deleteMany();
    await category.deleteMany();

    // *****la creation des utilisateurs*****

    let users = []
    for (let index = 0; index < 10; index++) {
        let user = {
            name: faker.name.findName()
            , email: faker.internet.email()
            , password: faker.internet.password()
            , role: "AUTHOR"
        }
        const newUser = await User.create({
            data: user,
        })
        users.push(newUser)
    }

    const newUser = await User.create({
        data: {
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            role: "ADMIN"
        },
    })
    users.push(newUser);


    let category = []
    for (let index = 0; index < 10; index++) {
        let nom = faker.commerce.product();
        let category = {
            nom
        }
        const newcategory = await category.create({
            data: category,
        })
        category.push(newcategory)
    }

    let articles = []
    for (let index = 0; index < 100; index++) {

        let nombrecategorys = (Math.floor(Math.random() * 4) + 1)
        let articlecategorys = [];
        for (let index = 0; index < nombrecategorys; index++) {
            let categoryIndex = Math.floor(Math.random() * 10);
            articlecategorys.push(categorys[categoryIndex]);
        }

        let userIndex = Math.floor(Math.random() * 10);

        const newArticle = await Article.create({
            data: {
                titre: faker.name.firstName(),
                contenu: faker.hacker.phrase(),
                image: faker.image.avatar(),
                published: true,
                userId: users[userIndex].id,
            },
        })

        articlecategorys.forEach(async (category) => {

            await Articlcategory.create({
                data: {
                    articleId: newArticle.id,
                    categoryId: +category.id
                },
            })
        })
        articles.push(newArticle)
    }

    articles.forEach(async (article) => {
        let commentaires = []
        let nombreCommentaire = (Math.floor(Math.random() * 20))
        for (let index = 0; index < nombreCommentaire; index++) {

            let commentaire = {
                email: faker.internet.email(),
                contenu: faker.hacker.phrase(),
                articleId: article.id
            }
            const newCommentaire = await Commentaire.create({
                data: commentaire,
            })
            commentaires.push(newCommentaire);
        }

    })


};