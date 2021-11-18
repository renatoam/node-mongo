import { model, Schema } from "mongoose";

const MessageSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
})

export default model('Message', MessageSchema)