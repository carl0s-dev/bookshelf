import { Router } from 'express'
import controller from 'api/controllers/auth.controller'
import { Validator } from 'api/middlewares/validator.middleware'
import { UserSchema } from 'utils/schemas/user.schemas'

export const authRouter = Router()

/**
 *  @openapi
 *  /auth/sign-up:
 *  post:
 *    tags: [Auth]
 *    summary: User Sign-Up
 *    description: Cria um novo usuário no sistema com as credenciais fornecidas.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                example: "JohnDoe"
 *              password:
 *                type: string
 *                example: "1234567890"
 *    responses:
 *      201:
 *        description: "CREATED"
 *      400:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/BadRequest"
 *        description: "BadRequest"
 *      409:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Conflict"
 *            example:
 *              code: 409
 *              name: "Conflict"
 *              message: "Já existe um usuário cadastrado com este nome."
 *        description: "Conflict"
 *      500:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/InternalServerError"
 *        description: "InternalServerError"
 */
authRouter.post('/sign-up', Validator(UserSchema), controller.handleSignUp)

/**
 * @openapi
 * /auth/sign-in:
 *   post:
 *     tags: [Auth]
 *     summary: User Sign-In
 *     description: Verifica se as credenciais fornecidas são válidas e emite um token de acesso.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "JohnDoe"
 *               password:
 *                 type: string
 *                 example: "1234567890"
 *     responses:
 *       200:
 *         description: "OK"
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BadRequest"
 *         description: "BadRequest"
 *       401:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Unauthorized"
 *             example:
 *               code: 401
 *               name: "Unauthorized"
 *               message: "Credenciais Inválidas."
 *         description: "Unauthorized"
 *       500:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/InternalServerError"
 *         description: "InternalServerError"
 */
authRouter.post('/sign-in', Validator(UserSchema), controller.handleSignIn)
