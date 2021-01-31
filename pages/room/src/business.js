class Business {

  constructor({ room, media, view, socketBuilder }) {
    console.log('ahahahaha');
    console.log(socketBuilder);
    this.room = room;
    this.media = media;
    this.view = view;
    this.socketBuilder= socketBuilder
                          .setOnUserConnected(this.onUserConnected())
                          .setOnUserDisconnected(this.onUserDisconnected())
                          .build()

    this.socketBuilder.emit('join-room', this.room, 'teste1')
    this.currentStream = {}
  }

  static initialize(deps) {
    const instance = new Business(deps);

    return instance._init();
  }

  async _init() {
    this.currentStream = await this.media.getCamera();
    this.addVideoStream('marlon');
  }

  addVideoStream(userId, stream = this.currentStream) {
    const isCurrentId = false;
    this.view.renderVideo({
      userId,
      stream,
      isCurrentId
    });
  }

  onUserConnected = function(){
    return userId => {
      console.log('user connected here', userId);
    }
  }
  onUserDisconnected = function(){
    return userId => {
      console.log('user DISconnected here', userId);
    }
  }
}