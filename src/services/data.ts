import { TeacherProps } from "@/app/types";

export const teachers: TeacherProps[] = [
    {
        id: 1,
        name: "John Doe",
        totalRatingValue: 20,
        numberOfVotes: 5,
        subject: ["Matematyka", "Fizyka"],
        university: ["Politechnika Wrocławska", "Politechnika Poznańska"],
        timestamp: 1,
    },
    {
        id: 2,
        name: "Marek Marucha",
        totalRatingValue: 15,
        numberOfVotes: 3,
        subject: ["Matematyka", "Informatyka"],
        university: ["Politechnika Wrocławska", "Politechnika Poznańska"],
        timestamp: 2,
    },
    {
        id: 3,
        name: "Anna Kowalska",
        totalRatingValue: 25,
        numberOfVotes: 7,
        subject: ["Analiza Matematyczna", "Fizyka"],
        university: ["Uniwersytet Wrocławski", "Politechnika Wrocławska"],
        timestamp: 3,
    },
    {
        id: 4,
        name: "Piotr Nowak",
        totalRatingValue: 30,
        numberOfVotes: 10,
        subject: ["Podstawy Elektroniki", "Informatyka"],
        university: [
            "Politechnika Wrocławska",
            "Uniwersytet Ekonomiczny we Wrocławiu",
        ],
        timestamp: 4,
    },
    {
        id: 5,
        name: "Katarzyna Wiśniewska",
        totalRatingValue: 18,
        numberOfVotes: 4,
        subject: ["Podstawy Programowania", "Systemy Operacyjne"],
        university: [
            "Politechnika Poznańska",
            "Uniwersytet Przyrodniczy we Wrocławiu",
        ],
        timestamp: 5,
    },
    {
        id: 6,
        name: "Tomasz Zieliński",
        totalRatingValue: 22,
        numberOfVotes: 6,
        subject: ["Technologie Sieciowe", "Teoria Obwodów"],
        university: [
            "Uniwersytet Medyczny we Wrocławiu",
            "Politechnika Wrocławska",
        ],
        timestamp: 6,
    },
    {
        id: 7,
        name: "Agnieszka Lewandowska",
        totalRatingValue: 28,
        numberOfVotes: 8,
        subject: ["Teoria Sygnałów", "Fizyka"],
        university: [
            "Uniwersytet Muzyczny we Wrocławiu",
            "Uniwersytet Wrocławski",
        ],
        timestamp: 7,
    },
    {
        id: 8,
        name: "Janusz Kowalski",
        totalRatingValue: 35,
        numberOfVotes: 12,
        subject: ["Informatyka", "Systemy Operacyjne"],
        university: [
            "Politechnika Wrocławska",
            "Uniwersytet Ekonomiczny we Wrocławiu",
        ],
        timestamp: 8,
    },
    {
        id: 9,
        name: "Ewa Nowicka",
        totalRatingValue: 40,
        numberOfVotes: 15,
        subject: ["Analiza Matematyczna", "Podstawy Elektroniki"],
        university: ["Uniwersytet Wrocławski", "Politechnika Poznańska"],
        timestamp: 9,
    },
    {
        id: 10,
        name: "Michał Kwiatkowski",
        totalRatingValue: 45,
        numberOfVotes: 20,
        subject: ["Teoria Obwodów", "Technologie Sieciowe"],
        university: [
            "Uniwersytet Przyrodniczy we Wrocławiu",
            "Uniwersytet Medyczny we Wrocławiu",
        ],
        timestamp: 10,
    },
];

export const subjects = [
    "Analiza Matematyczna",
    "Fizyka",
    "Informatyka",
    "Podstawy Elektroniki",
    "Podstawy Programowania",
    "Systemy Operacyjne",
    "Technologie Sieciowe",
    "Teoria Obwodów",
    "Teoria Sygnałów",
];

export const universities = [
    "Politechnika Wrocławska",
    "Uniwersytet Wrocławski",
    "Uniwersytet Przyrodniczy we Wrocławiu",
    "Uniwersytet Ekonomiczny we Wrocławiu",
    "Uniwersytet Medyczny we Wrocławiu",
    "Uniwersytet Muzyczny we Wrocławiu",
    "Politechnika Poznańska",
];
