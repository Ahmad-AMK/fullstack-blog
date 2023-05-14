var express = require('express');
var router = express.Router();

const {PrismaClient} = require("@prisma/client")

const  prisma  = new PrismaClient()

/* GET articles listing. */
router.get('/', async function(req, res, next) {
  const articles = await prisma.article.findMany()
  res.json(articles);
});


router.get('/:id', async function(req, res, next) {
  const article = await prisma.article.findUnique({
    where:{id : parseInt(req.params.id)}
  });
  const r = article ? article : 'not found'
  res.send(r);
});



router.post('/', async function(req,res,next){

  const data =req.body;
  const article= await prisma.article.create({data})
  res.json(article);
});



router.delete('/:id',async function(req,res,next){
  const article = await prisma.article.delete
  ({
    where:{
      id : parseInt(req.params.id)}
  });
  const r = article ? article : 'not found'
  res.send(r);
})


router.patch('/:id',async function(req,res,next){
  const {id} = req.params;
  const data=req.body;
  const article= await prisma.article.update({
    where:{
      id:parseInt(id)
    },
    data:data,
    include:{
      categories:false,
      commentaires:false,
    }
  })
  res.json(article);
})

module.exports = router;