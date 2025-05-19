# INST377_Final_Project

Martin Konteh

Nutrition Charts and Tracking
This is a web application for tracking meals and visualizing nutritional data. Users can log meals, categorize them by type (Breakfast, Lunch, Dinner), and view calorie summaries in a bar chart. The frontend is built with HTML, CSS (using Grid and Flexbox), and JavaScript, leveraging Chart.js for charts and GSAP for animations. The backend uses Node.js with Express and connects to a Supabase database for data storage.

Includes:

Three Pages:
Home: Introduces the application with a hero section and feature cards.
About: Details the mission, team, and contact information.
Meal Planner: Allows users to add meals and view a calorie summary chart.


Frontend:
Uses Fetch API for data interactions (three calls: fetch meals, save meal, fetch nutrition summary).
Styled with modern CSS (Grid, Flexbox) for cross-browser compatibility.
Includes two JavaScript libraries: Chart.js for charts and GSAP for card-based animations.


Backend:
Two API endpoints:
GET /api/nutrition-summary: Retrieves aggregated calorie data by meal type.
POST /api/meals: Saves new meal entries to the database.


Connects to a Supabase database

Prerequisites
Git, Node.js, Supabase

Setup Instructions
1. Clone the Repository
Clone the project from your remote repository

2. Configure Supabase

Create a Supabase project at supabase.com.
Create a meals table with the following schema:
id: Integer, auto-increment, primary key
name: Text
type: Text
calories: Integer

3. Install Backend Dependencies
Install the required Node.js packages:
npm install express @supabase/supabase-js

4. Configure Environment
Update the Supabase credentials in both files:

5. Run the Application
Start the backend server:
node server.js

The server runs on http://localhost:3000. Open this URL in a browser to access the website.

Usage

Navigate Pages:
Use the navigation bar to switch between Home, About, and Meal Planner.


Meal Planner:
Add a meal by entering a name, selecting a type (Breakfast, Lunch, Dinner), and specifying calories.
Click "Save Meal" to store the entry.
View the meal list and a bar chart summarizing calories by meal type.


Project Structure

index.html: Frontend code with HTML, CSS, and JavaScript.
server.js: Backend code with Express and Supabase integration.
public/: Directory for static files (ensure index.html is served from here).

Troubleshooting

Supabase Errors:
Verify Supabase URL and anon key.
Ensure the meals table exists and RLS policies are correct.
Check server logs for detailed errors (Error fetching summary or similar).
