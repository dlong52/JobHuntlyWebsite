const bcrypt = require("bcrypt");
const JwtServices = require("./JwtServices");
const UserModel = require("../models/UserModel");
const admin = require("../configs/firebase/firebaseAdmin");
const dotenv = require("dotenv");
const Role = require("../models/Role");
const Company = require("../models/Company");
dotenv.config();

const signUp = async (newUser) => {
  const {
    name,
    email,
    password,
    role,
    account_type,
    gender,
    companyName,
    phoneNumber,
    province,
    district,
  } = newUser;

  try {
    const existingUser = await UserModel.findOne({ email: email });
    const roleM = await Role.findOne({ name: role });
    const hashPassword = bcrypt.hashSync(password, 10);

    if (existingUser)
      return { status: "error", message: "Tài khoản này đã tồn tại!" };
    if (!roleM) return { status: "error", message: "Vai trò không tồn tại!" };

    let newCompany = null;

    if (companyName) {
      const company = await Company.findOne({ name: companyName });
      if (company)
        return { status: "error", message: "Tên công ty này đã tồn tại!" };
      newCompany = await Company.create({
        created_by: null,
        name: companyName,
        address: {
          province: province || null,
          district: district || null,
        },
      });
    }

    // Tạo người dùng
    const createdUser = await UserModel.create({
      profile: {
        name: name,
        phone_number: phoneNumber,
      },
      company: newCompany ? newCompany._id : null,
      email,
      password: hashPassword,
      role: roleM._id,
      gender: gender || null,
      account_type,
    });

    if (newCompany) {
      await Company.findByIdAndUpdate(newCompany._id, {
        created_by: createdUser._id,
      });
    }
    return {
      status: "success",
      message: "Tạo tài khoản thành công!",
      data: createdUser,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return { status: "error", message: error.message };
  }
};

const signIn = async (user) => {
  const { email, password } = user;
  try {
    const existingUser = await UserModel.findOne({ email: email }).populate(
      "role"
    );

    if (
      !existingUser ||
      existingUser.account_type === process.env.AUTH_TYPE_GG
    ) {
      return {
        status: "error",
        message: "Tài khoản này không tồn tại!",
        data: user,
      };
    }
    if (!existingUser?.active) {
      return {
        status: "error",
        message: "Tài khoản của bạn đã bị cấm!",
        data: user,
      };
    }
    const comparePassword = bcrypt.compareSync(password, existingUser.password);
    if (!comparePassword) {
      return { status: "error", message: "Mật khẩu của bạn không đúng!" };
    }

    const access_token = await JwtServices.generateAccessToken({
      id: existingUser._id,
      role: existingUser.role.name,
    });
    const refresh_token = await JwtServices.generateRefreshToken({
      id: existingUser._id,
      role: existingUser.role.name,
    });
    return {
      status: "success",
      message: "Đăng nhập thành công!",
      data: {
        access_token,
        role: existingUser.role.name,
      },
      refresh_token,
    };
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    return { status: "error", message: error.message };
  }
};

const signInWithGoogle = async (token, role) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;
    const email = decodedToken.email;
    const name = decodedToken.name;
    let user = await UserModel.findOne({ firebaseUid: uid }).populate("role");
    const roleM = await Role.findOne({ name: role });
    if (!user) {
      user = new UserModel({
        email: email,
        role: roleM._id,
        firebaseUid: uid,
        account_type: "google",
        profile: {
          name: name,
        },
      });
      await UserModel.create({
        email: email,
        role: roleM._id,
        firebaseUid: uid,
        account_type: "google",
        profile: {
          name: name,
        },
      });
    }else {
      const checkRole = user?.role.name !== role 
      if (checkRole) {
        return { status: "error", message: "Tài khoản này đã được đăng kí với vai trò khác!" }
      }
    }

    const access_token = await JwtServices.generateAccessToken({
      id: user._id,
      role: user.role.name,
    });
    const refresh_token = await JwtServices.generateRefreshToken({
      id: user._id,
      role: user.role.name,
    });
    return {
      status: "success",
      message: "Đăng nhập với Google thành công!",
      access_token,
      refresh_token,
      data: {
        access_token,
        role: user.role.name
      },
    };
  } catch (error) {
    console.error("Lỗi đăng nhập với Google:", error);
    return { status: "error", message: error.message };
  }
};
module.exports = {
  signUp,
  signIn,
  signInWithGoogle,
};
