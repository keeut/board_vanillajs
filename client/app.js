import {Home} from './home.js';
import {Content} from './content.js';
import { Edit } from './edit.js';
import queryString from 'query-string'
import ApiService from './api.js';
import './css/app.css'

const apiservice = new ApiService;

const container = document.getElementById('root')
function router(){
    const routePath = location.pathname.replace('/',''); 
    if (routePath == '') {  //기본페이지
        apiservice.getDataset().then((dataset)=>{
            const home = new Home({datas:dataset},container)
            })
    }
    else if (routePath == `content`){   //게시물 상세페이지
        const query = queryString.parse(location.search)
        apiservice.findContentByNum(query.num).then((res)=>{        //게시글 글 불러오기
            apiservice.findDataByNum(query.num).then((data)=>{      //게시글 정보불러오기
                const content = new Content({contentFound:res.contentFound,dataFound:data,deleteData:apiservice.deleteDataByNum}
                    ,container)
            })
        })
    }

    else if (routePath == 'edit'){ //새로 작성이랑 수정이랑 구분
        const query = queryString.parse(location.search)
        if (location.search.replace('?','') == 'new'){      //localhost:3000/edit?new 이면 게시글 추가로직
            const today = new Date;         //오늘날짜
            const date = today.toLocaleDateString().replace(/. /gi,'').replace('.','')
            apiservice.getDataset().then((dataset)=>{ 
                const num = dataset.sort((a,b)=>(b.num-a.num))[0].num
                const data = {num:num+1,title:'',author:'',date}
                const content = ''
            const edit = new Edit({content,data,AddData:apiservice.postContent},container)
        })}
        else{apiservice.findContentByNum(query.num).then((res)=>{        //게시글 글 불러오기   localhost:3000/edit 이면 게시글 수정
                apiservice.findDataByNum(query.num).then((data)=>{      //게시글 정보불러오기
                    const edit= new Edit({content:res.contentFound,data,changeData:apiservice.updateData},container)
                    })
                })
            }
        }
    else{
        container.innerHTML = 'route가 존재하지 않습니다'
     }
}

window.addEventListener('locationchange',router)

router();
