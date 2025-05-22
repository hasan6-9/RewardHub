import Web3 from 'web3'

export async function connectWallet() {
  if (typeof window.ethereum !== 'undefined') {
    const web3 = new Web3(window.ethereum)
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      const accounts = await web3.eth.getAccounts()
      return { web3, account: accounts[0] }
    } catch (error) {
      console.error('User rejected connection')
      return null
    }
  } else {
    alert('MetaMask not found. Please install it.')
    return null
  }
}
