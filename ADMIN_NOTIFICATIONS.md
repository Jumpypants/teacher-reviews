# Admin Notification Badge Feature

## Overview
The admin dashboard button now displays a notification badge when there are pending items that require admin review.

## Features

### 🔔 **Real-time Notifications**
- Shows total count of pending teachers and reviews
- Updates automatically when new items are submitted
- Only visible to admin users

### 🎨 **Visual Design**
- Red circular badge with white text
- Positioned at top-right of admin button
- Animated pulse effect to draw attention
- Handles large numbers (shows "99+" for 100+)

### 📱 **Responsive**
- Scales appropriately on mobile devices
- Maintains visibility across screen sizes

### 💡 **Tooltip Information**
- Hover to see breakdown of pending items
- Shows: "X pending teachers, Y pending reviews"
- Falls back to "Admin Dashboard" when no pending items

## Implementation Details

### Components Added:
- **`usePendingCounts.js`** - Hook to fetch real-time pending counts
- **CSS animations** - Subtle pulse effect for attention

### How It Works:
1. **Real-time Data**: Listens to Firestore for pending teachers and reviews
2. **Count Calculation**: Combines both counts for total badge number
3. **Visual Indicator**: Shows red badge only when count > 0
4. **User Experience**: Provides immediate feedback about pending work

### Badge Behavior:
- **No pending items**: No badge shown
- **1-99 pending**: Shows exact number
- **100+ pending**: Shows "99+"
- **Hover**: Displays detailed breakdown

### Performance:
- Only fetches data for admin users
- Uses Firestore real-time listeners
- Minimal bundle size impact
- Efficient re-rendering

## Visual States

| Pending Count | Badge Display | Tooltip |
|--------------|---------------|---------|
| 0 | No badge | "Admin Dashboard" |
| 5 | "5" | "3 pending teachers, 2 pending reviews" |
| 150 | "99+" | "75 pending teachers, 75 pending reviews" |

## Accessibility
- Native tooltip using `title` attribute
- High contrast badge colors
- Clear visual hierarchy
- Screen reader friendly

This feature ensures admins are immediately aware when there's content waiting for moderation, improving the overall user experience and content quality of SchoolScope.
