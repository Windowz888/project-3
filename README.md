Toronto Crime Data Visualization
This project provides an interactive visualization of crime data in Toronto. It uses Flask as the backend framework and connects to a PostgreSQL database to fetch and serve the data.

Structure of app.py
Database Connection: The application uses the psycopg2 library to connect to a PostgreSQL database. Connection details are fetched from environment variables to ensure security and flexibility.
Routes: Various API routes serve data endpoints for the visualization, such as daily crime rates, available years, monthly crime rates, and more.
Data Processing: Some routes involve processing data (e.g., calculating correlations) using the numpy library.
Static Files: The application serves static files (like JS and CSS) required for the frontend visualization.
JavaScript Files
charts1.js: This script provides functionalities for a dropdown menu to select a year and visualize crime data using line and pie charts.
charts2.js: This script visualizes crime data based on neighborhoods using a bar chart. It fetches the list of neighborhoods and updates the chart based on the selected neighborhood.
charts.js: This script visualizes the number of crimes for each day of the week using a bar chart. It updates the chart based on the selected crime type.
charts3.js: This script visualizes a correlation matrix using a heatmap. It fetches correlation data and updates the heatmap based on the correlation values.
heatmap.js: This script generates a heatmap based on homicide data. It fetches data from an external URL and visualizes the density of homicides in different locations.
leaflet-heat.js: This is a library script that provides functionality for drawing heatmaps on a map using the Leaflet library.
Web Interface
The visualization is primarily presented through a web interface, which is structured and styled using index.html and styles.css, respectively.

index.html: This is the main HTML file that structures the web interface of the visualization. It includes sections for heatmap visualization, crime by month, crime by day of the week, crime by neighborhood, and a correlation matrix of crime types.
styles.css: This file provides the styling for the web interface, ensuring a clean and user-friendly presentation of the visualizations.
Setup Instructions
Clone the Repository
bash
Copy code
git clone https://github.com/Windowz888/project-3.git
cd project-3
Set Up Virtual Environment (Optional but Recommended)
bash
Copy code
python3 -m venv venv
source venv/bin/activate
Install Dependencies
bash
Copy code
pip install flask psycopg2 python-dotenv numpy
Configure Database Connection
To securely connect to the database, create a .env file in the root directory of the project.
Add your database configuration details in the .env file. For security reasons, do not expose sensitive details like passwords in public documents or version control. Instead, use placeholders and provide actual values only in the local .env file.
Example .env structure: /n

makefile
Copy code
DB_NAME=your_database_name
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=your_host
DB_PORT=your_port
Run the Application
bash
Copy code
python app.py
Access the application at http://127.0.0.1:5001/.



