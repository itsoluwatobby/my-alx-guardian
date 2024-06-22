const mongoose = require('mongoose');

const MessagesSchema = mongoose.Schema(
  {
    conversationId: { type: String, required: true, ref: 'conversations' },
    senderId: { type: String, required: true },
    recipientId: { type: String, default: '' },
    message: { type: String, default: '', trim: true },
    isDelivered: { type: Boolean, default: false },
    isEdited: { type: Boolean, default: false },
    profilePicture: { type: String, default: '' },
    images: { type: Array, default: [] },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

exports.MessagesModel = mongoose.model('messages', MessagesSchema);
