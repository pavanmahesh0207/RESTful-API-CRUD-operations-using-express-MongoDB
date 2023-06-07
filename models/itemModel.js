const mongoose = require('mongoose')

// Define the item schema and model
const itemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Item = mongoose.model('Item', itemSchema)

//export Item schema
module.exports = Item
