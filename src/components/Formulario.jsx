import styled from "@emotion/styled";

import useSelectMonedas from "../hooks/useSelectMonedas";
import { monedas } from "../data/monedas";
import { useEffect, useState } from "react";
import { Error } from "./Error";

//STYLE COMPONENT
const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 35px;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

export const Formulario = ({setMonedas}) => {

  //state para guardar los datos de la api
  const [criptos, setCriptos] = useState([]);
  //En caso de error se cambia a true
  const [error, setError] = useState(false);

  //Hook que creamos
  const [moneda, SelectMonedas] = useSelectMonedas("Elige tu Moneda", monedas);
  const [criptoMoneda, SelectCriptoMoneda] = useSelectMonedas(
    "Elige tu Criptomoneda",
    criptos
  );

  //Realiza la petición a la api y llama 1 vez
  useEffect(() => {
    //funcion asyncrona
    const consultarApi = async () => {
      //La url de la API
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      //espera a que realize el fetch
      const respuesta = await fetch(url);
      //lo transformo a json
      const resultado = await respuesta.json();

      //Creamos un arreglo mediante .map para llenarlo de objeto
      const arrayCripto = resultado.Data.map((cripto) => {
        //Creamos la plantilla del objeto
        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName,
        };
        //Lo reretornamos
        return objeto;
      });
      //Actualizamos el state
      setCriptos(arrayCripto);
    };
    //llamamos la funcion asyncrona
    consultarApi();
  }, []);

  const handleSubmit = (e) => {
    //Previene por defaul 
    e.preventDefault();
    
    if ([moneda, criptoMoneda].includes("")) {
      setError(true);
      return;
    }
    setError(false);
    setMonedas({
      moneda,
      criptoMoneda
    })
    


  };

  return (
    <>
        {/* se van como children  */}
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form onSubmit={handleSubmit}>
        {/* Usamo el hook del return implicito  */}
        <SelectMonedas />
        <SelectCriptoMoneda />

        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  );
};
