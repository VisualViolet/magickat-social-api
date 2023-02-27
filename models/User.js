const {Schema, model} = require('mongoose');

// Define schema with fields
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // Validation using match to regex
            match: [
                /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                'Please provide a valid email address'
            ],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Virtual to return length of friends array as a count variable
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length
    });

const User = model('user', userSchema);

module.exports = User;