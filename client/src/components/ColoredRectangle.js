import React from "react";
import { Rect} from "react-konva";
import Konva from "konva";

export default class ColoredRectangle extends React.Component {

    state = {
      color: Konva.Util.getRandomColor()
    };

    render() {
      return (
        <Rect
            x={this.props.x}
            y={this.props.y}
            width={this.props.width}
            height={this.props.height}
            fill={this.state.color}
            shadowBlur={5}
            draggable={true}
            onMouseOver={()=>{document.body.style.cursor = 'pointer'}}
            onMouseOut={()=>{document.body.style.cursor = 'default'}}
        />
      );
    }
  }