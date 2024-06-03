import Movie from "../models/movieModels.js";
import Review from "../models/reviewModel.js";
import User from "../models/userModel.js";

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


export const getDashboard = async(req, res) => {
    try {
        //to get totalUsers
        const totalUsers = await User.countDocuments();

        //to get recentUsers
        const recentUsers = await User.find().sort({ createdAt : -1}).limit(3);

        const totalReviews = await Review.countDocuments();

        // Fetch users with their reviews and ratings
        const usersWithReviews = await User.aggregate([
            {
                $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'reviews'
                }
            }
        ]);
        res.status(200).json({
            totalUsers,
            recentUsers,
            totalReviews,
            usersWithReviews
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const deleteUser = async(req, res) =>{
    try {
        const userId = req.params.id;
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: "User Deleted Successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}