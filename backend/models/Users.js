const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    records: {
        ratings: [
            {
                id: String,
                thumbnailImage: String,
                title: String,
                rating: String,
                media: String
            }
        ],
        reviews: [
            {
                id: String,
                thumbnailImage: String,
                title: String,
                review: String,
                media: String
            }
        ],
        watchlist: [
            {
                id: String,
                thumbnailImage: String,
                title: String,
                media: String
            }
        ]
    }
})

module.exports = mongoose.model('Users', userSchema)