import { Request, Response } from "express";
import userModel from "../models/user.model";

class UserController {
    public async create(request: Request, response: Response): Promise<Response> {
        try {
            const user = await userModel.create(request.body)
            const formattedUser = {
                message: `User ${user.name} has been created!`,
                id: user.id,
                name: user.name,
                avatar: user.avatar,
                pass: user.password
            }

            return response.json(formattedUser)
        } catch (error) {
            console.info('Error: ', error)
        }
    }

    public async authenticate(request: Request, response: Response): Promise<Response> {
        const {name, password } = request.body
        const user = await userModel.findOne({ name })

        if (!user) return response.status(400).send({ message: 'Usuário não encontrado!' })

        const validPassword = await user.comparePasswords(password)

        if (!validPassword) return response.status(400).send({ message: 'Senha inválida!' })

        return response.json({user, token: user.generateToken()})
    }
}

export default new UserController()