import { Request, Response } from "express";
import pool from "../db";

export const createPost = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, description, tags } = req.body;

    // I like using RETURNING * CLAUSE in Postgres to check new created resource
    const data = await pool.query(
      "INSERT INTO post (title, description, tags) VALUES ($1, $2, $3) RETURNING *",
      [title, description, tags]
    );

    return res.status(201).json({
      data: data.rows[0],
    });
  } catch (error: string | any) {
    return res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};
