import Movie from "../models/movieModels.js";

export const createMovie = async(req, res) => {
    try {
        const newMovie = new Movie({
            title: "The Godfather",
            year: 1972,
            genre: "Crime",
            director: "Francis Ford Coppola",
            description : "The Godfather is a 1972 American epic gangster film[2] directed by Francis Ford Coppola, who co-wrote the screenplay with Mario Puzo, based on Puzo's best-selling 1969 novel of the same title.",
            image: "The godfather.jpg"
        })
        
       const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie)
        console.log("Movie Saved Successfully!");
    } catch (error) {
        res.status(500).json({ message: "Error Saving Movie", error: error.message });
        console.log("Error Saving Movie" , error);
    }
}