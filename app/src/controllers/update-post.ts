import { Request, Response } from "express";
import pool from "../db";

export const updatePost = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { title, description, tags } = req.body;

    const data = await pool.query(
      "UPDATE post SET title = $1, description = $2, tags = tags || $3, updated_at = NOW() WHERE uuid = $4 RETURNING *",
      [title, description, tags, id]
    );

    res.status(200).json({
      data: data.rows[0],
    });
  } catch (error: string | any) {
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};
