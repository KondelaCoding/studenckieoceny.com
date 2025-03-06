export type TeacherProps = {
    id: number;
    name: string;
    totalRatingValue: number;
    numberOfVotes: number;
    subjects: string[];
    universities: string[];
    graphX?: number;
    graphY?: number;
    timestamp: number;
    comments?: Comment[];
};

export type Comment = {
    id: number;
    teacherId: number;
    user: string;
    comment: string;
    timestamp: number;
    likes: number;
};
