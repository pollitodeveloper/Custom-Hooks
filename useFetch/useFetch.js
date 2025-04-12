import { useEffect, useState } from "react"


const localCache = {

}




export const useFetch = ( url ) => {

    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null
    })

    useEffect(() => {
        getFetch();
    }, [url]);

    const setLoadingState = () => {
        setState({
            data: null,
            isLoading: true,
            hasError: false,
            error: null
        })
    }

    const getFetch = async() => {

        // confirmamos el url 
        // si localcache tiene un valor(diferente de undefine) 
        if( localCache[url] ){
            console.log('Usando cache');    //Si tiene el valor muestra esto
            setState({
                data: localCache[url],      //La data es igual a localcache que claranmente es diferente de undefine
                isLoading: false,
                hasError: false,
                error: null 
            });
            return;
        }



        // Muestra la animacion de cargando (solo cuando se desea cambiar de pokemon)
        setLoadingState()

        const resp = await fetch( url );

        // Sleep
        await new Promise( resolve => setTimeout(resolve, 1500))

        if( !resp.ok){
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: {
                    code: resp.status,
                    message: resp.statusText
                }
            })
            return      //se retorna porque no quiero que siga ejecutando nada mas(si hay un)
        }
        const data = await resp.json();


        // Actualiza el estado de mis componentes
        setState({
            data: data,     //Esta es la data de respuesta
            isLoading: false,
            hasError: false,
            error: null
        })
        // console.log({data});


        // Manejo del cache
        localCache[url] = data;     //El url va a ser igual a la data que tengamos de respuesta

    }
    



    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError,
    }
}
