const getPlayerInstance = () => {
  let playerInstance;

  return idSelector => {
    if (!playerInstance) {
      playerInstance = window.videojs(
        idSelector,
        { poster: '', controls: 'true' },
        function() {
          this.on('play', function() {
            console.log('正在播放');
          });
          //暂停--播放完毕后也会暂停
          this.on('pause', function() {
            console.log('暂停中');
          });
          // 结束
          this.on('ended', function() {
            console.log('结束');
          });
        }
      );
    }
    return playerInstance;
  };
};

export default getPlayerInstance();
