const mongoose = require('mongoose');
const { userTypeEnums } = require('../utils/constants');

const userInConversationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  isOpened: { type: Boolean, default: false },
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversations' },
  lastReadTimestamp: { type: Date, default: new Date(0) },
});

const ConversationSchema = mongoose.Schema(
  {
    authorId: { type: String, required: true, ref: 'userType' },
    userType: { type: String, enum: Object.values(userTypeEnums) },
    campaignId: { type: String, ref: 'campaigns' },
    members: { type: Array, default: [] },
    title: { type: String },
    banner: { type: String },
    hasEnded: { type: Boolean, default: false },
    isGroupConversation: { type: Boolean, default: false },
  },
  { timestamps: true },
);

exports.UserInConversationModel = mongoose.model('usersInconversations', userInConversationSchema);
exports.ConversationModel = mongoose.model('conversations', ConversationSchema);
