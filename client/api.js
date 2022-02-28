export default class ApiService{
    getDataset = async ()=>{
        return await customFecth(
            {method:"GET"},
            `/datas`)
    } 
    findDataByNum = async (num)=>{
        return await customFecth(
            {method:"GET"},
            `/datas?num=${num}`)
    }
    
    findContentByNum = async (num)=>{
        return await customFecth(
            {method:"GET"},
            `/content?num=${num}`)
    } 
    postContent = async (text,title,author,num,date)=>{
        return await customFecth(
            {method:"POST",body:JSON.stringify({text,title,author,num,date})},
            `/content`)
    } 
    updateData = async (text,title,author,num,date)=>{
        console.log('hihi')
        return await customFecth(
            {method:"PUT",body:JSON.stringify({text,title,author,num,date})},
            `/content?num=${num}`)
    }
    deleteDataByNum = async (num)=>{
        return await customFecth(
            {method:"DELETE"},
            `/data?num=${num}`)
    } 

}

const customFecth = async (options,url) => {
    const res = await fetch(`http://localhost:8080${url}`, {
        ...options,
        headers: {...options.headers,"Content-Type":"application/json"},
    })
    const data = await res.json()
    return data
}