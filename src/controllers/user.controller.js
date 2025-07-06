import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import uploadFileOnCloudinary from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
const registeruser = asyncHandler(async (req, res) => {
  const { fullName, userName, email, password } = req.body;
  if (
    [fullName, userName, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Fields are required");
  }
  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with this email or Username already exits");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path ?? null;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar image is required");
  }
  const avatar = await uploadFileOnCloudinary(avatarLocalPath);
  const coverImage = await uploadFileOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar image is required");
  }

  const newUser = await User.create({
    userName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    fullName,
    email,
    password,
  });
  const createduser = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );
  if (!createduser) {
    throw ApiError(500, "Something went wrong");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, createduser, "User is created Successfully..."));
  // Registration logic here
});

export { registeruser };
