const express = require('express');
const app = express();
const { getCourseData, getUniData, getNameData, getData, getName } = require('./db.handle');

const port = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});


const router = express.Router();

router.get('/courses', async (req, res) => {
    try {
        const courses = await getCourseData();
        res.json({ courses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/universities', async (req, res) => {
    try {
        const universities = await getUniData();
        res.json({ universities });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/names', async (req, res) => {
    try {
        const names = await getNameData();
        res.json({ names });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/data', async (req, res) => {
    const { university, course } = req.query;
    try {
        const data = await getData(university, course);
        res.json({ data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/name/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const data = await getName(name);
        res.json({ data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.use('/api', router);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
    console.log(`Application started on http://localhost:${port}`);
});
