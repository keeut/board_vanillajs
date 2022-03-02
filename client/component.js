export class Component{
    constructor(props,parentElement){
        this.props = props;
        this.parentElement = parentElement;
        this.initializeState()
        this.render() //아 왜 안되나했는데, 인스턴스 생성 동작과정시 constructor 먼저라 state생기기전이네
    }
    
    setState(newState){ //render실행이 setState에만 있으니 결국 state가 종속되겠지
        this.state=newState
        this.render()        
    }

    initializeState(){ //this.state작성 / 공부하면서 디버깅해보니 this가 자식클래스라 this.initialize하면 여기로 안가고 자식으로
    }

    template(){}

    render(){
        const template = this.template()
        this.parentElement.innerHTML = template
        this.setCallbacks()
        this.setEvent()
    }
    setCallbacks(){}
    
    addEvent(event,className,callback){
        className = document.querySelector(`.${className}`)
        className.addEventListener(event,callback)
    }
    setEvent(){

    }


}

//new Home(props,parent) 하면 1.처음에 렌더되도록=그럼 constructor에 넣고, 2.
//component중요한점은 state 의존성