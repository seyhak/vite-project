import { Loader } from "@components/Loader/Loader"
import { Reward } from "@components/Reward/Reward"
import { useRewardsPage } from "./useRewardsPage"

import "./RewardsPage.sass"

export const RewardsPage = () => {
  const { user, loading, rewards, total } = useRewardsPage()

  return (
    <div className="RewardsPage">
      {!user || loading || !rewards ? (
        <Loader />
      ) : (
        <>
          <h3>{`Welcome ${user.name}!`}</h3>
          <div className="rewards">
            {rewards
              ? Object.entries(rewards).map(([month, value]) => (
                  <div key={month} className="card rewards-group">
                    <h4 className="month">{month}</h4>
                    <div className="month-rewards-wrapper">
                      {value.transactions.length
                        ? value.transactions.map((reward) => (
                            <Reward
                              key={reward.date.getTime()}
                              value={reward.value}
                              rewardValue={reward.rewards}
                              date={reward.date}
                            />
                          ))
                        : "No transactions :C"}
                    </div>
                    <h4 className="sum">
                      {`Your reward points for the month: ${value.rewardsSum}`}
                    </h4>
                  </div>
                ))
              : "You have no rewards"}
          </div>
          <div className="total card">
            <h4 className="sum">{`Total points: ${total}`}</h4>
          </div>
        </>
      )}
    </div>
  )
}
