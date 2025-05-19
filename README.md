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


DEVELOPERS MANUAL ------------------------------------

Nutrition Charts and Meal Tracking Developer Manual
Overview
Nutrition Charts and Meal Tracking is a web application designed to help users track meals and visualize nutritional data. The frontend is built with HTML, CSS (using Grid and Flexbox), and JavaScript, utilizing Chart.js for data visualization and GSAP for animations. The backend is a Node.js application with Express, integrated with a Supabase database for data persistence. This manual provides comprehensive documentation for developers to understand, maintain, and extend the application.
Project Architecture

Frontend: A single-page application (index.html) with dynamic content loading for three pages (Home, About, Meal Planner). Uses Fetch API for data interactions, Chart.js for charts, and GSAP for animations.
Backend: A Node.js/Express server (server.js) exposing two API endpoints for meal management and nutrition summaries. Connects to a Supabase database.
Database: Supabase (PostgreSQL) with a meals table for storing meal data.
Deployment: Static frontend files served via Express, with the backend handling API requests.

Frontend Details
Files

index.html: The main entry point, containing HTML, CSS, and JavaScript.
HTML Structure: Navigation bar, dynamic content container (#content), and footer.
CSS: Uses Grid (content-grid) and Flexbox (nav ul, #meal-form) for responsive layouts. Ensures cross-browser compatibility (Chrome, Firefox, Safari, Edge).
JavaScript: Handles page navigation, API calls, chart rendering, and animations.



Libraries

Chart.js (v4.4.4): Renders a bar chart in the Meal Planner page to display calories by meal type.
CDN: https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js


GSAP (v3.12.5): Animates card elements on page load with fade and slide effects.
CDN: https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js



Page Structure

Home: Hero section with a gradient background and three feature cards (Track Meals, Visualize Data, Plan Ahead).
About: Hero section and cards detailing mission, team, and contact info.
Meal Planner: Form to add meals, a Chart.js bar chart, and a grid of meal cards.

Fetch API Calls
The frontend makes three Fetch API calls:

Fetch Meals: Retrieves all meals from Supabase (GET ${SUPABASE_URL}/rest/v1/meals).
Used in fetchMeals() to populate the meal list.


Save Meal: Creates a new meal (POST /api/meals).
Used in saveMeal() to store user-entered meals.


Fetch Nutrition Summary: Retrieves aggregated calorie data (GET /api/nutrition-summary).
Used in fetchNutritionSummary() to update the chart.



Key Functions

loadPage(page): Loads page content dynamically and triggers GSAP animations.
fetchMeals(): Fetches and displays meals from Supabase.
saveMeal(): Sends new meal data to the backend and refreshes the meal list and chart.
fetchNutritionSummary(): Fetches calorie data and calls renderChart().
renderChart(data): Creates or updates the Chart.js bar chart.
displayMeals(meals): Renders meal cards with GSAP animations.

Backend Details
Files

server.js: Node.js/Express server with two API endpoints and Supabase integration.

Dependencies

express: Web framework for routing and middleware.
Install: npm install express


@supabase/supabase-js: Client for Supabase database interactions.
Install: npm install @supabase/supabase-js



API Endpoints

GET /api/nutrition-summary
Purpose: Retrieves total calories by meal type (Breakfast, Lunch, Dinner).
Logic: Queries Supabase meals table, aggregates calories, and returns a JSON array.
Response:[
  { "type": "Breakfast", "total_calories": 600 },
  { "type": "Lunch", "total_calories": 800 },
  { "type": "Dinner", "total_calories": 1000 }
]


Error Handling: Returns 500 with error details if Supabase query fails.


POST /api/meals
Purpose: Creates a new meal entry in the Supabase meals table.
Request Body:{
  "name": "Oatmeal",
  "type": "Breakfast",
  "calories": 200
}


Validation: Ensures name, type, and calories are provided.
Response:
Success (201): { "message": "Meal created successfully", "data": [...] }
Error (400/500): { "error": "Message", "details": "Details" }


Error Handling: Returns 400 for missing fields, 500 for Supabase errors.



Supabase Configuration

URL and Key: Set supabaseUrl and supabaseKey in server.js and index.html.
Client Initialization: Uses createClient from @supabase/supabase-js.

Database Schema

Table: meals
Columns:
id: Integer, auto-increment, primary key
name: Text (e.g., "Oatmeal")
type: Text (e.g., "Breakfast", "Lunch", "Dinner")
calories: Integer (e.g., 200)


Row Level Security (RLS):
Enable RLS in Supabase.
Set policies:
SELECT: Allow anon key to read all rows.
INSERT: Allow anon key to insert new rows.





Setup Instructions
Prerequisites

Git (install)
Node.js and npm (install)
Supabase account (sign up)
Text editor (e.g., VS Code)

Steps

Clone Repository:git clone https://github.com/username/nutrition-planner.git
cd nutrition-planner


Install Dependencies:npm install express @supabase/supabase-js


Configure Supabase:
Create a meals table in Supabase with the above schema.
Enable RLS and set SELECT and INSERT policies.
Update index.html and server.js with your Supabase URL and anon key.


Run the Server:node server.js


Access at http://localhost:3000.


Test APIs:
Nutrition summary: curl http://localhost:3000/api/nutrition-summary
Create meal: curl -X POST http://localhost:3000/api/meals -H "Content-Type: application/json" -d '{"name":"Oatmeal","type":"Breakfast","calories":200}'



Development Guidelines
Coding Standards

JavaScript: Use ES6+ syntax, follow Airbnb style guide.
CSS: Use BEM naming for classes, keep selectors simple.
Error Handling: Log errors with details (message, stack) and return meaningful responses.
Comments: Add JSDoc for functions and inline comments for complex logic.

Adding Features

New Pages: Add to pages object in index.html, update loadPage().
New APIs: Add routes in server.js, ensure Supabase queries are secure.
New Charts: Extend renderChart() with additional Chart.js configurations.
Animations: Use GSAP for consistent card or element animations.

Testing

Frontend: Test in Chrome, Firefox, Safari, and Edge for CSS compatibility.
Backend: Use Postman or curl to test API endpoints.
Database: Verify Supabase queries return expected data.

Debugging

Supabase Errors: Check logs for Supabase error or Error fetching summary. Verify URL, key, and RLS.
Fetch Failures: Ensure server has internet access, update @supabase/supabase-js (npm install @supabase/supabase-js@latest).
Chart Issues: Console log data in renderChart() to verify API response.

Known Issues

Fetch Failed Error: Previously reported (TypeError: fetch failed). Mitigated by:
Verifying Supabase credentials.
Ensuring internet connectivity.
Updating Supabase client library.


Port Conflicts: Default port 3000 may be in use. Change port in server.js if needed.

Future Improvements

Add user authentication to secure meal data.
Implement pagination for meal list.
Add more chart types (e.g., pie chart) for nutrition analysis.
Optimize CSS with a preprocessor (e.g., Sass).
Deploy to a cloud platform (e.g., Vercel, Heroku).

Contact
For technical queries, email support@nutritionplanner.com or open an issue on the repository.
