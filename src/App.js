import React from 'react';
import { io } from 'socket.io-client';
import Video from './assets/video/sintel-short.mp4';

function App() {
  const videoRef = React.useRef();
  const [socket, setSocket] = React.useState(0);
  React.useEffect(() => {
    setSocket(io('https://react-sync-video.herokuapp.com/'));
  }, []);

  const onClickSync = () => {
    const currentTime = videoRef.current.currentTime;
    socket.emit('currentTime', currentTime);
  };

  if (videoRef.current) {
    socket.on('currentTime', (time) => {
      videoRef.current.pause();
      videoRef.current.currentTime = time;
      videoRef.current.play();
    });
  }

  return (
    <div className="App">
      <video ref={videoRef} src={Video} width="900" height="500" controls="controls" />
      <button onClick={onClickSync}>Синхронизировать</button>
    </div>
  );
}

export default App;
