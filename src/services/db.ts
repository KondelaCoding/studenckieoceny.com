import sqlite3 from "sqlite3";
import { Comment, ReturnedTeacherProps, Subject, TeacherProps } from "@/types";

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

export const addTeacher = async (teacher: TeacherProps) => {
    const timestamp = Date.now();
    return new Promise<void>((resolve, reject) => {
        db.run(
            "INSERT INTO teachers (name, totalRatingValue, numberOfVotes, graphX, graphY, timestamp) VALUES (?, ?, ?, ?, ?, ?)",
            [
                teacher.name,
                teacher.totalRatingValue,
                teacher.numberOfVotes,
                teacher.graphX,
                teacher.graphY,
                timestamp,
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

                    resolve(undefined);
                }
            },
        );
    });
};

export const getTeachers = () => {
    return new Promise((resolve, reject) => {
        db.all<ReturnedTeacherProps>(
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

export const getTeacherComments = (teacherId: string) => {
    return new Promise((resolve, reject) => {
        db.all(
            "SELECT * FROM comments WHERE teacherId = ? ORDER BY timestamp DESC",
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

export const addComment = (comment: Comment) => {
    return new Promise((resolve, reject) => {
        db.run(
            "INSERT INTO comments (teacherId, user, comment, timestamp, likes) VALUES (?, ?, ?, ?, ?)",
            [comment.teacherId, comment.user, comment.comment, Date.now(), 0],
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(undefined);
                }
            },
        );
    });
};

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

// ! Used only by the admin
export const addUniversity = (name: string) => {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO universities (name) VALUES (?)", [name], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(undefined);
            }
        });
    });
};

export const addSubject = (name: string) => {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO subjects (name) VALUES (?)", [name], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(undefined);
            }
        });
    });
};

export const getSubjectsByName = (name?: string) => {
    if (name) {
        return new Promise((resolve, reject) => {
            db.all<Subject[]>(
                "SELECT * FROM subjects WHERE name LIKE ?",
                [`%${name}%`],
                (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                },
            );
        });
    } else {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM subjects", (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
};

export const getTeacherById = (id: string) => {
    return new Promise<ReturnedTeacherProps>((resolve, reject) => {
        db.get<ReturnedTeacherProps>(
            `SELECT t.*, 
                        GROUP_CONCAT(DISTINCT u.name) AS universities, 
                        GROUP_CONCAT(DISTINCT s.name) AS subjects 
                 FROM teachers t
                 LEFT JOIN teacher_universities tu ON t.id = tu.teacherId
                 LEFT JOIN universities u ON tu.universityId = u.id
                 LEFT JOIN teacher_subjects ts ON t.id = ts.teacherId
                 LEFT JOIN subjects s ON ts.subjectId = s.id
                 WHERE t.id = ?
                 GROUP BY t.id`,
            [id],
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

export const updateRating = async (id: string, rating: number) => {
    try {
        new Promise<void>((resolve, reject) => {
            db.run(
                `UPDATE teachers SET totalRatingValue = totalRatingValue + ?, numberOfVotes = numberOfVotes + 1 WHERE id = ?`,
                [rating, id],
                (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                },
            );
        });
        return true;
    } catch (error) {
        console.error("Error updating rating:", error);
        return false;
    }
};
