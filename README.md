# Product Recommendation System

This project consists of a backend server and a frontend React application designed to provide a seamless product recommendation experience.

## Live Link:
https://product-recommendation-s-c2392.web.app/
---

## Features

### Backend
- Built with **Node.js** and **Express.js**.
- **MongoDB** as the database for efficient storage and retrieval of data.
- Implements **JWT-based Authentication** for secure user management.
- **CORS** support for cross-origin requests.

### Frontend
- Developed using **React.js**.
- Responsive design for various devices.

---

## Prerequisites

### Backend:
1. Node.js (v16 or above)
2. MongoDB Database

### Frontend:
1. A modern web browser
2. Internet connection

---

## Installation and Setup

### Backend

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd product-recommendation-system-server
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   DB_USER=your_mongo_user
   DB_PASS=your_mongo_password
   JWT_SECRET=your_jwt_secret
   NODE_ENV=production
   ```

4. **Start the Server:**
   ```bash
   npm start
   ```

5. **Server Running:**
   Visit `http://localhost:5000` to ensure the server is running.

### Frontend

1. **Navigate to the React Project Directory:**
   Ensure your React frontend is located appropriately.

2. **Host Frontend Locally:**
   ```bash
   npm install
   npm run start
   ```

3. **Open in Browser:**
   Visit `http://localhost:3000` to interact with the application.

---

## Project Structure

### Backend
- **index.js**: Main server entry point.
- **package.json**: Manages dependencies and scripts.

### Frontend
- **index.html**: Entry point for React application.

---

## Key Dependencies

### Backend
- **Express.js**: Server framework.
- **MongoDB**: Database.
- **jsonwebtoken**: For user authentication.
- **dotenv**: Environment variable management.

### Frontend
- **React.js**: User interface library.
- **CSS**: Styling.

---

## Deployment

1. **Backend Deployment:**
   - Deploy on platforms like [Vercel](https://vercel.com) or [Heroku](https://heroku.com).

2. **Frontend Deployment:**
   - Host on services like [Firebase](https://firebase.google.com) or [Netlify](https://www.netlify.com).

---

## Known Issues

- **CORS Errors:** Ensure the backend's CORS middleware matches the frontend's deployment URL.
- **Environment Misconfiguration:** Verify `.env` variables are correctly set.

---

## Contributing

Contributions are welcome! Please fork the repository and create a pull request.

---

## License

This project is licensed under the ISC License. See the `LICENSE` file for more details.

---

## Contact

For any inquiries, reach out to ifakhrul23@gmail.com.
