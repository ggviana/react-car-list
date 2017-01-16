import theme from 'components/SearchBox.css'

const SearchBox = ({onChange, onSearch, children, placeholder}) => {
    return (
        <form className={theme['form']} onSubmit={event => {
            event.preventDefault()
            onSearch(children)
        }}>
            <input 
                className={theme['form-input']}
                type="text" 
                placeholder={placeholder} 
                value={children} 
                onChange={event => {
                    event.preventDefault()
                    onChange(event.target.value, event)
                }} />
            <button className={theme['form-button']} type="submit">
                <span className={theme['icon']}>
                    &#9906;
                </span>
            </button>
        </form>
    )
}

SearchBox.defaultProps = {
    onChange: () => {},
    onSearch: () => {},
}

export default SearchBox