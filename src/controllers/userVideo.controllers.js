const videoModel = require("../models/video.model");
const userModel = require("../models/user.model");

exports.uploadVideo = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await userModel.findById({ _id: userId });

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const newVideo = await new videoModel({
      ...req.body,
      postedBy: userId,
    }).save();

    user.myVideos.unshift(newVideo._id);

    await user.save();

    res.status(201).json({
      message: "Upload successful",
      data: {
        newVideo,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Upload unsuccessful",
      data: {
        error,
      },
    });
  }
};

exports.getUserVideo = async (req, res) => {
  try {
    const videos = await videoModel.find({ postedBy: req.userId });

    res.status(200).json({
      message: "Success",
      data: {
        videos,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      data: {
        error,
      },
    });
  }
};

exports.updateVideo = async (req, res) => {
  try {
    const userId = req.userId;
    const { videoId } = req.params;

    const found = await videoModel.findOneAndUpdate(
      { postedBy: userId, _id: videoId },
      req.body
    );

    if (!found) {
      return res.status(401).json({
        message: "Video not found",
      });
    }

    res.status(200).json({
      message: "Video updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error (update)",
      data: {
        error,
      },
    });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const userId = req.userId;
    const { videoId } = req.params;

    const deleted = await videoModel.findOneAndDelete({
      postedBy: userId,
      _id: videoId,
    });

    if (!deleted) {
      return res.status(401).json({
        message: "Unable to delete video",
      });
    }

    res.status(200).json({
      message: "Video deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error (update)",
      data: {
        error,
      },
    });
  }
};
