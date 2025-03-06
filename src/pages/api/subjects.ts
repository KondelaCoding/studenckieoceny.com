import { NextApiRequest, NextApiResponse } from "next";
import { addSubject, getSubjects, init } from "@/services/db";
import { subjects } from "@/services/data";

init();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "GET") {
        try {
            const subjects = await getSubjects();
            res.status(200).json(subjects);
        } catch (error) {
            console.error("Error fetching subjects:", error);
            res.status(500).json({ error: "Failed to fetch subjects" });
        }
    }
    // ! Used to mass add subjects to the database
    // } else if (req.method === "POST") {
    //     subjects.forEach((subject) => {
    //         addSubject(subject);
    //         console.log("Adding subject:", subject);
    //     });
    //     res.status(200).json({ message: "Subjects added successfully" });
    // }
}
