var express = require('express');
var router = express.Router();

const {PrismaClient} = require("@prisma/client")

const  prisma  = new PrismaClient()

/* GET categories listing. */
router.get('/', async function(req, res, next) {
  const categories = await prisma.category.findMany({
    include:{ articles:true}
  });
  res.json(categories);
});


router.get('/:id', async function(req, res, next) {
  
  const  {id} = req.params;
  const category = await prisma.category.findUnique({
    where:{
      id : parseInt(id)
    },
  });
  res.json(category);
});



router.post('/', async function(req,res,next){

  const data =req.body;
  const category= await prisma.category.create({data})
  res.json(category);
});

router.delete('/:id',async function(req,res,next){
  const  {id} = req.params;
  const category = await prisma.category.delete
  ({
    where:{
      id : parseInt(id)
    },
  });
  res.json(category);
})


router.patch('/:id',async function(req,res,next){
  const {id} = req.params;
  const data=req.body;
  const category= await prisma.category.update({
    where:{
      id:parseInt(id)
    },
    data:data,
    include:{
      articles:false,
    }
  })
  res.json(category);
})

module.exports = router;