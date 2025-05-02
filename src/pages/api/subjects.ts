import { NextApiRequest, NextApiResponse } from "next";
import { addSubject, getSubjectsByName, init } from "@/lib/db";

init();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "GET") {
        try {
            const subjects = await getSubjectsByName(req.query.name as string);
            res.status(200).json(subjects);
        } catch (error) {
            console.error("Error fetching subjects:", error);
            res.status(500).json({ error: "Failed to fetch subjects" });
        }
    } else if (req.method === "POST") {
        const subjectsData = await getSubjectsByName() as unknown as {
            name: string;
        }[];

        if (
            subjectsData.some((s: { name: string }) =>
                s.name.toLowerCase() === req.body.name
            )
        ) {
            return res.status(400).json({
                error: "Subject already exists",
            });
        }
        try {
            const { name } = req.body;
            if (!name) {
                return res.status(400).json({
                    error: "Missing required fields",
                });
            }
            await addSubject(name.toLowerCase());
            res.status(200).json({ message: "Subject added successfully" });
        } catch (error) {
            console.error("Error adding subject:", error);
            res.status(500).json({ error: "Failed to add subject" });
        }
    }
}
