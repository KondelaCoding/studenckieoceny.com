import type { NextApiRequest, NextApiResponse } from "next";
import { reportTeacherNotification } from "@/services/mail";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

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
}
