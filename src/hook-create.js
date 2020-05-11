import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const [value, SetValue] = useState(1);
    const [visible, setVisible] = useState(true);
    if (visible){
        return (
            <div>
                <button onClick={()=>SetValue((v) => v+2)}>+</button>
                <button onClick={()=>setVisible(false)}>hide</button>
                {/*<HookCounter value = {value}/>*/}
                {/*<Notification/>*/}
                <PlanetInfo id = {value}/>
            </div>
        );
    }else {
        return <button onClick={() => setVisible(true)}>show</button>
    }
};

//создание своего хука (начинается с use)
const usePlanetInfo = (id) =>{
    const [name, setName] = useState(null);
    useEffect(()=>{
        let cancelled = false;
        fetch(`http://swapi.dev/api/planets/${id}`)
            .then(res => res.json())
            .then(data => !cancelled && setName(data.name));
        return() => cancelled = true;
    }, [id]);

    return name;
};

const PlanetInfo = ({id}) =>{
    const name = usePlanetInfo(id);
    return <div>{id} - {name}</div>
};

/*
const Notification = () =>{
    const [visible, setVisible] = useState (true);

    useEffect(() =>{
        const timeout = setTimeout(() => {
            setVisible(false);
        },2500);
        return () => clearTimeout(timeout); //чтобы не срабатывало если компонент удален
    }, []);

    return (
        <div>
            { visible && <p>Hello</p> }
        </div>
    )
};

const HookCounter = ({ value }) => {
    /!*useEffect(() =>{
        console.log('mount');
    }, []);
    *!/

    useEffect(() =>{
        console.log('mount');
        return () => console.log('unmount');
    }, []);

    useEffect(() =>{
        console.log('mount and update');
    });

    /!*useEffect(() => () => {
        console.log('unmount');
    }, []);*!/

    return (
        <p>{ value }</p>

    )

};
*/


ReactDOM.render(<App />,
    document.getElementById('root'));