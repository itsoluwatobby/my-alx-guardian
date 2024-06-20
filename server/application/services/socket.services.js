class SocketServer {
  static initialize(io) {
    this.customIO = io;
    this.customIO.on('connection', (socket) => {
      SocketServer.privateConnection(socket);
    });
  }

  static privateConnection(socket) {
    socket.on('join', (data) => {
      console.log('CONNECTED', data);
      socket.join(data.conversationId);
      this.customIO.to(data.conversationId).emit(
        'user-joined',
        { userId: data.userId, name: data.name },
      );
      SocketServer.chatSection(socket, data.conversationId);
    });

    socket.on('disconnect', () => {
      socket.broadcast.emit('user-left', { message: 'username left' });
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
    socket.on('write_message', async (message, callback) => {
      this.customIO.to(conversationId).emit('receive_message', { ...message });
      SocketServer.acknowledgement(callback);
    });

    socket.on('edit_message', (isEdited) => {
      this.customIO.to(isEdited.conversationId).emit('isEditted', isEdited);
    });

    socket.on('is_typing', (typingObj) => {
      this.customIO.to(typingObj.conversationId).emit('typing_event', { ...typingObj, status: true });
    });

    socket.on('typing_stopped', (typingObj) => {
      this.customIO.to(typingObj.conversationId).emit('typing_event_ended', { ...typingObj, status: false });
    });

    socket.on('conversation_opened', (convoEvent) => {
      this.customIO.to(convoEvent.conversationId).emit('conversation_event', convoEvent);
    });

    socket.on('delete_message', (isDeleted) => {
      this.customIO.to(isDeleted.conversationId).emit('isDeleted', isDeleted);
    });
  }
}

module.exports = SocketServer;
