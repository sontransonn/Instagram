import cloudinary from "../configs/cloudinary.config.js";
import getDataUri from "../configs/datauri.config.js";

import User from "../models/user.model.js"
import Post from "../models/post.model.js"

class userController {
    static getProfile = async (req, res) => {
        try {
            const userId = req.params.id;

            let user = await User.findById(userId)
                .populate({ path: 'posts', createdAt: -1 })
                .populate('bookmarks');

            return res.status(200).json({
                user,
                success: true
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    static getSuggestedUsers = async (req, res) => {
        try {
            const suggestedUsers = await User.find({ _id: { $ne: req.id } })
                .select("-password");

            if (!suggestedUsers) {
                return res.status(400).json({
                    message: 'Currently do not have any users',
                })
            };

            return res.status(200).json({
                success: true,
                users: suggestedUsers
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    static editProfile = async (req, res) => {
        try {
            const userId = req.id;
            const { bio, gender } = req.body;
            const profilePicture = req.file;
            let cloudResponse;

            if (profilePicture) {
                const fileUri = getDataUri(profilePicture);
                cloudResponse = await cloudinary.uploader.upload(fileUri, { folder: 'instagram' });
            }

            const user = await User.findById(userId).select('-password');
            if (!user) {
                return res.status(404).json({
                    message: 'User not found.',
                    success: false
                });
            };

            if (bio) user.bio = bio;
            if (gender) user.gender = gender;
            if (profilePicture) user.profilePicture = cloudResponse.secure_url;

            await user.save();

            return res.status(200).json({
                message: 'Profile updated.',
                success: true,
                user
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    static followOrUnfollow = async (req, res) => {
        try {
            const followKrneWala = req.id;
            const jiskoFollowKrunga = req.params.id;

            if (followKrneWala === jiskoFollowKrunga) {
                return res.status(400).json({
                    message: 'You cannot follow/unfollow yourself',
                    success: false
                });
            }

            const user = await User.findById(followKrneWala);
            const targetUser = await User.findById(jiskoFollowKrunga);

            if (!user || !targetUser) {
                return res.status(400).json({
                    message: 'User not found',
                    success: false
                });
            }

            const isFollowing = user.following.includes(jiskoFollowKrunga);
            if (isFollowing) {
                await Promise.all([
                    User.updateOne({ _id: followKrneWala }, { $pull: { following: jiskoFollowKrunga } }),
                    User.updateOne({ _id: jiskoFollowKrunga }, { $pull: { followers: followKrneWala } }),
                ])
                return res.status(200).json({ message: 'Unfollowed successfully', success: true });
            } else {
                await Promise.all([
                    User.updateOne({ _id: followKrneWala }, { $push: { following: jiskoFollowKrunga } }),
                    User.updateOne({ _id: jiskoFollowKrunga }, { $push: { followers: followKrneWala } }),
                ])
                return res.status(200).json({ message: 'followed successfully', success: true });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }
}

export default userController