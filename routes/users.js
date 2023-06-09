var express = require('express');
var router = express.Router();

const {PrismaClient} = require("@prisma/client")

const  prisma  = new PrismaClient()


/* GET users listing. */
router.get('/', async function(req, res, next) {
  const users = await prisma.user.findMany({
    include:{ articles:true}
  });
  res.json(users);
});


router.get('/:id', async function(req, res, next) {
  // const  id = req.params.id;
  const  {id} = req.params;
  const user = await prisma.user.findUnique({
    where:{
      id : parseInt(id)
    },
  });
  res.json(user);
});
/* delete user by id */
router.delete('/:id',async function(req,res,next){
  const  {id} = req.params;
  const user = await prisma.user.delete
  ({
    where:{
      id : parseInt(id)
    },
  });
  res.json(user);
})

/* post user */
router.post ('/' , async (req,res) => {
  const user = await prisma.user.create({
    data : req.body,
  })
  res.send(user)
})
/* patch user */
router.patch('/:id',async function(req,res,next){
  const {id} = req.params;
  const data=req.body;
  const user= await prisma.user.update({
    where:{
      id:parseInt(id)
    },
    data:data,
    include:{
      articles:false,
    }
  })
  res.json(user);
})


module.exports = router;
