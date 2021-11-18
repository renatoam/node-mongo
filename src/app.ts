import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './routes/user.route'

export class App {
    private express: express.Application
    private port = 9000

    constructor() {
        this.express = express()
        this.middlewares()
        this.database()
        this.routes()
        this.listen()
    }

    public getApp(): express.Application {
        return this.express
    }

    private middlewares(): void {
        this.express.use(express.json())
        this.express.use(cors())
    }

    private database(): void {
        mongoose.connect('mongodb+srv://renato:RastaMongo122@cluster0.7azrh.mongodb.net/sample_restaurants?retryWrites=true&w=majority')
    }

    private routes(): void {
        this.express.use('/users', userRouter)
    }
    
    private listen(): void {
        this.express.listen(this.port, () => {
            console.log('Servidor ON: ', this.port)
        })
    }
}