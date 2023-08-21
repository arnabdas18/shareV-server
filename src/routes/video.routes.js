const express = require("express");
const {
  uploadVideo,
  getUserVideo,
  updateVideo,
  deleteVideo,
} = require("../controllers/userVideo.controllers");
const auth = require("../middleware/auth");
const {
  getVideos,
  getVideosByName,
  getVideoById,
} = require("../controllers/video.controllers");

const videoRoutes = express.Router();

// @desc    uploads a single video
// @access  private
videoRoutes.post("/uservideos/upload", auth, uploadVideo);

// @desc    responses with all the videos uploaded
// @access  private
videoRoutes.get("/uservideos", auth, getUserVideo);

// @desc    edit some details of a video
// @access  private
videoRoutes.patch("/uservideos/:videoId", auth, updateVideo);

// @desc    delete a video
// @access  private
videoRoutes.delete("/uservideos/:videoId", auth, deleteVideo);

// @desc    responses with all the videos
//          present in db
// @access  public
videoRoutes.get("/videos", getVideos);

// @desc    responses with all the videos
//          with a particular part of word,
//          a word or words
// @access  public
// videoRoutes.get("/search", getVideosByName);

// @desc    responses with a particular video
// @access  public
videoRoutes.get("/videos/:videoId", getVideoById);

module.exports = videoRoutes;
