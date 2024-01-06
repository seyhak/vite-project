import PropTypes from "prop-types"
import "./Reward.sass"

export const Reward = ({
  date, value, rewardValue
}) => {
  return (
  <div className="Reward">
    <div>
      <h6 className='date'>{date.toDateString()}</h6>
      <h5 className='value'>{value}</h5>
    </div>
    <div className='reward'><h5>{rewardValue}</h5></div>
  </div>
  )
}

Reward.propTypes = {
  date: PropTypes.object,
  value: PropTypes.number,
  rewardValue: PropTypes.number,
}
