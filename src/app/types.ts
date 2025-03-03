export type TeacherProps = {
    id: number;
    name: string;
    totalRatingValue: number;
    numberOfVotes: number;
    subject: string;
    university: string;
    graphX?: number;
    graphY?: number;
    timestamp: number;
    comments?: Comment[];
};

export type Comment = {
    user: string;
    comment: string;
    timestamp: number;
    likes: number;
};
