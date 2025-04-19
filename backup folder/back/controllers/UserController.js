const User = require('../models/User');
const UserLogin = require('../models/UserLogin');
const crypto = require('crypto');


exports.createUser = async (req, resp) => {
  try {
    const { name, username, email, role_id, status } = req.body;
    const user = new User({ name, username, email, role_id, status });
    await user.save();
    resp.status(201).json(user);
    // const userData = async (req, resp) =>{
    //   User.find().then((users) => {
    //     console.log(users);
    //     const {user_id,iec_codeid, role_id, email, password,remember_token} = req.body;
    //     const user_login = new UserLogin ({user_id,iec_codeid, role_id, email, password,remember_token})
    //     user_login.save()
    //     });
    // }
    // userData();
    // const userData = (req, res) => {
    //   // First get the user list (if needed)
    //   let users = User.find().then((users) => {
    //       //console.log("Users List:", users);
    //       // Extract data from the request body
    //       const { user_id, iec_codeid, role_id, email, password, remember_token } = req.body;
  
    //       // Create and save new UserLogin
    //       const user_login = new UserLogin({user_id, iec_codeid,role_id, email, password,remember_token,});
    
    //       users.user_login.save()
    //         .then((savedLogin) => {
    //           res.status(201).json({
    //             message: "User login saved successfully",
    //             data: savedLogin
    //           });
    //         })
    //         .catch((err) => {
    //           console.error("Error saving user_login:", err);
    //           res.status(500).json({ error: "Failed to save user login" });
    //         });
    //     })
    //     .catch((err) => {
    //       console.error("Error fetching users:", err);
    //       res.status(500).json({ error: "Failed to fetch users" });
    //     });
    // };
    
    // module.exports = userData;

const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

const userData = async (req, res) => {
  try {
    const users = await User.find();

    if (!users.length) {
      return res.status(404).json({ message: 'No users found to insert into user_logins.' });
    }

    const loginData = users.map(user => {
      return {
        user_id: user._id,
        iec_codeid: user.iec_codeid || null,
        role_id: user.role_id || null,
        email: user.email,
        password: hashPassword(user.password || 'default123'), // Use default if missing
        remember_token: user.remember_token || null
      };
    });

    const insertedLogins = await UserLogin.insertMany(loginData);

    res.status(201).json({
      message: 'User logins created successfully from users collection.',
      data: insertedLogins
    });

  } catch (error) {
    console.error("Error during user login creation:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = userData;

    
  } catch (err) {
    resp.status(400).json({ error: err.message });
  }
};

exports.getUsers = async (req, resp) => {
  try {
    const users = await User.find().populate('role_id', 'role_name');
    resp.json(users);
  } catch (err) {
    resp.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, resp) => {
  try {
    const user = await User.findById(req.params.id).populate('role_id');
    if (!user) return resp.status(404).json({ error: 'User not found' });
    resp.json(user);
  } catch (err) {
    resp.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, resp) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return resp.status(404).json({ error: 'User not found' });
    resp.json(updated);
  } catch (err) {
    resp.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, resp) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return resp.status(404).json({ error: 'User not found' });
    resp.json({ message: 'User deleted' });
  } catch (err) {
    resp.status(500).json({ error: err.message });
  }
};
