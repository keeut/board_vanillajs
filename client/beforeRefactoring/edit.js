const edit = (props) =>{
    const data = props.data;
    const content = props.content;
    const changeData = props.changeData;
    const AddData = props.AddData
//props받아오기

    const container = document.getElementById('root');

    const onClickSend=()=>{
        if (AddData){
            AddData(text,title,author,data.num,data.date)
        }
        else{
            changeData(text,title,author,data.num,data.date).then(res=>{console.log(res)}) //데이터 바꾸기
        }
        history.pushState('','',`/content?num=${data.num}`) //다시 글로 돌아가기
        window.dispatchEvent(new Event('locationchange'))
        
    }
    const onChange =(e)=>{ //input요소들 바뀔때마다 state변경해주가
        switch (e.target.classList.value) {
            case 'text_container':
                text =e.target.value
                break;
            case 'title_input':
                title =e.target.value
                break;
            case 'author_input':
                author =e.target.value
                break;
            default:
                console.log('error cant found element')
            }
    }
    
    let title = data.title;
    let author = data.author;
    let text = content;

    function render(text,title,author){
        let template =
        `
        <div>글번호 \n ${data.num}</div>
        <div>제목</div>
        <div class ='form'>
            <input class='title_input' type='text' value=${title}></input>
            <div>작성자</div>
            <input class='author_input' type='text' value =${author} ></input>
            <div>작성 날짜 \n ${data.date}</div>
            <textarea class='text_container' cols="30" rows="10">${text}</textarea>
        </div>
        <button class='send_button'>전송</button>
        `
        container.innerHTML = template;

        const sendButton = container.querySelector('.send_button')
        sendButton.addEventListener('click',onClickSend)

        const form = container.querySelector('.form')
        form.addEventListener('keypress',onChange)

    };

    render(text,title,author);

    


}   

export default edit;