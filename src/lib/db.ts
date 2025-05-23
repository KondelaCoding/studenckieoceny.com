import sqlite3 from "sqlite3";
import { Comment, ReturnedTeacherProps, User } from "@/types";

export const db = new sqlite3.Database("database.db");

export const init = () => {
    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS teachers (
                id INTEGER PRIMARY KEY,
                name TEXT,
                totalRatingValue INTEGER DEFAULT 0,
                numberOfVotes INTEGER DEFAULT 0,
                subjects TEXT,
                timestamp INTEGER DEFAULT (strftime('%s', 'now')),
                reason TEXT DEFAULT null
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
            CREATE TABLE IF NOT EXISTS teacher_universities (
                teacherId INTEGER,
                universityId INTEGER,
                FOREIGN KEY (teacherId) REFERENCES teachers(id),
                FOREIGN KEY (universityId) REFERENCES universities(id),
                PRIMARY KEY (teacherId, universityId)
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                password TEXT,
                name TEXT NOT NULL,
                role TEXT DEFAULT 'user',
                createdAt INTEGER DEFAULT (strftime('%s', 'now')),
                updatedAt INTEGER DEFAULT (strftime('%s', 'now'))
            )
        `);
    });
};

export const addTeacher = async (
    teacher: { name: string; subjects: string; universities: number[] },
) => {
    console.log("Adding teacher:", teacher);
    return new Promise<void>((resolve, reject) => {
        db.run(
            "INSERT INTO teachers (name, subjects) VALUES (?, ?)",
            [
                teacher.name,
                teacher.subjects,
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
                    resolve(undefined);
                }
            },
        );
    });
};

export const getAllTeachers = () => {
    return new Promise((resolve, reject) => {
        db.all<ReturnedTeacherProps>(
            `SELECT t.*, 
                GROUP_CONCAT(DISTINCT u.name) AS universities
         FROM teachers t
         LEFT JOIN teacher_universities tu ON t.id = tu.teacherId
         LEFT JOIN universities u ON tu.universityId = u.id
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

export const getVisibleTeachers = () => {
    return new Promise((resolve, reject) => {
        db.all<ReturnedTeacherProps>(
            `SELECT t.*, 
                GROUP_CONCAT(DISTINCT u.name) AS universities
         FROM teachers t
         LEFT JOIN teacher_universities tu ON t.id = tu.teacherId
         LEFT JOIN universities u ON tu.universityId = u.id
         WHERE t.reason IS NULL
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

export const hideTeacher = (id: string, reason: string) => {
    return new Promise((resolve, reject) => {
        db.run(
            "UPDATE teachers SET reason = ? WHERE id = ?",
            [reason, id],
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

export const unhideTeacher = (id: string) => {
    return new Promise((resolve, reject) => {
        db.run(
            "UPDATE teachers SET reason = NULL WHERE id = ?",
            [id],
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

export const getTeacherById = (id: string) => {
    return new Promise<ReturnedTeacherProps>((resolve, reject) => {
        db.get<ReturnedTeacherProps>(
            `SELECT t.*, 
                        GROUP_CONCAT(DISTINCT u.name) AS universities
                 FROM teachers t
                 LEFT JOIN teacher_universities tu ON t.id = tu.teacherId
                 LEFT JOIN universities u ON tu.universityId = u.id
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

export const addUser = async (
    email: string,
    hashedPassword: string | null,
    name: string,
) => {
    return new Promise<void>((resolve, reject) => {
        db.run(
            "INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
            [email, hashedPassword, name],
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

export const getUserByEmail = (email: string) => {
    return new Promise<User>((resolve, reject) => {
        db.get(
            "SELECT * FROM users WHERE email = ?",
            [email],
            (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row as User);
                }
            },
        );
    });
};

export const deleteTeacher = (id: string) => {
    return new Promise<void>((resolve, reject) => {
        db.run(
            "DELETE FROM teachers WHERE id = ?",
            [id],
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
