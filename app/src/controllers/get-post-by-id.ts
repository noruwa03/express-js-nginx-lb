import { Request, Response } from "express";
import pool from "../db";

export const getPostByID = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;

    // Todo: Use conditional statement to check if record exists in database, If not exist respond with statusCode 404 (Not Found) and a message

    const data = await pool.query(
      "SELECT id, uuid, title, description, tags, TO_CHAR(created_at, 'Day DD Mon YYYY at HH:MI:SS AM') AS created_at, updated_at FROM post WHERE uuid = $1",
      [id]
    );

    return res.json({
      data: data.rows[0],
    });
  } catch (error: string | any) {
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};
