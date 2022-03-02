import { Component } from "./component"

export class Content extends Component{
    initializeState(){ 
        this.state = {
        data : this.props.dataFound,
        deleteData : this.props.deleteData,
        content : this.props.contentFound,
    }}
    setCallbacks(){
        this.onClickHome = ()=>{
            history.pushState('x','s','/')
            window.dispatchEvent(new Event ('locationchange'))
        }
        this.onClickEdit=()=>{
            history.pushState('a','s',`edit?num=${this.state.data.num}`)
            window.dispatchEvent(new Event ('locationchange'))
        }
        this.onClickDelete=()=>{
            this.state.deleteData(this.state.data.num)
            //삭제후 목록복귀
            history.pushState('x','s','/')
            window.dispatchEvent(new Event ('locationchange'))
        }
    }
    template(){
        let template =
        `
        <div>글번호 \n ${this.state.data.num}</div>
        <div>제목 \n ${this.state.data.title}</div>
        <div>작성자 \n ${this.state.data.author}</div>
        <div>작성 날짜 \n ${this.state.data.date}</div>
        <div>${this.state.content}</div>
        <button class='edit_button'>수정</button>
        <button class='delete_button'>삭제</button>
        <button class='home_button'>목록</button>
        `
        return template  
    }
    setEvent(){
        this.addEvent('click','edit_button',this.onClickEdit)
        this.addEvent('click','delete_button',this.onClickDelete)
        this.addEvent('click','home_button',this.onClickHome)

    }

}