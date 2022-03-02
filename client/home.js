import { Component } from "./component";

export class Home extends Component{
    initializeState(){    
        this.state = {datesort:true, 
            dataState:this.props.datas,
            currentPage:1,
            length:5,
            pageMax: parseInt(this.props.datas.length / length) +1
        }
    } 
    
    setCallbacks(){
        this.getDataByAuthor =(author)=>{  //이 로직을 view에서 하는게 낫지않을까? sever까지 가기는 아까운데
            const datas = this.props.datas.filter((x)=>(x.author == author))
            const updated = {...this.state};
            updated.dataState = datas;
            updated.currentPage = 1;
            this.setState(updated)
        }
        this.onClickDate =() =>{
            const updated = {...state};
            updated.datesort = this.state.datesort? false : true
            this.setState(updated)
            }
        this.onClickAuthor = (e)=>{this.getDataByAuthor(e.target.innerText)
        }
        this.onChangeLength = (e) =>{
            const updated = {...this.state};
            updated.length = e.target.value;
            (function changePageMax(){
                updated.pageMax= parseInt(dataState.length/length) +1
                })()   //즉시실행함수로 page최대갯수 바꿔줌
            updated.currentPage=1 //게시물갯수바꾸면 1페이지로
            this.setState(updated)
        }
        this.onClickWrite = ()=> {
            history.pushState('xx','ss','edit?new')
            window.dispatchEvent(new Event ('locationchange'))
        }
        this.onClickTitle = (e)=>{
            const ContentNum = e.target.previousSibling.previousSibling.innerText
            history.pushState('xx','ss',`content?num=${ContentNum}`)
            window.dispatchEvent(new Event ('locationchange'))
        }
        this.onClickpaging =(e) =>{
            const updated = {...this.state};
            switch (e.target.innerText) {
                case 'left':
                    if(this.state.currentPage==1){  //페이지 1이면 더 내려가지않고 함수끝내기
                        console.log('page가 최소임')
                        return
                    }
                    updated.currentPage=  this.state.currentPage-1 
                    break;
                case 'right':
                    if(this.state.currentPage==this.state.pageMax){    //페이지 초과시 함수끝내기
                        console.log('page 최대임')
                        return
                    }
                    updated.currentPage=  this.state.currentPage +1
                    break;                
                default:
                    break;
            }
            this.setState(updated)
        }
    }
    template(){
        let template = `
        <div>
            <div class ="columns">
                <ul>번호</ul>
                <ul>제목</ul>    
                <ul>작성자</ul>    
                <ul class='date_column'>작성일</ul>
            </div>
            <div class ="post_container">
                {{__post__}}
            </div>
            <button class="write">작성</button>
            <select class="select_length"> 
                <option>게시물 갯수</option>
                <option value =5>5개</option>
                <option value =10>10개</option>
                <option value =30>30개</option>
                <option value =50>50개</option>
                <option value =100>100개</option>
            </select>
            <div class='page_container'>
                <button class='left_button'>left</button>
                <div>${this.state.currentPage}</div>
                <button class='right_button'>right</button>
            </div>

        </div>
        `
        
        this.state.dataState.sort((a,b)=>(a.num -  b.num))    //순서대로 배열

        let posts = [];  //for문 돌리면서 여러개를 넣어야 되서 배열로해서 template 일부분을 교체할꺼
        for (let i = (this.state.currentPage-1) *this.state.length;  i< this.state.currentPage*this.state.length; i++) {
            const data = this.state.dataState[i]
            if (data == undefined){         //지정한 length보다 글의 갯수가 적을 떄의 예외
                break
            }
            posts.push(`
                <ul class="num">${data.num}</ul>
                <ul class="title">${data.title}</ul>
                <ul class="author">${data.author}</ul>
                <ul class="date">${data.date}</ul>
            `)};

        template = template.replace(`{{__post__}}`, posts.join(''));
        return template
    }    

    setEvent(){
        this.addEvent('change','select_length',this.onChangeLength)
        this.addEvent('click','date_column',this.onClickDate)
        this.addEvent('click','write',this.onClickWrite)
        this.addEvent('click','left_button',this.onClickpaging)
        this.addEvent('click','right_button',this.onClickpaging)

        const authors = document.querySelectorAll('.author') //작성자 클릭 이벤트
        for (const author of authors) {
            author.addEventListener('click',this.onClickAuthor)    
        }

        const titles = document.querySelectorAll('.title') //게시글조회 이벤트
        for (const title of titles) {
            title.addEventListener('click',this.onClickTitle)
        }           
    }
}