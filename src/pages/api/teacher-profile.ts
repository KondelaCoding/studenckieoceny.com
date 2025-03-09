import { NextApiRequest, NextApiResponse } from "next";
import { getTeacherByName, init } from "@/services/db";

init();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "GET") {
        try {
            const name = req.query.name as string;
            const teacher = await getTeacherByName(name);
            res.status(200).json(teacher);
        } catch (error) {
            console.error("Error fetching teacher:", error);
            res.status(500).json({ error: "Failed to fetch teacher" });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
