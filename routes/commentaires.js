var express = require('express');
var router = express.Router();

const {PrismaClient} = require("@prisma/client")

const  prisma  = new PrismaClient()

/* GET commentaires listing. */
router.get('/', async function(req, res, next) {
  const commentaires = await prisma.commentaire.findMany({
    include:{ article:true}
  });
  res.json(commentaires);
});


router.get('/:id', async function(req, res, next) {
  
  const  {id} = req.params;
  const commentaire = await prisma.commentaire.findUnique({
    where:{
      id : parseInt(id)
    },
  });
  res.json(commentaire);
});



router.post('/', async function(req,res,next){

  const data =req.body;
  const commentaire= await prisma.commentaire.create({data})
  res.json(commentaire);
});

router.delete('/:id',async function(req,res,next){
  const  {id} = req.params;
  const commentaire = await prisma.commentaire.delete
  ({
    where:{
      id : parseInt(id)
    },
  });
  res.json(commentaire);
})


router.patch('/:id',async function(req,res,next){
  const {id} = req.params;
  const data=req.body;
  const commentaire= await prisma.commentaire.update({
    where:{
      id:parseInt(id)
    },
    data:data,
    include:{
      article:false,
    }
  })
  res.json(commentaire);
})

module.exports = router;