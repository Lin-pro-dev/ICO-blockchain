import React, { useEffect, useState } from "react";

const AccountListItem = (props) => {
  const [tokenBalance, setTokenBalance] = useState(0);
  const [ethBalance, setEthBalance] = useState(0);

  useEffect(() => {
    if (props.account && props.token) {
      window.web3.eth.getBalance(props.account).then((_ethBalance) => {
        setEthBalance(_ethBalance);
      })
      props.token.methods.balanceOf(props.account).call().then(
        function (_tokenBalance) {
          setTokenBalance(_tokenBalance.toNumber())
        }
      )
    }
  }, [props.account, props.token])

  return (
    <tr>
      <td><input
        type="radio"
        name="select"
        checked={props.checked}
        onChange={() => props.handleRadioChange(props.account)}></input></td>
      <td>{props.id}</td>
      <td>{props.account}</td>
      <td>{ethBalance}</td>
      <td>{tokenBalance}</td>
    </tr>
  )

}

export default AccountListItem;