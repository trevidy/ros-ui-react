import { SimGamepad } from 'ros-ui-react';
import { ImageStream } from 'ros-ui-react';
import './App.css';
import './scss/style.scss';

function SimGamepadDemo() {
  return (
    <div className="App">
      <ImageStream src="http://10.0.0.206:8080/stream?topic=/image_raw" />
      <SimGamepad rosbridgeAddress="ws://10.0.0.206:9090"/>
    </div>
  );
}

export default SimGamepadDemo;
