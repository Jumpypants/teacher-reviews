# Updated Firebase Security Rules

The issue is likely that the current security rules don't allow admins to read pending reviews. Here's the corrected version:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to check if user is admin
    function isAdmin() {
      return request.auth != null && 
             exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
    }
    
    // Reviews collection rules
    match /reviews/{reviewId} {
      // Allow read if:
      // - Review is approved (everyone can see approved reviews)
      // - User owns the review (can see their own reviews regardless of status)
      // - User is an admin (can see all reviews for moderation)
      allow read: if resource.data.status == "approved" 
                  || resource.data.reviewerId == request.auth.uid
                  || isAdmin();
      
      // Allow create for authenticated users
      allow create: if request.auth != null 
                    && request.auth.uid == request.resource.data.reviewerId;
      
      // Allow update/delete if user owns the review OR is admin
      allow update, delete: if request.auth != null 
                           && (request.auth.uid == resource.data.reviewerId || isAdmin());
    }
    
    // Teachers collection rules
    match /teachers/{teacherId} {
      // Allow read if teacher is approved OR user is admin
      allow read: if resource.data.status == "approved" || isAdmin();
      
      // Allow create for authenticated users
      allow create: if request.auth != null;
      
      // Allow update for admins only
      allow update: if isAdmin();
    }
    
    // Users collection rules  
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Copy this to your Firebase Console > Firestore > Rules and publish it.
