const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const supabaseClient = require('@supabase/supabase-js');

const app = express();
const port = 3000;
app.use(express.static(__dirname + '/public'));
app.use(express.json());

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);


app.get('/', (req, res) => {
    res.sendFile('/public/index.html', { root: __dirname });
});

// API to get nutrition summary
app.get('/api/nutrition-summary', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('meals')
            .select('type, calories')
            .not('type', 'is', null);

        if (error) {
            console.error('Supabase error:', error);
            throw error;
        }

        // Aggregate calories by meal type
        const summary = [
            { type: 'Breakfast', total_calories: 0 },
            { type: 'Lunch', total_calories: 0 },
            { type: 'Dinner', total_calories: 0 }
        ];

        data.forEach(meal => {
            const index = summary.findIndex(s => s.type === meal.type);
            if (index !== -1) {
                summary[index].total_calories += meal.calories;
            }
        });

        res.json(summary);
    } catch (error) {
        console.error('Error fetching summary:', error.message, error.stack);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// API to create a new meal
app.post('/api/meals', async (req, res) => {
    try {
        const { name, type, calories } = req.body;

        // Validate input
        if (!name || !type || !calories) {
            return res.status(400).json({ error: 'Missing required fields: name, type, calories' });
        }

        const { data, error } = await supabase
            .from('meals')
            .insert([{ name, type, calories }])
            .select();

        if (error) {
            console.error('Supabase error:', error);
            throw error;
        }

        res.status(201).json({ message: 'Meal created successfully', data });
    } catch (error) {
        console.error('Error creating meal:', error.message, error.stack);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
