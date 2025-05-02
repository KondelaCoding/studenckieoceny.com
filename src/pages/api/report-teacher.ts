import type { NextApiRequest, NextApiResponse } from "next";
import { reportTeacherNotification } from "@/services/mail";
import { hideTeacher, init } from "@/lib/db";

init();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "POST") {
        const { teacherId, message } = req.body;

        if (!teacherId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        try {
            await reportTeacherNotification(teacherId, message || "");
            res.status(200).json({ message: "Email sent successfully" });
        } catch (error) {
            console.error("Error sending email:", error);
            res.status(500).json({ message: "Failed to send email" });
        }

        try {
            await hideTeacher(teacherId);
            res.status(200).json({ message: "Teacher hidden successfully" });
        } catch (error) {
            console.error("Error hiding teacher:", error);
            res.status(500).json({ message: "Failed to hide teacher" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
