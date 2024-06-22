/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const { messagesRepository } = require('../repositories/messages.repository');
const { conversationRepository } = require('../repositories/conversation.repository');

class SocketServer {
  static initialize(io) {
    this.customIO = io;
    this.customIO.on('connection', (socket) => {
      SocketServer.privateConnection(socket);
    });
  }

  static privateConnection(socket) {
    socket.on('join', async (data) => {
      const { conversationId, userId, name } = data;
      socket.join(data.conversationId);
      if (!await conversationRepository.userAlreadyInConversation(
        '6673081e75466ed745719829', // conversationId,
        '66487f32c9304deb9ce9451b', // userId,
      )) {
        socket.broadcast.to(data.conversationId).emit(
          'user-joined',
          { userId, name },
        );
      }
      // updating user's last seen in conversation.32
      await conversationRepository.updateUserLastSeenInConversation(
        '6673081e75466ed745719829', // conversationId,
        '66487f32c9304deb9ce9451b', // userId,
      );
      SocketServer.chatSection(socket, conversationId);

      socket.on('disconnect', () => {
        console.log('user left');
        socket.broadcast.to(data.conversationId).emit('user-left', { message: 'username left' });
      });
    });
  }

  static acknowledgement(callback) {
    if (typeof callback === 'function') {
      callback({ status: 'Message received successfully' });
    } else {
      console.log('callback not a function');
    }
  }

  static chatSection(socket, conversationId) {
    socket.on('sendMessage', async (message, callback) => {
      const newMessage = await messagesRepository.createMessage(message);
      this.customIO.to(conversationId).emit('newMessage', { ...newMessage._doc });
      SocketServer.acknowledgement(callback);
    });

    socket.on('editMessage', async (message) => {
      const edited = await messagesRepository.updateMessage(message._id, message);
      this.customIO.to(message.conversationId).emit('editResponse', edited);
    });

    socket.on('deleteMessage', async (message) => {
      await messagesRepository.deleteMessage(message._id);
      this.customIO.to(message.conversationId).emit('deleteResponse', { status: true, message: 'Deleted' });
    });

    socket.on('is_typing', (typingObj) => {
      this.customIO.to(typingObj.conversationId).emit('typing_event', { ...typingObj, status: true });
    });

    socket.on('typing_stopped', (typingObj) => {
      this.customIO.to(typingObj.conversationId).emit('typing_event_ended', { ...typingObj, status: false });
    });
  }
}

module.exports = SocketServer;
