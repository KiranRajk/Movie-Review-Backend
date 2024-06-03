import bcrypt from 'bcrypt';
import User  from '../models/userModel.js'
import { generateToken } from '../utils/generateToken.js';
import Movie from '../models/movieModels.js';
import { json } from 'express';
import Review from '../models/reviewModel.js';

export const signUp = async (req, res) => {
    try {
        console.log(req.body);
        const {name, email, password} = req.body;
        const userExist = await User.findOne({email});
        if(userExist) {
            return res.status(400).json({message: 'User already exist!'})
        }

        const salt = 10;
        const hashPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            hashPassword
        })
        const newUserCreated = await user.save();

        if(!newUserCreated) {
            return res.send("User not Created")
        }
        // const token = generateToken(email)
        // res.cookie("token", token)
        res.status(201).send('User Created')

    } catch (error) {
        console.log(error, "User creation error");
        res.status(500).send("Server error")
    }
}

export const signIn = async (req, res) =>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user) {
            return res.send("User not found");
        }
        
        const ispasswordMatch = await bcrypt.compare(password, user.hashPassword)

        if(!ispasswordMatch) {
            return res.send("Password not match")
        }
        const token  = generateToken(user._id);
        res.cookie("token", token);
       res.status(200).json({message : "Logged In", token})
    } catch (error) {
        console.log(error, "User login error");
        res.status(500).send("Server error")
    }
}

export const MovieData = async (req, res) => {
    try {
        const response = await Movie.find();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json("Server error")
    }
}

//Fetch Moviedata alomg with rating and reviews
const calculateRating = (reviews) => {
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
      return totalRating / reviews.length;
    } else {
      return 0;
    }
  };

export const MovieDataById = async (req, res) =>{
    try {
        console.log('hitted');
        const movieId = req.params.id;
        console.log(`Fetching movie with id : ${movieId}`);
        const movie = await Movie.findById(movieId).populate('reviews');
       
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        const rating = calculateRating(movie.reviews);

        const movieData = {
            _id: movie._id,
            title: movie.title,
            director: movie.director,
            year: movie.year,
            description: movie.description,
            genre: movie.genre,
            image: movie.image,
            reviews: movie.reviews,
            rating: rating,
          };

        res.status(200).json(movieData)
    } catch (error) {
        res.status(500).json("Server Error. Movie data cant b get at this moment")
    }
}


export const addReview = async(req, res) => {
    try {
        const {movieId, rating, comment} = req.body;
        const userId = req.user._id;

        const movie = await Movie.findById(movieId);

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
          }

          const newReview = new Review({
            user: userId,
            movie : movieId,
            rating : rating,
            comment : comment
          })

          const savedReview = await newReview.save();

          movie.reviews.push(savedReview._id);
          await movie.save();

          res.status(200).json(savedReview)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server Error. Unable to add review at this moment" });
    }
}