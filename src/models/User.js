const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  alias: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, index: true},
  age: { type: Number },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  deletedAt: { type: Date }
});

module.exports = mongoose.model('User', userSchema);
