import { NextApiRequest, NextApiResponse } from "next";
import { addTeacher, getVisibleTeachers, init } from "@/lib/db";

init();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "GET") {
        try {
            const teachers = await getVisibleTeachers();
            res.status(200).json(teachers);
        } catch (error) {
            console.error("Error fetching teachers:", error);
            res.status(500).json({ error: "Failed to fetch teachers" });
        }
    } else if (req.method === "POST") {
        try {
            const body = req.body;
            await addTeacher({
                name: body.name,
                subjects: body.subjects,
                universities: [
                    body.primaryUniversity,
                    body.secondaryUniversity,
                ],
            });
            res.status(200).json({ message: "Teacher added successfully" });
        } catch (error) {
            console.error("Error adding teacher:", error);
            res.status(500).json({ error: "Failed to add teacher" });
        }
    } else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
