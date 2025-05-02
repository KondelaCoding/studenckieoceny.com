import { NextApiRequest, NextApiResponse } from "next";
import { addComment, init } from "@/lib/db";
import { Comment } from "@/types";

init();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "POST") {
        try {
            const { teacherId, user, comment }: {
                teacherId: string;
                user: string;
                comment: string;
            } = req.body;
            if (!teacherId || !user || !comment) {
                return res.status(400).json({
                    error: "Missing required fields",
                });
            }
            await addComment({ teacherId, user, comment } as Comment);
            res.status(200).json({ message: "Comment added successfully" });
        } catch (error) {
            console.error("Error adding comment:", error);
            res.status(500).json({ error: "Failed to add comment" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
