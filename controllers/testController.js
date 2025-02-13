

export const testPostControllers =(req,res)=>{
  const {name}=req.body
  res.status(200).send(`youe name is ${name}`)
}
