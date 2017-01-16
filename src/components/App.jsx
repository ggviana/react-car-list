import theme  from 'components/App.css'

import Button         from 'components/Button'
import CarForm        from 'components/CarForm'
import Pagination     from 'components/Pagination'
import Modal          from 'components/Modal'
import SearchBox      from 'components/SearchBox'
import Table          from 'components/Table'

import CarModel       from 'models/Car'

const PER_PAGE = 5

class App extends React.Component {

  constructor(props) {
    super(props)

    const carList = props.state.carList
      .map((car, index) => ({
        ...car,
        id: index,
        selected: false
      }))

    const query = location.search.replace(/\?q=(.*)?/, '$1')
    
    this.state = {
      ...props.state,
      carList,
      currentPage: 1,
      searchTerm: query,
      query,
      isSearching: query.length > 0,
      isShowingForm: false,
    }
  }

  render() {
    var {carList, searchTerm, query, carForm, currentPage, isShowingForm, isSearching, isShowingImage} = this.state

    if (isSearching) {
      carList = this.filterResults(carList, query)
    }

    return (
      <div className={theme['container']}>
        <header className={theme['main-header']}>
          
        </header>
        
        <section className={theme['row']}>

          <Button onClick={() => this.toggleForm()}>
            Novo Carro
          </Button>

          <SearchBox
            placeholder="Pesquisar"
            onChange={searchTerm => this.setState({ searchTerm })}
            onSearch={searchTerm => this.updateSearch(searchTerm)}>
            {searchTerm}
          </SearchBox>

        </section>

        <section className={theme['row']}>

          <Table
            selectable
            fields={CarModel.fields}
            onSelect={updated => this.changeUpdated(updated)}>
            {this.getPagedResult(carList, currentPage)}
          </Table>

        </section>

        <section className={theme['row']}>

          <Pagination
            currentPage={currentPage}
            perPage={PER_PAGE}
            onPageChange={currentPage => {
              this.setState({
                currentPage
              })
            }}>
            {carList}
          </Pagination>

        </section>

        {isShowingForm && 
          <Modal onClose={() => this.toggleForm()}>
            <CarForm onSubmit={car => {
              this.setState({
                carList: carList.concat(car),
                isShowingForm: false
              })
            }} />
          </Modal>
        }
      </div>
    )
  }

  toggleForm() {
    this.setState({
      isShowingForm: !this.state.isShowingForm
    })
  }

  updateSearch(term) {
    var isSearching = false

    if (term.length > 0) {
      history.pushState(term, "", `search?q=${term}`)
      isSearching = true
    } else {
      history.pushState(0, "", 'search')
    }

    this.setState({
      query: term,
      isSearching
    })
  }

  filterResults(list, term) {
    term = new RegExp(term, 'gi')

    const filterable = Object
      .keys(CarModel.fields)
      .filter(key => CarModel.fields[key].filterable)

    return list.reduce((collection, item) => {

      for (const key of filterable) {
        
        if (term.test(item[key])) {
          collection.push(item)
          break
        }
      }

      return collection

    }, [])
  }

  changeUpdated(updated) {
    const changes = updated.reduce((collection, item) => {
      collection[item.id] = item

      return collection
    }, {})

    const carList = this.state.carList.map(item => {
      if (changes[item.id]) {
        item = changes[item.id]
      }

      return item
    })

    this.setState({
      carList
    })
  }

  getPagedResult(list, page) {
    const initial = (page - 1) * PER_PAGE

    return list.slice(initial, initial + PER_PAGE)
  }
}

export default App