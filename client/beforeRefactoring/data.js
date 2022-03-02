
export let dataCount = 12

export let datas = [{num:1,title:'hi',author:'tn',date:'20123122'},
{num:2,title:'wei',author:'ts',date:'20123232'},
{num:3,title:'herwi',author:'kn',date:'20123112'},
{num:4,title:'hqqi',author:'1n',date:'20123342'},
{num:5,title:'hqqi',author:'1n',date:'20123342'},
{num:6,title:'hwei',author:'tn',date:'20123322'},
{num:7,title:'hwei',author:'tn',date:'20123322'},
{num:8,title:'hwei',author:'tn',date:'20123322'},
{num:9,title:'hwei',author:'tn',date:'20123322'},
{num:10,title:'hwei',author:'tn',date:'20123322'},
{num:11,title:'hwei',author:'tn',date:'20123322'},
{num:12,title:'hwei',author:'tn',date:'20123322'},

]
//글번호 / 제목 / 내용 / 작성자 / 작성일 등의 정보를 볼 수 있다.
//위에 data랑 통합하지 않은 이유 = home에 게시글들 쭉 나열하는데 굳이 content까지 읽어들일 필요 없다고 판단
//근데 어차피 hash로 가져오는거라 별로 상관없나? 어차피 db에서 할것들이니 신경ㄴㄴ
export let contentsData =[
    {num:1, content:'ㄹㄴ카ㅣㄴㄹ푸너123헢ㄹㅇ킾릉ㅋ'},
    {num:2, content:'ㅣㄴㅇ53255ㅡ헢ㄹㅇ킾릉ㅋ'},
    {num:3, content:'ㅣㄴㄴㄹ123우ㅡ헢ㄹㅇ킾릉ㅋ'},
    {num:4, content:'ㅣㄴㄹ푸너ㅏ3453ㄹ핔우ㅡ헢ㄹㅇ킾릉ㅋ'},
    {num:5, content:'카ㅣㄴㄹ푸너ㅏㄹ핔45545우ㅡ헢ㄹㅇ킾릉ㅋ'},
    {num:6, content:'카ㅣㄴㅇㄹㄴㅇㄴ3434ㄹ푸너ㅏㄹ핔우ㅡㄴㅇ헢ㄹㅇ킾릉ㅋ'},
    {num:7, content:'카ㅣㄴㄹ푸너ㄴㅇㅇㅏㄹ핔우ㅡ헢ㄹㅇㄹㄴㅇㅇ킾릉ㅋ'},
    {num:8, content:'카ㅣㄴㄹ푸너ㅏㄹ핔ㄴ우ㅡ헢ㄹㄴㄹㅇㅇ킾릉ㅋ'},
    {num:9, content:'카ㅣㄴㄹ푸너ㅏㄹ핔우ㄴㅇㅇㄹㄴㅡ헢ㄹㅇ킾릉ㅋ'},
    {num:10, content:'카ㅣㄴㄹ푸너ㅏㄹ핔우ㅡㄴㄴㄹㅇ헢ㄹㅇ킾릉ㅋ'},
    {num:11, content:'카ㅣㄴㄹ푸너ㅏㄹ핔우ㅡ헢ㄹㅇ킾릉ㅋㅇㄹㅇㄹ'},
    {num:12, content:'카ㅣㄴㄹ푸너ㅏㄹ핔우ㄴㅇㄹㄴㅇㄹㅇㄴㅡ헢ㄹㅇ킾릉ㅋ'},

]

export const findContentByNum = (num)=>{
    //num으로 flitering 할까? 아니면 배열의 크기를 높이더라도 index와 num을 동일하게 가져가서 index로 할까?
    //index랑 같게 가져가면 또 복잡해지네, 어차피 db에서 처리로직이 있느니 일단 filter로하자
    return contentsData.find((data)=>(data.num == num)).content
} 


export const findDataByNum = (num)=>{
    return datas.find((data)=>(data.num == num))
} 

export const deleteData =(num) =>{
    datas = datas.filter((data)=>(data.num !== num))
    contentsData = contentsData.filter((data)=>(data.num !== num))
}

export const changeData = (text,title,author,data) =>{
    const updatedData = {num:data.num, title, author, date:data.date}
    const updatedContent = {num:data.num , content:text}
    deleteData(data.num)
    datas.push(updatedData)
    contentsData.push(updatedContent)
}

export const AddData = (text,title,author,data)=>{
    const newData = {num:data.num, title, author, date:data.date}
    const newContent = {num:data.num , content:text}
    datas.push(newData)
    contentsData.push(newContent)
    dataCount+=1
}
