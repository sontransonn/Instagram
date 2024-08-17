import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js"
import Post from "../models/post.model.js"

class authController {
    static logout = async (req, res) => {
        try {
            return res.cookie("token", "", { maxAge: 0 }).json({
                message: 'Logged out successfully.',
                success: true
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    static register = async (req, res) => {
        try {
            const { username, email, password } = req.body;

            if (!username || !email || !password) {
                return res.status(401).json({
                    message: "Something is missing, please check!",
                    success: false,
                });
            }

            const user = await User.findOne({ email });

            if (user) {
                return res.status(401).json({
                    message: "Try different email",
                    success: false,
                });
            };

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt);

            await User.create({
                username,
                email,
                password: hashedPassword
            });

            return res.status(201).json({
                message: "Account created successfully.",
                success: true,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    static login = async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(401).json({
                    message: "Something is missing, please check!",
                    success: false,
                });
            }

            let user = await User.findOne({ email });

            if (!user) {
                return res.status(401).json({
                    message: "Incorrect email or password",
                    success: false,
                });
            }

            const isCorrectPassword = await bcrypt.compare(password, user.password);

            if (!isCorrectPassword) {
                return res.status(401).json({
                    message: "Incorrect email or password",
                    success: false,
                });
            };

            const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

            const populatedPosts = await Promise.all(
                user.posts.map(async (postId) => {
                    const post = await Post.findById(postId);
                    if (post.author.equals(user._id)) {
                        return post;
                    }
                    return null;
                })
            )

            return res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000 }).json({
                message: `Welcome back ${user.username}`,
                success: true,
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    profilePicture: user.profilePicture,
                    bio: user.bio,
                    followers: user.followers,
                    following: user.following,
                    posts: populatedPosts
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }
}

export default authController