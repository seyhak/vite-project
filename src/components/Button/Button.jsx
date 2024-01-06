import "./Button.sass"
import PropTypes from "prop-types"

export const Button = ({children, ...buttonProps}) => {
  return (
    <button {...buttonProps}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node
}