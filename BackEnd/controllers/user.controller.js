import User from "../models/user.model.js";

export const getUserForSideBar = async (req, res, next) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error at getUserForSideBar in user controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
