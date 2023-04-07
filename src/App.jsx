import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import imagenCripto from "./img/imagen-criptos.png";
import { Formulario } from "./components/Formulario";
import { Resultado } from "./components/Resultado";
import { Spiner } from "./components/Spiner";


// <!-- STYLE COMPONENT -->

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto ;
  }
`;

function App() {
  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);
  

  //Consultar la api para que traiga la moneda 
  useEffect(() => {
    //Validamos el obj no esta vacio 
    if (Object.keys(monedas).length > 0) {

      const cotizarCripto = async() => {
        setCargando(true)
        setResultado({})

        const {moneda, criptoMoneda} = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;

        //REalizamos el fetch para extraer los datos 
        const cotizarCripto = await fetch(url)
        const resultado = await cotizarCripto.json() 
        
        setResultado(resultado.DISPLAY[criptoMoneda][moneda])
        setCargando(false)
      }
      cotizarCripto()
    }
  }, [monedas])
  
  return (
    <Contenedor>
      <Imagen src={imagenCripto} alt="Imagen Criptomonedas" />

      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>
        <Formulario 
          setMonedas={setMonedas}
        />
        {cargando && <p><Spiner /></p>}
        {resultado.PRICE && <Resultado  resultado={resultado}/>}
      </div>
    </Contenedor>
  );
}

export default App;
