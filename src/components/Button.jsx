import theme from 'components/Button.css'

const Button = ({children, ...others}) => (
    <button type="button" className={theme['button']} {...others}>
        {children}
    </button>
)

export default Button