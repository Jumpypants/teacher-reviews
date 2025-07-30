# Project Structure

This React application has been refactored into a clean, modular structure:

## 📁 Components (`/src/components/`)
- **AuthPage.js** - Handles user authentication UI
- **Header.js** - App header with branding and user info
- **AddTeacherForm.js** - Form for adding new teachers
- **TeacherCard.js** - Individual teacher card display
- **TeachersGrid.js** - Grid layout for all teachers 
- **HomePage.js** - Main home page component
- **WriteReviewForm.js** - Form for submitting reviews
- **ReviewCard.js** - Individual review display
- **ReviewsSection.js** - Section containing all reviews
- **TeacherPage.js** - Individual teacher profile page

## 🎣 Hooks (`/src/hooks/`)
- **useAuth.js** - Manages authentication state and sign-in
- **useFirestoreData.js** - Handles all Firestore data fetching

## 🛠 Utils (`/src/utils/`)
- **ratingUtils.js** - Rating calculation utilities
- **firebaseService.js** - Firebase database operations

## 📱 Main App
- **App.js** - Main app component with routing logic
- **App.css** - All application styles
- **firebase.js** - Firebase configuration

## 🔥 Firebase Collections
- **teachers** - Teacher profiles with name, school, subjects
- **reviews** - Reviews with ratings, comments, and metadata
- **users** - User profiles and roles

## Key Features
✅ Google Authentication  
✅ Teacher profiles with ratings  
✅ Review system with star ratings  
✅ Yelp-like interface  
✅ Real-time data updates  
✅ Responsive design  
✅ Modular component architecture
