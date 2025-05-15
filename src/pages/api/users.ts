import { NextApiRequest, NextApiResponse } from "next";
import { addUser, init } from "@/lib/db";

init();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "POST") {
        try {
            const body = req.body;
            await addUser(
                body.email,
                body.password,
                body.name,
            );
            res.status(200).json({ message: "User added successfully" });
        } catch (error) {
            console.error("Error adding user:", error);
            res.status(500).json({ error: "Failed to add user" });
        }
    } else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
