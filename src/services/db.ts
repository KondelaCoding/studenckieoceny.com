import sqlite3 from "sqlite3";
import { Comment, TeacherProps } from "@/types";

export const db = new sqlite3.Database("database.db");

export const init = () => {
    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS teachers (
                id INTEGER PRIMARY KEY,
                name TEXT,
                totalRatingValue INTEGER,
                numberOfVotes INTEGER,
                graphX INTEGER,
                graphY INTEGER,
                timestamp INTEGER
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS comments (
                id INTEGER PRIMARY KEY,
                teacherId INTEGER,
                user TEXT,
                comment TEXT,
                timestamp INTEGER,
                likes INTEGER,
                FOREIGN KEY (teacherId) REFERENCES teachers(id)
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS universities (
                id INTEGER PRIMARY KEY,
                name TEXT
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS subjects (
                id INTEGER PRIMARY KEY,
                name TEXT
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS teacher_universities (
                teacherId INTEGER,
                universityId INTEGER,
                FOREIGN KEY (teacherId) REFERENCES teachers(id),
                FOREIGN KEY (universityId) REFERENCES universities(id),
                PRIMARY KEY (teacherId, universityId)
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS teacher_subjects (
                teacherId INTEGER,
                subjectId INTEGER,
                FOREIGN KEY (teacherId) REFERENCES teachers(id),
                FOREIGN KEY (subjectId) REFERENCES subjects(id),
                PRIMARY KEY (teacherId, subjectId)
            )
        `);
    });
};

//TODO: I cant seem to get this to work, i need the object to give array of numbers as universities and subjects but the functions in list are not working, i need to fix this

// Update: I can now show the data properly, but adding teachers doesnt work

export const addTeacher = async (teacher: TeacherProps) => {
    return new Promise<void>((resolve, reject) => {
        db.run(
            "INSERT INTO teachers (name, totalRatingValue, numberOfVotes, graphX, graphY, timestamp) VALUES (?, ?, ?, ?, ?, ?)",
            [
                teacher.name,
                teacher.totalRatingValue,
                teacher.numberOfVotes,
                teacher.graphX,
                teacher.graphY,
                teacher.timestamp,
            ],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    const teacherId = this.lastID;

                    // Insert into teacher_universities
                    if (Array.isArray(teacher.universities)) {
                        teacher.universities.forEach((university) => {
                            db.run(
                                "INSERT INTO teacher_universities (teacherId, universityId) VALUES (?, ?)",
                                [teacherId, university],
                                (err) => {
                                    if (err) {
                                        reject(err);
                                    }
                                },
                            );
                        });
                    }

                    // Insert into teacher_subjects
                    if (Array.isArray(teacher.subjects)) {
                        teacher.subjects.forEach((subject) => {
                            db.run(
                                "INSERT INTO teacher_subjects (teacherId, subjectId) VALUES (?, ?)",
                                [teacherId, subject],
                                (err) => {
                                    if (err) {
                                        reject(err);
                                    }
                                },
                            );
                        });
                    }

                    resolve();
                }
            },
        );
    });
};

// Example function to get teachers with their universities and subjects
export const getTeachers = () => {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT t.*, 
                    GROUP_CONCAT(DISTINCT u.name) AS universities, 
                    GROUP_CONCAT(DISTINCT s.name) AS subjects 
             FROM teachers t
             LEFT JOIN teacher_universities tu ON t.id = tu.teacherId
             LEFT JOIN universities u ON tu.universityId = u.id
             LEFT JOIN teacher_subjects ts ON t.id = ts.teacherId
             LEFT JOIN subjects s ON ts.subjectId = s.id
             GROUP BY t.id`,
            (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            },
        );
    });
};

// Example function to get teacher comments
export const getTeacherComments = (teacherId: number) => {
    return new Promise((resolve, reject) => {
        db.all(
            "SELECT * FROM comments WHERE teacherId = ?",
            [teacherId],
            (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            },
        );
    });
};

export const getComments = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM comments", (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// Example function to add a comment
export const addComment = (comment: Comment) => {
    return new Promise((resolve, reject) => {
        db.run(
            "INSERT INTO comments (teacherId, user, comment, timestamp, likes) VALUES (?, ?, ?, ?, ?)",
            [comment.teacherId, comment.user, comment.comment, Date.now(), 0],
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            },
        );
    });
};

// Example function to get universities
export const getUniversities = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM universities", (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// Example function to get subjects
export const getSubjects = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM subjects", (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// Example function to add a university
export const addUniversity = (name: string) => {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO universities (name) VALUES (?)", [name], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// Example function to add a subject
export const addSubject = (name: string) => {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO subjects (name) VALUES (?)", [name], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// Example function to get teacher universities
export const getTeacherUniversities = (teacherId: number) => {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT u.* FROM universities u
             JOIN teacher_universities tu ON u.id = tu.universityId
             WHERE tu.teacherId = ?`,
            [teacherId],
            (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            },
        );
    });
};

// Example function to get teacher subjects
export const getTeacherSubjects = (teacherId: number) => {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT s.* FROM subjects s
             JOIN teacher_subjects ts ON s.id = ts.subjectId
             WHERE ts.teacherId = ?`,
            [teacherId],
            (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            },
        );
    });
};

// Example function to add a university to a teacher
export const addTeacherUniversity = (
    teacherId: number,
    universityId: number,
) => {
    return new Promise((resolve, reject) => {
        db.run(
            "INSERT INTO teacher_universities (teacherId, universityId) VALUES (?, ?)",
            [teacherId, universityId],
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            },
        );
    });
};

// Example function to add a subject to a teacher
export const addTeacherSubject = (teacherId: number, subjectId: number) => {
    return new Promise((resolve, reject) => {
        db.run(
            "INSERT INTO teacher_subjects (teacherId, subjectId) VALUES (?, ?)",
            [teacherId, subjectId],
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            },
        );
    });
};

// Example function to get a university by name
export const getUniversityByName = (name: string) => {
    return new Promise((resolve, reject) => {
        db.get(
            "SELECT * FROM universities WHERE name = ?",
            [name],
            (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            },
        );
    });
};

// Example function to get a subject by name
export const getSubjectByName = (name: string) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM subjects WHERE name = ?", [name], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

// Example function to get a teacher by name
export const getTeacherByName = (name: string) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM teachers WHERE name = ?", [name], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};
