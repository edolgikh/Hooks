import React, {Component, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const [value, SetValue] = useState(0);
    const [visible, setVisible] = useState(true);
    if (visible){
        return (
            <div>
                <button onClick={()=>SetValue((v) => v+2)}>+</button>
                <button onClick={()=>setVisible(false)}>hide</button>
                <ClassCounter value = {value}/>
                <HookCounter value = {value}/>
            </div>
        );
    }else {
        return <button onClick={() => setVisible(true)}>show</button>
    }
};

const HookCounter = ({ value }) => {
    //вызывается при первой отрисовке и при обнолвении
    useEffect(() =>{
        console.log('useEffect');
        return () => console.log('clear');//очищает предыдущий эффект похоже на componentWillUnmount
    }, [value]); //параметры, для которых действует обновление; если пустой массив, то обнолвение вызываться не будет

    return (
        <p>{ value }</p>

    )

};

class ClassCounter extends Component{

    componentDidMount() {
        console.log('DidMount');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('DidUpdate');
    }

    componentWillUnmount() {
        console.log('WillUnmount');
    }

    render() {
        return <p>{ this.props.value }</p>
    }

}

ReactDOM.render(<App />,
    document.getElementById('root'));