# Styles Directory

This directory contains the modular CSS files for the Teacher Reviews application.

## File Organization

- **`index.css`** - Main styles file that imports all modules
- **`base.css`** - Global styles, buttons, form inputs, and responsive base styles
- **`auth.css`** - Authentication page styles
- **`header.css`** - Header component styles
- **`add-teacher.css`** - Add teacher page and form styles
- **`teacher-avatar.css`** - Teacher avatar component styles
- **`teachers-grid.css`** - Teachers grid and teacher card styles
- **`teacher-page.css`** - Individual teacher page styles
- **`modal.css`** - Modal component styles
- **`write-review.css`** - Review writing form and related styles
- **`reviews.css`** - Reviews display, review cards, and review-related styles
- **`admin.css`** - Admin dashboard and moderation styles

## Usage

The main `index.css` file is imported in `App.js` and automatically includes all the modular styles using CSS `@import` statements.

## Benefits of This Structure

1. **Maintainability** - Easier to find and modify styles for specific components
2. **Modularity** - Each CSS file corresponds to specific functionality
3. **Collaboration** - Multiple developers can work on different style modules
4. **Organization** - Logical grouping of related styles
5. **Performance** - CSS bundling still works efficiently with build tools
