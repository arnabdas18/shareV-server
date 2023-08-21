const videoModel = require("../models/video.model");

exports.getVideos = async (req, res) => {
  try {
    const { search } = req.query;

    let filter = {};

    if (search) {
      filter = { name: { $regex: search, $options: "i" } };
    }

    const videos = await videoModel.find({});

    res.status(200).json({
      message: "Success",
      data: {
        videos,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Fail to load",
      data: {
        error,
      },
    });
  }
};

// exports.getVideosByName = async (req, res) => {
//   try {
//     const search = req.query.search;
//     const videos = await videoModel.find({
//       title: { $regex: search, $options: "i" },
//     });

//     res.status(200).json({
//       message: "Success",
//       data: {
//         videos,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Fail to load",
//       data: {
//         error,
//       },
//     });
//   }
// };

exports.getVideoById = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await videoModel.findById(videoId);

    res.status(200).json({
      message: "Success",
      data: {
        video,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Fail to load",
      data: {
        error,
      },
    });
  }
};
