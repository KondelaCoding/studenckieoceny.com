export type TeacherProps = {
    id: string;
    name: string;
    totalRatingValue: number;
    numberOfVotes: number;
    subjects: string[];
    universities: string[];
    graphX?: number;
    graphY?: number;
    timestamp?: number;
    comments?: Comment[];
};
/*
 * TeacherProps has indexes as subjects and universities, but the returned data from the API has them as strings.
 * This is the type that should be used for the returned data from the API.
 */
export type ReturnedTeacherProps = {
    id: string;
    name: string;
    totalRatingValue: number;
    numberOfVotes: number;
    subjects: string;
    universities: string;
    graphX?: number;
    graphY?: number;
    timestamp: number;
    comments?: Comment[];
};

export type Comment = {
    id: string;
    teacherId: string;
    user: string;
    comment: string;
    timestamp: number;
    likes: number;
};

export const Months = {
    1: "Stycznia",
    2: "Lutego",
    3: "Marca",
    4: "Kwietnia",
    5: "Maja",
    6: "Czerwca",
    7: "Lipca",
    8: "Sierpnia",
    9: "Września",
    10: "Października",
    11: "Listopada",
    12: "Grudnia 🎅",
};
