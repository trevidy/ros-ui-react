import { RealGamepad } from 'ros-ui-react';
import { ImageStream } from 'ros-ui-react';
import './App.css';
import './scss/style.scss';

function RealGamepadDemo() {
  return (
    <div className="App">
      <ImageStream src="http://10.0.0.206:8080/stream?topic=/image_raw" />
      <RealGamepad rosbridgeAddress="ws://10.0.0.206:9090"/>
    </div>
  );
}

export default RealGamepadDemo;
