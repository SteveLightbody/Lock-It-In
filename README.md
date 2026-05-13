# Lock-In Tracker

This is the iPhone-polished split-file version.

## Files

- `index.html` — page structure and mobile web-app metadata
- `styles.css` — iPhone-friendly responsive styling
- `app.js` — app behavior and storage logic
- `manifest.webmanifest` — web-app manifest
- `icon.svg` — home-screen icon

## Local testing

Open `index.html` in Safari or Chrome on your computer.

## Data persistence

The app stores meals, workouts, chores, routines, notes, and spiritual tracking in browser `localStorage`.

That means:
- It persists after closing and reopening the same browser on the same device.
- Safari and Chrome do not share this storage.
- Data will not automatically sync across devices.
- Use Settings & Data → Export Data periodically as a backup.

## iPhone home screen

To use this like an app on your iPhone, host this folder online, then open the hosted URL in Safari and use Share → Add to Home Screen.


## Latest chore adjustment

Removed “Take out trash” from weekly chores because it is a shared, recurring roommate task rather than a once-weekly personal chore.
