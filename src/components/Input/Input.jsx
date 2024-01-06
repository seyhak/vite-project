import "./Input.sass"
import PropTypes from "prop-types"

export const Input = ({
  label,
  ...inputProps
}) => {
  return (
    <label className="Input">
    {label || ""}
    <input
      {...inputProps}
    />
  </label>
  )
}

Input.propTypes = {
  label: PropTypes.string
}
