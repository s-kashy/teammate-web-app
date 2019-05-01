import React, { Component } from "react"
import "../../../node_modules/rc-slider/assets/index.css"
import Slider, { createSliderWithTooltip } from 'rc-slider';
import "./SliderRc.css"
const SliderWithTooltip = createSliderWithTooltip(Slider);
class SliderRc extends Component {
    state = {
        value: this.props.value
    }
    percentFormatter = (v) => {
        return `${v}km `;
    }
    onSliderChange = (value) => {
           this.setState({
            value,
        }, () => {
          
        });

    };
    onAfterChange = (value) => {
      this.props.change(value)
    };
    render() {
        return (
            <div>
                <SliderWithTooltip
                    min={1}
                    max={100}
                    value={this.state.value}
                    defaultValue={10}
                    tipFormatter={this.percentFormatter}
                    // tipProps={{ overlayClassName: 'foo' }}
                    onAfterChange={this.onAfterChange}
                    onChange={this.onSliderChange}

                />

            </div>
        )
    }
}
export default SliderRc


