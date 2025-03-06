import { NextApiRequest, NextApiResponse } from "next";
import { addComment, getComments, init } from "@/services/db";

init();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "GET") {
        try {
            const comments = await getComments();
            res.status(200).json(comments);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch comments" });
        }
    } else if (req.method === "POST") {
        try {
            const body = req.body;
            await addComment({
                id: body.id,
                teacherId: body.teacherId,
                user: body.user,
                comment: body.comment,
                timestamp: Date.now(),
                likes: 0,
            });
            res.status(200).json({ message: "Comment added successfully" });
        } catch (error) {
            res.status(500).json({ error: "Failed to add comment" });
        }
    } else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
