const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors'); 
require('dotenv').config();

const app = express();
const port = 8000;
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });


// Define the MongoDB model
const MusicModel = mongoose.model('Music', {
    Title: String,
    Cover: String,
    Artist: String,
    Mood: String,
    Poet: String,
    DateUploaded: Date,
    Plays: Number,
    Category: String,
    Lyrics: String,
    Link: String,
  });

  app.get('/music/search', async (req, res) => {
    const searchTerm = req.query.term;
  
    try {
      // Use regex for case-insensitive search on relevant fields
      const results = await MusicModel.find({
        $or: [
          { Title: { $regex: searchTerm, $options: 'i' } },
          { Artist: { $regex: searchTerm, $options: 'i' } },
          { Mood: { $regex: searchTerm, $options: 'i' } },
          { Poet: { $regex: searchTerm, $options: 'i' } },
          { Lyrics: { $regex: searchTerm, $options: 'i' } },
          { Category: { $regex: searchTerm, $options: 'i' } },
        ],
      });
  
      res.json(results);
    } catch (error) {
      console.error('Error searching music:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/music/recently-added', async (req, res) => {
    try {
      const recentlyAddedMusic = await MusicModel.find()
        .sort({ DateUploaded: -1 }) // Sort by DateUploaded in descending order
        .limit(5); // Limit the result to the top 5 entries
  
      res.json(recentlyAddedMusic);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
    app.get('/music/most-played', async (req, res) => {
    try {
      const mostPlayedMusic = await MusicModel.find()
        .sort({ Plays: -1 }) // Sort by Plays in descending order
        .limit(5); // Limit the result to the top 5 entries
  
      res.json(mostPlayedMusic);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
    });
    app.get('/music/artist/:artist', async (req, res) => {
        try {
          const artist = req.params.artist;
          const musicByArtist = await MusicModel.find({ Artist: artist });
      
          res.json(musicByArtist);
        } catch (error) {
          console.error('Error:', error.message);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });
        app.get('/music/poet/:poet', async (req, res) => {
            try {
            const poet = req.params.poet;
            const musicByPoet = await MusicModel.find({ Poet: poet });
        
            res.json(musicByPoet);
            } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
            }
        });

  app.put('/music/update-plays/:id', async (req, res) => {
    try {
      const musicId = req.params.id;
  
      // Fetch the music entry by ID from the database
      const music = await MusicModel.findById(musicId);
  
      // Update the Plays field
      music.Plays += 1;
        // c
        console.log(music.Plays);
      // Save the updated entry back to the database
      await music.save();
  
      res.json({ success: true });
    } catch (error) {
      console.error('Error updating plays:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

   // Route to get music by category
   app.get('/music/category/:category', async (req, res) => {
    try {
      const category = req.params.category;
      const musicByCategory = await MusicModel.find({ Category: category });
  
      res.json(musicByCategory);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
 // Route to get music by id
 app.get('/music/id/:id', async (req, res) => {
    try {
      const _id = req.params.id;
      const musicById = await MusicModel.findById({ _id });
  
      if (!musicById) {
        return res.status(404).json({ error: 'Music not found' });
      }
  
      res.setHeader('Content-Type', 'application/json');
      res.json(musicById);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  
  // Route to get music by mood
  app.get('/music/mood/:mood', async (req, res) => {
    try {
      const mood = req.params.mood;
      const musicByMood = await MusicModel.find({ Mood: mood });
  
      res.json(musicByMood);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/music', async (req, res) => {
    try {
      const allMusicData = await MusicModel.find();
      res.status(200).json(allMusicData);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.listen(port, () => {
    console.log(` My Server is running on port ${port}`);
  });

