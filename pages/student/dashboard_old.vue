<template>
  <div class="dashboard">
    <p class="bg-black/50">
      Wallet: {{ walletAddress || 'Not Connected' }}
      <button @click="connect" class="p-3 bg-black/50 rounded-sm cursor-pointer text-white">Connect Wallet</button>
    </p>
    <!-- Debug info section -->
    <div class="debug-info" v-if="walletAddress">
      <p><strong>Debug Info:</strong></p>
      <ul>
        <li>Contract Connection: {{ contract ? 'Active' : 'Not Connected' }}</li>
        <li>Backend Data Loaded: {{ backendLoaded ? 'Yes' : 'No' }}</li>
        <li>Raw Token Balance: {{ rawTokenBalance }}</li>
      </ul>
    </div>
    
    <h1>Welcome to your Dashboard</h1>
    <section class="token-section">
      <h2>Your Token Balance</h2>
      <p class="balance">{{ tokenBalance }} 🪙 tokens</p>
      <!-- Add registration button if needed -->
      <button v-if="walletAddress && tokenBalance === 0" @click="registerWallet" class="register-btn">
        Register Wallet
      </button>
    </section>
    <section class="achievement-section">
      <h2>Your Verified Achievements</h2>
      <div v-if="verifiedAchievements.length === 0" class="empty-state">
        No achievements found for this wallet address.
      </div>
      <div class="card-container" v-else>
        <AchievementCard v-for="ach in verifiedAchievements" :key="ach._id" :title="ach.title"
          :tokens="ach.tokenReward" />
      </div>
    </section>
    <section class="reward-section">
      <h2>Redeem Rewards</h2>
      <div v-if="availableRewards.length === 0" class="empty-state">
        No rewards available.
      </div>
      <div class="card-container" v-else>
        <RewardCard v-for="reward in availableRewards" :key="reward._id" :title="reward.title"
          :tokens="reward.requiredTokens" :disabled="tokenBalance < reward.requiredTokens" @redeem="redeemTokens" />
      </div>
    </section>
  </div>
</template>
<script setup>
import Navbar from '~/components/Navbar.vue'
import AchievementCard from '~/components/AchievementCard.vue'
import RewardCard from '~/components/RewardCard.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { connectWallet } from '~/utils/web3.js'
import ABI from '~/abi/RewardHub.json'

const tokenBalance = ref(0)
const rawTokenBalance = ref('N/A')
const verifiedAchievements = ref([])
const availableRewards = ref([])
const walletAddress = ref('')
const contract = ref(null)
const backendLoaded = ref(false)
const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

// Connect Wallet + Initialize Contract + Load Balance
async function connect() {
  try {
    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask not found. Please install it.')
      return
    }

    console.log('Connecting wallet...')
    const result = await connectWallet()
    if (!result) {
      console.error('Wallet connection failed')
      alert('Wallet connection failed. Please try again.')
      return
    }

    walletAddress.value = result.account
    console.log('Wallet connected:', walletAddress.value)

    // Initialize contract
    contract.value = new result.web3.eth.Contract(ABI.abi, CONTRACT_ADDRESS)
    console.log('Contract initialized')

    // Get token balance
    const balance = await contract.value.methods.tokenBalance(walletAddress.value).call()
    rawTokenBalance.value = balance
    tokenBalance.value = parseInt(balance)
    console.log('Token balance loaded:', tokenBalance.value)

    // Load backend data
    await loadBackendData()

  } catch (err) {
    console.error('Connection error:', err)
    alert('Failed to connect: ' + err.message)
  }
}


// Register wallet function
async function registerWallet() {
  if (!contract.value) {
    alert('Contract not connected')
    return
  }
  
  try {
    // Call the registration function on your contract
    await contract.value.methods.registerWallet().send({ from: walletAddress.value })
    alert('Wallet registered successfully!')
    // Refresh balance
    await connect()
  } catch (err) {
    console.error('Registration failed:', err)
    alert('Failed to register wallet: ' + err.message)
  }
}

// Redeem token call
async function redeemTokens(amount) {
  if (!contract.value) {
    alert('Connect wallet first')
    return
  }
  
  try {
    await contract.value.methods.redeemTokens(amount).send({ from: walletAddress.value })
    alert(`Redeemed ${amount} tokens!`)
    await connect() // refresh balance
  } catch (err) {
    console.error('Redeem failed:', err)
    alert('Redeem failed: ' + err.message)
  }
}

// Load backend achievements & rewards
async function loadBackendData() {
  try {
    console.log('Loading backend data...')
    
    // Get achievements
    try {
      const achievementsRes = await axios.get('http://localhost:5000/api/achievements')
      console.log('Achievements loaded:', achievementsRes.data)
      
      // Filter achievements by current wallet if needed
      if (walletAddress.value) {
        // You might need to adjust this based on your backend API
        verifiedAchievements.value = achievementsRes.data.filter(
          ach => ach.walletAddress === walletAddress.value || !ach.walletAddress
        ).slice(0, 2)
      } else {
        verifiedAchievements.value = achievementsRes.data.slice(0, 2)
      }
    } catch (err) {
      console.error('Failed to load achievements:', err)
    }
    
    // Get rewards
    try {
      const rewardsRes = await axios.get('http://localhost:5000/api/rewards')
      console.log('Rewards loaded:', rewardsRes.data)
      availableRewards.value = rewardsRes.data
    } catch (err) {
      console.error('Failed to load rewards:', err)
    }
    
    backendLoaded.value = true
  } catch (error) {
    console.error('Backend fetch failed:', error)
    backendLoaded.value = false
  }
}

// Init everything client-side
onMounted(async () => {
  console.log('Component mounted')
  await connect()
})
</script>
<style scoped>
.dashboard {
  padding: 2rem;
  font-family: sans-serif;
}

.token-section,
.achievement-section,
.reward-section {
  margin-bottom: 2rem;
}

.balance {
  font-size: 1.8rem;
  color: #333;
  font-weight: bold;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 1rem;
}

.debug-info {
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9rem;
}

.empty-state {
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 4px;
  color: #666;
  text-align: center;
}

.register-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}

.register-btn:hover {
  background-color: #45a049;
}
</style>