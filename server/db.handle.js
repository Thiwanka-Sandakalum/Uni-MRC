const db = require('./db');

async function fetchData(query, params = []) {
    return new Promise((resolve, reject) => {
        db.all(query, params, (error, rows) => {
            if (error) {
                reject(error);
            } else {
                resolve(rows);
            }
        });
    });
}

async function getCourseData() {
    const query = 'SELECT DISTINCT course FROM students';
    return fetchData(query);
}

async function getUniData() {
    const query = 'SELECT DISTINCT university FROM students';
    return fetchData(query);
}

async function getNameData() {
    const query = 'SELECT DISTINCT name FROM students';
    return fetchData(query);
}

async function getData(university, course) {
    let query = 'SELECT name, university, course FROM students';

    if (university && course) {
        query += ' WHERE university = ? AND course = ?';
    } else if (university) {
        query += ' WHERE university = ?';
    } else if (course) {
        query += ' WHERE course = ?';
    }

    return fetchData(query, [university, course].filter(Boolean));
}

async function getName(_name) {
    const query = 'SELECT * FROM students WHERE name = ?';
    return fetchData(query, [_name]);
}

module.exports = {
    getCourseData,
    getUniData,
    getNameData,
    getData,
    getName,
};
