import { getUserByEmail, init } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

init();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "GET") {
        try {
            const { email } = req.query;
            const user = await getUserByEmail(email as string);
            if (!user) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            return res.status(200).json({ user });
        } catch (error) {
            console.error("Error fetching user:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
