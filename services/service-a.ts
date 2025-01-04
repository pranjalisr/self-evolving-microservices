import express from 'express'
import axios from 'axios'

const app = express()
const port = process.env.PORT || 3001

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://service-b:3002')
    res.json({ message: "Hello from Service A", dataFromB: response.data })
  } catch (error) {
    res.status(500).json({ error: "Error calling Service B" })
  }
})

app.listen(port, () => {
  console.log(`Service A listening at http://localhost:${port}`)
})

