const mongoose = require('mongoose');

const UsersInConversationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  isOpened: { type: Boolean, default: false },
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversations' },
  lastReadTimestamp: { type: Date, default: new Date(0) },
});

const ConversationSchema = mongoose.Schema(
  {
    authorId: { type: String, required: true, ref: 'users' },
    members: { type: Array, default: [] },
    title: { type: String },
    banner: { type: String },
    hasEnded: { type: Boolean, default: false },
    isGroupConversation: { type: Boolean, default: false },
  },
  { timestamps: true },
);

exports.UsersInConversationModel = mongoose.model('usersInconversations', UsersInConversationSchema);
exports.ConversationModel = mongoose.model('conversations', ConversationSchema);
