import { NextApiRequest, NextApiResponse } from "next";
import { init, updateRating } from "@/services/db";

init();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "PATCH") {
        const { teacherId, rating } = req.body;
        const response = await updateRating(teacherId, rating);
        if (response) {
            res.status(200).json({ message: "Rating added successfully!" });
        } else {
            res.status(500).json({ message: "Failed to add rating" });
        }
    }
}
