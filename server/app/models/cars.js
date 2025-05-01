const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: {
        type: String,
        required: [true, 'You need to add a make']
    },
    model: {
        type: String,
        required: [true, 'You need to add a model']
    },
    year: {
        type: Number,
        required: [true, 'You need to add a year']
    },
    horsepower: {
        type: Number,
        required: [true, 'You need to add a horsepower'],
        set: value => {
            if (typeof value === 'string') {
                return parseInt(value.replace(/\D/g, ''));
            }
            return value;
        }
    },
    completed: {
        type: Boolean,
        required: [true, 'Path `completed` is required.'],
        default: false
    },
    horsepowerDetails: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HorsepowerDetail'
    }]

}, {
    timestamps: true    
    
});

module.exports = mongoose.model('Car', carSchema);