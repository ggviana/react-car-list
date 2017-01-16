import theme  from 'components/Modal.css'

const Modal = ({children, onClose}) => (
  <div className={theme['modal']} onClick={onClose}>
    <div className={theme['modal-content']} onClick={event => {
      event.stopPropagation()
    }}>
      <span className={theme['close']} onClick={onClose}>
        &times;
      </span>
      {children}
    </div>
  </div>
)

export default Modal