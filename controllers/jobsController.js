import jobsModels from "../models/jobsModels.js";
import mongoose, { startSession } from "mongoose";
import moment from "moment";
export const createJobController=async(req,res,next)=>{
try{
const {company,position}=req.body;

if(!company || !position){
    return next('please provide all fields')
}

req.body.createdBy=req.user.userId
const job=await jobsModels.create(req.body);
res.status(201).json({job});
}catch(error){
    next(error)
}
};
export const getAllJobsController=async(req,res,next)=>{
try{
   const {status,workType,search,sort}=req.query
   const queryObject={
    createdBy:req.user.userId
   }
   //status and workType filter
   if(status && status!== 'all'){
    queryObject.status=status
   }
   if(workType && workType!=='all'){
    queryObject.workType=workType
   }
   //search
   if(search){
    queryObject.position={$regex:search,$options:'i'}
   }

   let queryResult=jobsModels.find(queryObject)
   //sort by position and date
   if(sort==='latest'){
    queryResult=queryResult.sort("-createdAt")
   }
   if(sort==='oldest'){
    queryResult=queryResult.sort("createdAt")
   }
   if(sort==='a-z'){
    queryResult=queryResult.sort("position")
   }
   if(sort==='z-a'){
    queryResult=queryResult.sort("-position")
   }
  //pagination
   const page=Number(req.query.page)||1;
   const limit=Number(req.query.limit)||10;
   const skip=(page-1)*limit;

   queryResult=queryResult.skip(skip).limit(limit);


   //job count
   const totaljob=await jobsModels.countDocuments(queryObject)
   const nofpage=Math.ceil(totaljob/limit)
    const jobs=await queryResult
   res.status(200).json({
    totaljob,
    jobs,
    nofpage

   })
}catch(error){
    next(error)
}
}
export const updateJobController=async(req,res,next)=>{
  try{
    const {id}=req.params;
    const {company,position}=req.body;

    if(!company ||!position){
        return next('please provide all fields')
    }
    const job=await jobsModels.findOne({_id:id});

    if(!job){
        return next(`no jobs found with this id ${id}`);
    }
    if(req.user.userId !== job.createdBy.toString()){
        return next('you are not authorizd to update this job')
    }

    const updateJob=await jobsModels.findOneAndUpdate({_id:id},req.body,{
        new:true,
        runValidators:true
    })
    res.status(200).json({updateJob})
  }catch(error){
    next(error)
  }
};
export const deletejobController=async(req,res,next)=>{
 try{
   const {id}=req.params;
   const job=await jobsModels.findOne({_id:id})

   if(!job){
    return next(`no job is found this id ${id}`)
   }
   if(req.user.userId !== job.createdBy.toString()){
    return next('you are not authrize to delete this ')
   }
   await job.deleteOne()
   res.status(200).json({message:"job deleted successfully"})
 }catch(error){
    next(error)
 }
}
export const getJobStatsController=async(req,res,next)=>{
  try{
    const stats=await jobsModels.aggregate([
        {
            $match:{
                createdBy:new mongoose.Types.ObjectId(req.user.userId)
            }

        },{
            $group:{
                _id:`$status`,
                count:{$sum:1},
            }
        }
    ])
    const defaultstats=stats.reduce((acc,item)=>{
        acc[item._id]=item.count
        return acc
    },{
        pending:0,
        reject:0,
        interview:0
    })
    let monthlyApplication=await jobsModels.aggregate([
        {
            $match:{
                createdBy:new mongoose.Types.ObjectId(req.user.userId)

            }
        },{
            $group:{
                _id:{
                    year:{$year:'$createdAt'},
                    month:{$month:'$createdAt'}
                },
                count:{
                    $sum:1,
                }

            }
        }
    ])
    monthlyApplication=monthlyApplication.map(item=>{
        const{_id:{year,month},count}=item
        const date=moment().month(month-1).year(year).format('MMM Y')
        return {date,count}
    })
    res.status(200).json({totalJob:stats.length,stats,defaultstats,monthlyApplication})
  }catch(error){
    next(error)
  }
}