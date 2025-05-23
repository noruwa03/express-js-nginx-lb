import { Request, Response } from "express";
import pool from "../db";

export const deletePost = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    // Todo: Use conditional statement to check if record exists in database before deleting, If not exist respond with statusCode 400 (Bad Request) and a message

    const deletedRow = await pool.query(
      "DELETE FROM post WHERE uuid = $1 RETURNING *",
      [id]
    );

    return res.status(200).json({
      message: `Post with id ${id} successfully deleted`,
      data: deletedRow.rows[0],
    });
  } catch (error: string | any) {
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};
