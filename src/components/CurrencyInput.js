// React
import React from 'react'
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';



class CurrencyInput extends React.Component {
    render() {
        const { inputRef, onChange, ...other } = this.props;
        return (
            <NumberFormat
                {...other}
                ref={inputRef}
                onValueChange={values => {
                    onChange({
                        target: {
                            value: values.value,
                        },
                    });
                }}
                thousandSeparator
                prefix="€"
            />
        );
    }
}


CurrencyInput.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default CurrencyInput