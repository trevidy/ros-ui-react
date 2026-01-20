import React, { Component } from "react";

class SimJoystick extends Component {
  state = {
    stickX: 0,
    stickY: 0,
  };

  anomationFrame = null;
  gamepadIndex = null;

  componentDidMount(){
    window.addEventListener("gamepadconnected", this.handleGamepadConnected);
    window.addEventListener("gamepaddisconnected", this.handleGamepadDisconnected);
    this.startPolling();
  }

  componentWillUnmount(){
    window.removeEventListener("gamepadconnected", this.handleGamepadConnected);
    window.removeEventListener("gamepaddisconnected", this.handleGamepadDisconnected);
    cancelAnimationFrame(this.animationFrame);
  }

  handleGamepadConnected = (e) => {
    console.log("Gamepad connected:", e.gamepad);
    this.gamepadIndex = e.gamepad.index;
  };

  handleGamepadDisconnected = (e) => {
    console.log("Gamepad disconnected:", e.gamepad);
    if (this.gamepadIndex === e.gamepad.index) this.gamepadIndex = null;
  };

  startPolling = () => {
      const poll = () => {
        if (this.gamepadIndex !== null){
          const gp = navigator.getGamepads()[this.gamepadIndex];
          if(gp){
            // Assume left stick axes: gp.axes[0] = x, gp.axes[1] = y
            let x = gp.axes[0] || 0;
            let y = gp.axes[1] || 0;

            // Deadzone threshold
            const deadzone = 0.1;
            x = Math.abs(x) < deadzone ? 0 : x;
            y = Math.abs(y) < deadzone ? 0 : y;

            // Call move if stick is not neutral
            if (x !== 0 || y !== 0 ){
              this.props.move?.(x,y);
            } else{
              this.propse.stop?.();
            }

            // Update UI
            this.setState({ stickX: x, stickY: y});
          }
        }

        this.animationFrame = requestAnimationFrame(poll);
      };
    poll();
  };

  render() {
    const { size = 100 } = this.props;
    const { stickX, stickY } = this.state;

    // Convert normalized  [-1,1] axes to pixel positions for UI
    const stickStyle = {
      position: "absolute",
      width: size/2,
      height: size/2,
      borderRadius: "50%",
      background: "blue",
      top: `${(size / 2) + stickY * (size / 2)}px`,
      left: `${(size / 2) + stickX * (size / 2)}px`,
      transform: "translate(-50%, -50%)", 
    };

    const baseStyle = {
      position: "relative",
      width: size,
      height: size,
      borderRadius: "50%",
      background: "lightgray",
    };

    return (
      <div style ={baseStyle}>
          <div style = {stickStyle}></div>
      </div>
    );
  }
}

export default SimJoystick;