import { NextApiRequest, NextApiResponse } from "next";
import { addTeacher, getVisibleTeachers, init } from "@/lib/db";
import { TeacherProps } from "@/types";

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
            const body: TeacherProps = req.body;
            await addTeacher({
                id: body.id,
                name: body.name,
                totalRatingValue: body.totalRatingValue,
                numberOfVotes: body.numberOfVotes,
                graphX: body.graphX,
                graphY: body.graphY,
                timestamp: Date.now(),
                universities: body.universities,
                subjects: body.subjects,
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
