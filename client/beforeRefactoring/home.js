const home = (datas) => {
    const dateSort = true

    const setDateSort = (dateSort)=>{
        dateSort = !dateSort
        console.log(dateSort)
    }
    let dataState = datas

    let currentPage = 1

    let length = 5;

    let pageMax = parseInt(dataState.length / length) +1 //page 최대갯수 '게시물갯수바꾸기'에 따라 달라져야겠지

    const getDataByAuthor =(author)=>{  //이 로직을 view에서 하는게 낫지않을까? sever까지 가기는 아까운데
        const updated = datas.filter((x)=>(x.author == author))
        dataState = updated
        render(dataState,length,1)
    }
    const onClickDate =() =>{setDateSort(dateSort)
        }
    
    const onClickAuthor = (e)=>{getDataByAuthor(e.target.innerText)
    }

    const onChangeLength = (e) =>{
        length = e.target.value;
        (function changePageMax(){
            pageMax= parseInt(dataState.length/length) +1
            })()   //즉시실행함수로 page최대갯수 바꿔줌
        currentPage=1
        render(dataState,length,currentPage)  //게시물갯수바꾸면 1페이지로
    }

    const onClickWrite = ()=> {
        history.pushState('xx','ss','edit?new')
        window.dispatchEvent(new Event ('locationchange'))
    }

    const onClickTitle = (e)=>{
        const ContentNum = e.target.previousSibling.previousSibling.innerText
        history.pushState('xx','ss',`content?num=${ContentNum}`)
        window.dispatchEvent(new Event ('locationchange'))
    }

    const onClickpaging =(e) =>{
        switch (e.target.innerText) {
            case 'left':
                if(currentPage==1){  //페이지 1이면 더 내려가지않고 함수끝내기
                    console.log('page가 최소임')
                    return
                }
                currentPage=  currentPage-1 
                break;
            case 'right':
                if(currentPage==pageMax){    //페이지 초과시 함수끝내기
                    console.log('page 최대임')
                    return
                }
                currentPage= currentPage+1
                break;                
            default:
                break;
        }
        render(dataState,length,currentPage)
    }

    const container = document.getElementById('root');
    
    function render(dataState,length,currentPage){    //나중에 render(state)해서 render구현제대로
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
                        <div>${currentPage}</div>
                        <button class='right_button'>right</button>
                    </div>

                </div>
        `

        dataState.sort((a,b)=>(a.num -  b.num))    //순서대로 배열

        let posts = [];  //for문 돌리면서 여러개를 넣어야 되서 배열로해서 template 일부분을 교체할꺼

        for (let i = (currentPage-1) *length;  i< currentPage*length; i++) {
            const data = dataState[i]
            if (data == undefined){         //지정한 length보다 글의 갯수가 적을 떄의 예외
                break
            }
            posts.push(`
                <ul class="num">${data.num}</ul>
                <ul class="title">${data.title}</ul>
                <ul class="author">${data.author}</ul>
                <ul class="date">${data.date}</ul>
            `)
            
            
            };
        template = template.replace(`{{__post__}}`, posts.join(''));
        container.innerHTML = template;
        
        const selectLength = document.querySelector('.select_length') //게시물 갯수 바뀌는 이벤트
        selectLength.addEventListener('change',onChangeLength)
        
        const authors = document.querySelectorAll('.author') //작성자 클릭 이벤트
        for (const author of authors) {
            author.addEventListener('click',onClickAuthor)    
        }

        const titles = document.querySelectorAll('.title') //게시글조회 이벤트
        for (const title of titles) {
            title.addEventListener('click',onClickTitle)
        }    
        
        const date = document.querySelector('.date_column')
        date.addEventListener('click',onClickDate)

        const button = document.querySelector('.write')
        button.addEventListener('click',onClickWrite)
        
        const leftButton = document.querySelector('.left_button')
        leftButton.addEventListener('click',onClickpaging)

        const rightButton = document.querySelector('.right_button')
        rightButton.addEventListener('click',onClickpaging)

}

    render(dataState,length,currentPage) //default render실행
    

}
export default home;