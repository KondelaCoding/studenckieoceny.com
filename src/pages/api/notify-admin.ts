import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

async function notifyAdmin(
    { teacherProps, email }: {
        teacherProps: {
            name: string;
            otherUniversity: string;
            otherSubject: string;
        };
        email: string;
    },
) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASSWORD,
        },
    });

    const info = await transporter.sendMail({
        from: "Teacher Ranking",
        to: process.env.MY_EMAIL,
        subject: `User wants to add a new teacher`,
        text:
            "A new teacher has been added to the database. Please verify the data.",
        html: `
            <p>Name: ${teacherProps.name}</p>
            <p>Other university: ${teacherProps.otherUniversity}</p>
            <p>Other uubject: ${teacherProps.otherSubject}</p>
            <hr />
            <p>Email: ${email}</p>
        `,
    });

    console.log("Email sent: ", info.messageId);
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { teacherProps, email } = req.body;

    if (!teacherProps || !email) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        await notifyAdmin({ teacherProps, email });
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to send email" });
    }
}
