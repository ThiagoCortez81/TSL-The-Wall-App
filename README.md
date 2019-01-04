# The Wall APP

## API - Backend
To run the backend application, you will need first to:

1. Enter into the directory
`cd api`

2. Then enter in the Virtual Environment using
`source venv/bin/activate`

3. In (venv) mode, you can run the application
`python rest_api/manage.py runserver`

4. The backend app is now listening on http://localhost:8000

`NOTE: To email sender starts working, first you need to edit the file /api/rest_api/rest_api/ and change the content of lines starting at 57 and going to 61 to your data`

## Frontend
To run the frontend application, you will need first to:

1. Enter into the directory
`cd frontend`

2. Install the dependencies
`npm install`

3. Then, you can run the application
`npm start`

4. The frontend app is now listening on http://localhost:3000

## Testing frontend
1. Enter into the directory
`cd frontend`

2. Run the tests with
`npm test`
