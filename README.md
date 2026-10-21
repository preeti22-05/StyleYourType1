# StyleYourType

## Deploy to Render

The `render.yaml` Blueprint creates a static React frontend and a Node.js API service. Connect this GitHub repository to Render as a Blueprint and deploy the services.

During initial Blueprint setup, provide these API service secrets directly in Render:

- `MONGO_URI`: MongoDB connection string
- `EMAIL_USER`: Gmail account used to send verification and notification email
- `EMAIL_PASS`: Gmail app password

Render generates `JWT_SECRET`. The frontend API URL and backend CORS origin are linked to the corresponding Render services.

The API service uses the free plan, which can spin down when idle and take a short time to respond to its first request.

## Local development

Run `npm install` in `backend` and `frontend`. Set `MONGO_URI`, `JWT_SECRET`, `EMAIL_USER`, and `EMAIL_PASS` in `backend/.env`, then start the API with `npm start` in `backend` and the frontend with `npm start` in `frontend`.
