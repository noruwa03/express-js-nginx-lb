import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const postValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      statusCode: 400,
      errors: errors.array(),
    });
  }

  next();
};
