const CurrencyFormat = ({children, locale, currency}) => {
    if (typeof children === 'number') {

        const formatter = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency
        })

        return (
            <span>
                {formatter.format(children)}
            </span>
        )
    }

    return children

}

CurrencyFormat.defaultProps = {
    locale: 'en-EN',
    currency: 'USD'
}

export default CurrencyFormat