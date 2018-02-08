import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import findIndex from '../../utils/findIndex';
import InputRange from '../InputRange';

// Style
import Container from './Container';
import Scale from './Scale';
import Label from './Label';
import Handle from './Handle';

/**
 * @component
 */
class Slider extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      index: 0
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeEnd = this.onChangeEnd.bind(this);
    this.onScaleClick = this.onScaleClick.bind(this);
    this._renderOption = this._renderOption.bind(this);
  }

  componentWillMount() {
    const { options, value } = this.props;

    if (!options.length) {
      throw new Error('options is empty');
    }

    const index = findIndex(options, o => o.value === value);

    this.setState({ index });
  }

  onChange(event) {
    this.setState({ index: event.target.value });

    const index = Math.round(event.target.value);
    const { value } = this.props.options[index];

    if (value !== this.props.value) {
      this.props.onChange(value);
    }
  }

  onChangeEnd() {
    const index = Math.round(this.state.index);
    this.setState({ index });
  }

  onScaleClick(index) {
    this.setState({ index });
    const { value } = this.props.options[index];
    this.props.onChange(value);
  }

  _renderOption(option, index) {
    const { ticks } = this.props;
    const isVisible = !ticks || !!(index % ticks);

    return (
      <Label key={option.value} role="button" onClick={this.onScaleClick.bind(null, index)}>
        {isVisible && <span>{option.label}</span>}
      </Label>
    );
  }

  render() {
    const { options, tooltip, scale } = this.props;
    const { index } = this.state;
    const position = index && (index / (options.length - 1)) * 100;
    const roundIndex = Math.round(index);
    const label = options[roundIndex] && options[roundIndex].label;

    return (
      <Container tooltip={tooltip}>
        {
          scale &&
            <Scale>{options.map(this._renderOption)}</Scale>
        }
        <InputRange
          value={this.state.index}
          onChange={this.onChange}
          onClick={this.onChangeEnd}
          onMouseLeave={this.onChangeEnd}
          onTouchEnd={this.onChangeEnd}
          max={options.length - 1}
          step={0.01}
        />
        {tooltip && <Handle position={position}>{label}</Handle>}
      </Container>
    );
  }
}

Slider.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.node.isRequired,
    label: PropTypes.node
  })).isRequired,
  value: PropTypes.node,
  onChange: PropTypes.func.isRequired,
  scale: PropTypes.bool,
  tooltip: PropTypes.bool,
  ticks: PropTypes.number
};

Slider.defaultProps = {
  value: PropTypes.null,
  tooltip: true,
  scale: true,
  ticks: null
};

export default Slider;
