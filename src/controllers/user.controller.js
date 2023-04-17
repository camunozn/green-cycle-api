const UserServices = require('../services/user.services');
const fs = require('fs/promises');


exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await UserServices.getAll();
    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await UserServices.getUser(userId);
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

exports.updateUser = async (req, res, next) => {
    const { id } = req.params;
    const {
      firstname,
      lastname,
      address,
      phone,
      role_id,
    } = req.body || {}
    let { photo } = req.files || {};

    try {
    const image = await UserServices.uploadImage(photo.tempFilePath)

    const { secure_url: url, public_id: idImg } = image;
    // photo = `${url}|${idImg}`;
    photo = url;
    const photo_id = idImg;

    await fs.rmdir('./tmp', { recursive: true })

    //FIX extract only fields that can be updated from req.body
    const updatedUser = await UserServices.updateOne(id, {firstname, lastname, address, phone, role_id, photo_id, photo});
    res.status(201).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    if (photo !== undefined && typeof photo === 'string') {
    await UserServices.deleteImage(photo_id)
    }
    console.error(error);
    res.status(500).json(error)
  }
};
