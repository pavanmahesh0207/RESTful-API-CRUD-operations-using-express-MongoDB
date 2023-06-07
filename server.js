// Import the Express.js library
const express = require('express')

//Import the Mongoose library for MongoDB
const mongoose = require('mongoose')

// Import Items schema from models folder
const Item = require('./models/itemModel')

// Create a new Express application instance
const app = express()

// Middleware for parsing JSON request body
app.use(express.json())

// Connect to MongoDB
mongoose
  .connect(
    'mongodb+srv://pavanmahi27:3521225@cluster0.g26lgrt.mongodb.net/Node-API?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Connected to MongoDB') // Log a success message if the connection is successful
    app.listen(3004, () => {
      console.log('node API is running on port 3004') // Log a message when the server starts listening
    })
  })
  .catch((error) => {
    console.log('Failed to connect to MongoDB', error) // Log an error message if the connection fails
  })

// GET /api/items - Retrieve all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find({}) // Retrieve all items from the database
    res.status(200).json(items) // Return the items as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }) // Return an error message if an exception occurs
  }
})

// GET /api/items/:id - Retrieve a specific item by ID
app.get('/api/items/:id', async (req, res) => {
  try {
    const { id } = req.params
    const item = await Item.findById(id) // Retrieve a specific item by its ID
    res.status(200).json(item) // Return the item as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }) // Return an error message if the item does not exist
  }
})

// POST /api/items - Create a new item
app.post('/api/items', async (req, res) => {
  try {
    const item = await Item.create(req.body) // Create a new item using the request body data
    res.status(200).json(item) // Return the created item as a JSON response
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message }) // Return an error message if the request is invalid
  }
})

// PUT /api/items/:id - Update an existing item by ID
app.put('/api/items/:id', async (req, res) => {
  try {
    const { id } = req.params
    const item = await Item.findByIdAndUpdate(id, req.body) // Update an existing item by its ID
    // If we cannot find any Item in database
    if (!item) {
      return res
        .status(404)
        .json({ message: `cannot find any item with ID ${id}` }) // Return an error message if the item does not exist
    }
    const updatedItem = await Item.findById(id)
    res.status(200).json(updatedItem) // Return the updated item as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }) // Return an error message if the request is invalid
  }
})

// DELETE /api/items/:id - Delete an item by ID
app.delete('/api/items/:id', async (req, res) => {
  try {
    const { id } = req.params
    const item = await Item.findByIdAndDelete(id) // Delete an item by its ID
    if (!item) {
      return res
        .status(404)
        .json({ message: `cannot find any item with ID ${id}` }) // Return an error message if the item does not exist
    }
    res.status(200).json({ message: 'Item deleted' }) // Return a success message as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }) // Return an error message if an exception occurs
  }
})
