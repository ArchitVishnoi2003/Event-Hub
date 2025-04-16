# College Event Management System

A modern web application for managing college events, built with React, TypeScript, and Firebase.

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Firebase account (for backend services)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd college-event-management
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication and Firestore Database
   - Create a `.env` file in the root directory and add your Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```


#FIREBASE RULES
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /events/{eventId} {
      allow read: if true;
      allow create: if true;
      allow update, delete: if true;
    }
    
    match /users/{userId} {
      allow read: if true;
      allow create: if true;
      allow update: if true;
    }
  }
}


## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Development

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To create a production build:
```bash
npm run build
```

The build files will be in the `dist` directory.

## Technologies Used

- React 18
- TypeScript
- Vite
- Firebase
- Tailwind CSS
- Framer Motion
- React Router
- React Hot Toast

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── pages/         # Page components
  ├── services/      # Firebase and other services
  ├── types/         # TypeScript type definitions
  ├── utils/         # Utility functions
  └── App.tsx        # Main application component
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 


