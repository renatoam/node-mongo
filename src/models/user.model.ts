import { Document, model, Schema } from "mongoose";
import { UserInterface } from "../interfaces/user.interface";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

interface UserModel extends UserInterface, Document {
    comparePasswords(password: string): Promise<boolean>
    generateToken(): string
}

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    }
})

UserSchema.pre<UserModel>('save', async function() {
    this.password = await bcrypt.hash(this.password, 8)
})

UserSchema.pre<UserModel>('save', function() {
    this.avatar = `https://avatars.dicebear.com/api/adventurer-neutral/default-avatar.svg`
})

UserSchema.methods.comparePasswords = function(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password)
}

UserSchema.methods.generateToken = function() {
    const decodedToken = {
        _id: String(this._id),
        name: this.name,
        avatar: this.avatar
    }

    return jwt.sign(decodedToken, 'SECRET', {
        expiresIn: '1d'
    })
}

export default model<UserModel>('User', UserSchema)