import { Request, Response } from "express";
import pool from "../db";

export const getPosts = async (_: Request, res: Response): Promise<any> => {
  try {
    const data = await pool.query(
      "SELECT id, uuid, title, description, tags, TO_CHAR(created_at, 'Day DD Mon YYYY at HH:MI:SS AM') AS created_at, updated_at FROM post ORDER BY uuid ASC"
    );

    return res.json({
      data: data.rows,
    });
  } catch (error: string | any) {
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};
