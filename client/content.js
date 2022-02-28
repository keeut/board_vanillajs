const content = (props) =>{
    const data = props.dataFound;
    const deleteData = props.deleteData;
    const content = props.contentFound;
//props받아오기

    const container = document.getElementById('root');

    const onClickHome = ()=>{
        history.pushState('x','s','/')
        window.dispatchEvent(new Event ('locationchange'))
    }
    const onClickEdit=()=>{
        history.pushState('a','s',`edit?num=${data.num}`)
        window.dispatchEvent(new Event ('locationchange'))}

    const onClickDelete=()=>{
        deleteData(data.num)
        //삭제후 목록복귀
        history.pushState('x','s','/')
        window.dispatchEvent(new Event ('locationchange'))
    }

    let template =
    `
    <div>글번호 \n ${data.num}</div>
    <div>제목 \n ${data.title}</div>
    <div>작성자 \n ${data.author}</div>
    <div>작성 날짜 \n ${data.date}</div>
    <div>${content}</div>
    <button class='edit_button'>수정</button>
    <button class='delete_button'>삭제</button>
    <button class='home_button'>목록</button>
    `
    container.innerHTML = template

    const editButton = container.querySelector('.edit_button')
    editButton.addEventListener('click',onClickEdit)

    const deleteButton = container.querySelector('.delete_button')
    deleteButton.addEventListener('click',onClickDelete)

    const homeButton = container.querySelector('.home_button')
    homeButton.addEventListener('click',onClickHome)

}   

export default content;