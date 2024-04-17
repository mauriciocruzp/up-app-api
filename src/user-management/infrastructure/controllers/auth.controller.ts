import { NextFunction, Request, Response } from "express";
import { GetUserByEmailUseCase } from "../../application/use-cases/get-user-by-email.use-case";
import { BcryptUtils } from "../utils/bcrypt.utils";
import { omit } from 'lodash';
import { createToken } from "../utils/jwt.utils";
import * as jwt from "jsonwebtoken";


export class AuthController {
  constructor(readonly getUserByIdUseCase: GetUserByEmailUseCase) {}

  public async authenticateUser(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const user = await this.getUserByIdUseCase.execute(email);

    if (!user) return res.status(401).send();

    const isValidPassword = BcryptUtils.compare(password, user.password)

    if (await isValidPassword == false) return res.status(401).send();

    const userPayload = omit(user, [
      'password',
    ]);

    const token = await createToken(userPayload);

    return res.status(201).send(token);
  }

  public async validateToken(req: Request, res: Response, next: NextFunction) {
    const JWT_SECRET = process.env.JWT_SECRET || "secret";

    try {
      const decodedToken = jwt.verify(req.body.token, JWT_SECRET);
      return res.status(200).send();
    } catch (error) {
      return res.status(404).send();
    }
  }
}
