import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
    },
});

export const addTeacherNotification = async (
    { teacherProps, email }: {
        teacherProps: {
            name: string;
            otherUniversity: string;
            otherSubject: string;
        };
        email: string;
    },
) => {
    const response = await transporter.sendMail({
        from: "Teacher Ranking",
        to: process.env.MY_EMAIL,
        subject: `Teacher to verify`,
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

    console.log("Email sent: ", response.messageId);
};

export const reportTeacherNotification = async (
    teacherId: string,
    message: string,
) => {
    const response = await transporter.sendMail({
        from: "Teacher Ranking",
        to: process.env.MY_EMAIL,
        subject: `Reported a teacher`,
        text: message,
        html: `
            <h1>User reported a teacher with ID: ${teacherId}</h1>
            <a href="${process.env.BASE_URL}/${teacherId}">Click here to view the teacher</a>
            <hr />
            <h1>Message:</h1>
            <p>${message}</p>
            <hr />
            <h2>Verify if the teacher should be hidden</h2>
        `,
    });

    console.log("Report sent: ", response.messageId);
};
