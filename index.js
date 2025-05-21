const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const supabaseClient = require('@supabase/supabase-js');
const axios = require('axios'); 

const app = express();
const port = 3000;
app.use(express.static(__dirname + '/public'));
app.use(express.json());

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);


// Nutritionix configuration 
const NUTRITIONIX_APP_ID = process.env.NUTRITIONIX_APP_ID || '7688c68f';
const NUTRITIONIX_API_KEY = process.env.NUTRITIONIX_API_KEY || '5b73c9212b1cd6df81b92bc862575f9f';


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

// Delete: Delete a meal, clear graph
app.delete('/api/meals/clear-all', async (req, res) => {
    try {
        // Deleting all rows from the 'meals' table
        const { error } = await supabase
            .from('meals')
            .delete()
            .neq('id', 0); // Condition to delete all rows. 'true' condition doesn't always work directly with Supabase.

        if (error) {
            console.error('Supabase error deleting meals:', error);
            throw error;
        }

        res.status(200).json({ message: 'All meal entries cleared successfully' });
    } catch (error) {
        console.error('Error clearing meals:', error.message, error.stack);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});


// Nutritionix: search for food items
app.get('/api/nutritionix/search', async (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const response = await axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients',
            { query: query },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-app-id': NUTRITIONIX_APP_ID,
                    'x-app-key': NUTRITIONIX_API_KEY
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error calling Nutritionix API (Search):', error.message);
        if (error.response) {
            console.error('Nutritionix API response error:', error.response.data);
            res.status(error.response.status).json({ error: 'Error from Nutritionix API', details: error.response.data });
        } else {
            res.status(500).json({ error: 'Internal server error', details: error.message });
        }
    }
});

// Nutritionix: common foods
app.get('/api/nutritionix/common', async (req, res) => {
    try {
        const response = await axios.get('https://trackapi.nutritionix.com/v2/search/instant',
            {
                headers: {
                    'x-app-id': NUTRITIONIX_APP_ID,
                    'x-app-key': NUTRITIONIX_API_KEY
                },
                params: {
                    query: 'common',
                    common: true,
                    branded: false
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error calling Nutritionix API (Common Foods):', error.message);
        if (error.response) {
            console.error('Nutritionix API response error:', error.response.data);
            res.status(error.response.status).json({ error: 'Error from Nutritionix API', details: error.response.data });
        } else {
            res.status(500).json({ error: 'Internal server error', details: error.message });
        }
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});