import theme from 'components/Checkbox.css'

const Checkbox = ({onChange, checked}) => {
  return (
    <span className={`${theme['checkbox']} ${checked && theme['checked']}`}>
      <input type="checkbox" checked={checked} onChange={() => {}} />

      <span className={theme['box']} onClick={() => onChange(!checked)}>
        <span className={theme['tick']}>
          &#10004;
        </span>
      </span>
    </span>
  )
}

export default Checkbox