import React, {useEffect, useState, useCallback, useMemo} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const [value, SetValue] = useState(1);
    const [visible, setVisible] = useState(true);
    if (visible){
        return (
            <div>
                <button onClick={()=>SetValue((v) => v+2)}>+</button>
                <button onClick={()=>setVisible(false)}>hide</button>
                 <PlanetInfo id = {value}/>
            </div>
        );
    }else {
        return <button onClick={() => setVisible(true)}>show</button>
    }
};

const getPlanet= (id) => {
    return  fetch(`http://swapi.dev/api/planets/${id}`)
        .then(res => res.json())
        .then(data => data);
};

const useRequest = (request) => {
    const initialState = useMemo(() => ({ //кеширует результа работы функции
        data: null,
        loading: true,
        error: null
    }), []);

    const [ dataState, setDataState ] = useState(initialState);
    useEffect(()=>{
        setDataState(initialState);
    let cancelled = false;
    request()
        .then(data => !cancelled && setDataState({
            data,
            loading: false,
            error: null
        }))
        .catch(error => !cancelled && setDataState({
            data: null,
            loading: false,
            error
        }));
    return () => cancelled = true;
    }, [request, initialState]);

    return dataState;
};

const usePlanetInfo = (id) =>{
    const request = useCallback(() => getPlanet(id), [id]); //кеширует само значение (саму функцию)
    return useRequest(request);
};

const PlanetInfo = ({id}) =>{
    const {data, loading, error} = usePlanetInfo(id);
    if (error){
        return <div>Something has happened</div>
    }

    if (loading){
        return <div>loading...</div>
    }

    return <div>{id} - { data.name }</div>
};


ReactDOM.render(<App />,
    document.getElementById('root'));