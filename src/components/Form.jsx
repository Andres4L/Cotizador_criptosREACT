import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useCriptoSelect from '../hooks/useCriptoSelect'
import { monedas } from '../data/monedas'

const InputSubmit = styled.input`
background-color: #9142c9;
border: none;
width: 100%;
padding: 10px;
color: #FFF;
font-weight: 700;
text-transform: uppercase;
font-size: 20px;
border-radius: 5px;
transition: background-color .3s ease;
margin-top: 30px;
&:hover{
background-color: #a661d7;
cursor: pointer;
}
`


const Form = ({setMonedas}) => {
  const [criptos, setCriptos] = useState([])
  const [error, setError] = useState(false)
  const [moneda, SelectMonedas] = useCriptoSelect('Ellige tu moneda', monedas)
  const [criptomoneda ,SelectCriptoMonedas] = useCriptoSelect('Ellige tu Criptomoneda',criptos)

  useEffect(() => {
    const consultarAPI = async () => {
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()

      const arrayCriptos = resultado.Data.map(cripto => {
        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName
        }
        return objeto
      })
      setCriptos(arrayCriptos)
    }

    consultarAPI()
  }, [])

const handleSubmit = e =>{
  e.preventDefault()
 if ([moneda, criptomoneda].includes('')){
    setError(true)
    return
 }
 setError(false)
 setMonedas({
  moneda,
  criptomoneda
 })
}
  return (
    <>
    {error && <Error>Todos los campos son obligatorios</Error>}
   
    <form
    onSubmit={handleSubmit}
    >
      <SelectMonedas />
      <SelectCriptoMonedas/>

      <InputSubmit
        type="submit"
        value="cotizar"
      />
    </form>
    </>
  )
}

export default Form

