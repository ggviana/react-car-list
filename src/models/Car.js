import CurrencyFormat from 'components/CurrencyFormat'

const CarModel = {
  fields: {
    placa: {
      label: 'Placa',
      filterable: true
    },
    modelo: {
      label: 'Modelo',
      filterable: true
    },
    marca: {
      label: 'Marca',
      filterable: true
    },
    imagem: {
      label: 'Foto',
      formatter: value => {
        return typeof value === 'string' ? (
          <a href={value} target="_blank" rel="noopener">
            Imagem
          </a>
        ) : (
          <span>
            Sem foto
          </span>
        )
      },
    },
    combustivel: {
      label: 'Combustivel',
      filterable: true
    },
    valor: {
      label: 'Valor',
      formatter: value => {
        return (
          <CurrencyFormat locale="pt-BR" currency="BRL">
            {value}          
          </CurrencyFormat>
        )
      },
      alignRight: true
    },
  }
}

export default CarModel