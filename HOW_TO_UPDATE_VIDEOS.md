# How to Update Video Modules

This guide explains how to add new YouTube video links to the Recorded Classes section of the application.

## 1. Understand the Data File
All video module data is stored in `src/data/videoModulesData.js`.
Inside this file, there is a `VIDEO_MODULES` object. Each key (1, 2, 3...) corresponds to a specific module.

```javascript
// Example of a module structure
1: {
  id: 1,
  thumbnail: '/images/modules/mod1.jpg',
  title: 'Introduction to Electronics',
  description: 'Basic electronics concepts and foundations.',
  isLocked: false,
  sessions: [
    { id: 'v1_1', title: 'Part 1: Basic Electronics', youtubeId: '4HlUht7dzNk', duration: 'Unknown' }
  ]
}
```

## 2. Fetch YouTube Metadata
Instead of typing out video titles manually, you can use the provided script to automatically fetch the real titles directly from YouTube using just the Video ID (the part of the URL after `youtu.be/` or `?v=`).

1. Open `scratch/fetch_yt_meta.cjs`.
2. Update the `videoIds` array with the IDs of the videos you want to add:
   ```javascript
   const videoIds = [
     'S5DSd7TVolQ', // Example ID
     'zPcxwRXBSiE'
   ];
   ```
3. Run the script in your terminal:
   ```bash
   node scratch/fetch_yt_meta.cjs
   ```
4. The script will output the fetched metadata (including titles) into `scratch/yt_meta.json`.

## 3. Update the Application
1. Open `scratch/yt_meta.json` and look at the titles.
2. Open `src/data/videoModulesData.js` and locate the correct module you are adding videos to.
3. If the module is currently locked (`isLocked: true`), change it to `isLocked: false` so users can click on it.
4. Add the new videos to the `sessions` array of that module, following the ID numbering sequence (e.g. if the last video was `v9_12`, the next is `v9_13`).

```javascript
// Example of adding a new session
{ id: 'v9_13', title: 'STA Class -13', youtubeId: 'NEW_ID_HERE', duration: 'Unknown' }
```

## 4. Save and Test
Save the `videoModulesData.js` file and refresh your browser at `http://localhost:5174/test-videos`. The new videos will instantly appear in the module's playlist!
