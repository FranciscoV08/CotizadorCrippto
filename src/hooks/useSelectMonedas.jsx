
import { useState } from "react";
//Importamos el styled 
import styled from "@emotion/styled";

//Usamos el styled
const Label = styled.label`
    color: #fff;
    display: block;
    font-family: 'Lato', sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin: 15px 0;
`
const Select = styled.select`
    width: 100%;
    font-size: 18px;
    padding: 14px;
    border-radius: 10px;
`

const useSelectMonedas = (label, opciones) => {

    const [state, setState] = useState('')

    //Es un return implicito y se usa como component 
    const SelectMonedas = () => (
        <>
            {/* Style Component */}
            <Label>{label}</Label>

            <Select
                value={state}
                onChange={ a => setState(a.target.value)}
            >
                <option value="">Seleccione</option>

                {/* Mapeo de las opciónes que nos pasa  */}
                {opciones.map( opcion => (
                    <option
                        key={opcion.id}
                        value={opcion.id}
                    >{opcion.nombre}</option>
                ) )}
                
            </Select>
        </>
    )

    return [state, SelectMonedas]
}

export default useSelectMonedas;