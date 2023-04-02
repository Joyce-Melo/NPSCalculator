import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUserRepository";
import { AppError } from "../errors/AppError";

class AnswerController {
  async execute(req: Request, res: Response) {
    const { value } = req.params;
    const { u } = req.query;

    const surveysUserRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUserRepository.findOne({
      id: String(u),
    });

    if (!surveyUser) {
      throw new AppError("Survey user does not exists!");
    }

    surveyUser.value = Number(value);

    await surveysUserRepository.save(surveyUser);

    return res.send(surveyUser);
  }
}

export { AnswerController };
