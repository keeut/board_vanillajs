import { Component } from "./component"

export class Edit extends Component{
    initializeState(){
        this.state = {
            data : this.props.data,
            content : this.props.content,
            changeData : this.props.changeData,
            AddData :this.props.AddData}
    }
    setCallbacks(){
        this.onClickSend=()=>{
            const updated = {...this.state};
            updated.data.title =document.querySelector('.title_input').value;
            updated.data.author =document.querySelector('.author_input').value;
            updated.content = document.querySelector('.text_container').value;
            this.setState(updated)
            if (this.state.AddData){
                this.state.AddData(this.state.content,this.state.data.title,this.state.data.author,this.state.data.num,this.state.data.date)
            }
            else{
                this.state.changeData(this.state.content,this.state.data.title,this.state.data.author,this.state.data.num,this.state.data.date).then(res=>{console.log(res)}) //데이터 바꾸기
            }
            history.pushState('','',`/content?num=${this.state.data.num}`) //다시 글로 돌아가기
            window.dispatchEvent(new Event('locationchange'))
            
        }
    }
    template(){
        let template =
        `
        <div>글번호 \n ${this.state.data.num}</div>
        <div>제목</div>
        <div class ='form'>
            <input class='title_input' type='text' value=${this.state.data.title}></input>
            <div>작성자</div>
            <input class='author_input' type='text' value =${this.state.data.author} ></input>
            <div>작성 날짜 \n ${this.state.data.date}</div>
            <textarea class='text_container' cols="30" rows="10">${this.state.content}</textarea>
        </div>
        <button class='send_button'>전송</button>
        `
        return template
    }
    setEvent(){
        this.addEvent('click','send_button',this.onClickSend)
    }

}