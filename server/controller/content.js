import * as dataRepository from '../data.js'
export const getDataset = (req,res) =>{ //http://localhost:8080/datas or http://localhost:8080/datas?num='number' 
    const {num} =req.query
    if (num){
        const dataFound = dataRepository.findDataByNum(num)
        res.json(dataFound)
        return
    }
    else{
    const datasList = dataRepository.datas
    res.json(datasList)
    }
}
export const getContent = (req,res) =>{ //http://localhost:8080/content?num=1
    const {num} =req.query
    const contentFound = dataRepository.findContentByNum(num)
    res.json({contentFound})
}
export const postContent = (req,res) =>{    //http://localhost:8080/content
    const {text,title,author,num,date} =req.body
    dataRepository.AddData(text,title,author,num,date)
    res.status(200).json({message:"well posted new content"})
}
export const updateData =(req,res) =>{      //http://localhost:8080/content?num=3
    const {text,title,author,num,date} =req.body
    dataRepository.changeData(text,title,author,num,date)
    res.status(200).json({message:"well updated content"})

}
export const deleteData =(req,res) =>{      //http://localhost:8080/data?num=2
    const {num} =req.query
    dataRepository.deleteData(num)
    res.status(200).json({message:"well deleted content"})

}