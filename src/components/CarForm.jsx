import theme from 'components/CarForm.css'

import Button from 'components/Button'

class CarForm extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      placa: '',
      modelo: '',
      marca: '',
      combustivel: 'Alcool',
      valor: 0
    }
  }

  render() {
    const {onSubmit} = this.props
    const {placa, modelo, marca, combustivel, valor} = this.props

    return (
      <form className={theme['car-form']} onSubmit={event => {
        event.preventDefault()
        const car = this.state
        car.valor = parseFloat(car.valor)

        onSubmit(car)
      }}>
        <p className={theme['heading']}>Salvar um novo Carro</p>

        <label>
          Placa
        </label>
        <input type="text" onChange={this.createChangeEvent('placa')} value={placa} pattern="\w{3}-\d{4}" placeholder="XXX-1234" />

        <label>
          Modelo
        </label>
        <input type="text" onChange={this.createChangeEvent('modelo')} value={modelo} />

        <label>
          Marca
        </label>
        <input type="text" onChange={this.createChangeEvent('marca')} value={marca} />

        <label>
          Combustivel
        </label>
        <select value={combustivel} onChange={this.createChangeEvent('combustivel')}>
          {['Alcool', 'Gasolina', 'Flex'].map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>

        <label>
          Valor
        </label>
        <input type="number" onChange={this.createChangeEvent('valor')} value={valor} />

        <Button type="submit">
          Salvar
        </Button>
      </form>
    )
  }

  createChangeEvent(name) {
    return event => {
      this.setState({
        [name]: event.target.value
      })
    }
  }
}

export default CarForm