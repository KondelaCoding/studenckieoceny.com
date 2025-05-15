import type { NextApiRequest, NextApiResponse } from "next";
import { deleteTeacher, init } from "@/lib/db";

init();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "DELETE") {
        const { teacherId } = req.body;

        if (!teacherId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        try {
            await deleteTeacher(teacherId);
            res.status(200).json({ message: "Teacher deleted successfully" });
        } catch (error) {
            console.error("Error deleting teacher:", error);
            res.status(500).json({ message: "Failed to delete teacher" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
