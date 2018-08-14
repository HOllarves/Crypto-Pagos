// React
import React from 'react'
import PropTypes from 'prop-types'

//Internal Components
import CurrencyInput from './CurrencyInput'

// 3rd Party Libs
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import CryptoPrice from 'crypto-price'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        flex: 1
    },
    menu: {
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
    label: {
        fontSize: 20
    },
    inputText: {
        fontSize: 25
    }
})

const currencies = [
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'LTC',
        label: 'Ł'
    }

]


class PaymentForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            price: 0,
            currency: "BTC",
            finalPrice: 0
        }
    }

    sendPaymentRequest(ev) {
        ev.preventDefault()
        axios.post(process.env.REACT_APP_API_URL, { price: this.state.finalPrice.toFixed(8), currency: this.state.currency })
            .then(response => {
                console.log(response)
                if (response && response.status === 200) {
                    window.open(response.data, '_blank')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    onChange = name => event => {
        let value = event.target.value
        this.setState({
            [name]: value,
        }, () => {
            if (value && typeof value === "string" && this.state.price) {
                CryptoPrice.getCryptoPrice("EUR", this.state.currency)
                    .then(response => {
                        let basePrice = response.price
                        let finalPrice = this.state.price / basePrice
                        this.props.invoiceUpdate(finalPrice, basePrice, this.state.currency)
                        this.setState({ finalPrice: finalPrice })
                    })
            }
        })

    }

    onBlur(event) {
        let value = parseFloat(event.target.value)
        if (value && typeof value === "number") {
            CryptoPrice.getCryptoPrice("EUR", this.state.currency)
                .then(response => {
                    let basePrice = response.price
                    let finalPrice = this.state.price / basePrice
                    this.props.invoiceUpdate(finalPrice, basePrice, this.state.currency)
                })
        }

    }

    render() {
        const { classes } = this.props
        return (
            <form className={classes.container} onSubmit={this.sendPaymentRequest.bind(this)} noValidate autoComplete="off">
                <Grid item sm={12}>
                    <TextField
                        fullWidth
                        id="price"
                        InputProps={{
                            classes: {
                                input: classes.inputText
                            },
                            inputComponent: CurrencyInput,
                        }}
                        InputLabelProps={{
                            classes: {
                                root: classes.label
                            }
                        }}
                        label="Monto:"
                        className={classes.textField}
                        value={this.state.price}
                        onChange={this.onChange('price')}
                        margin="normal"
                        onBlur={this.onBlur.bind(this)}
                    />
                </Grid>
                <Grid item sm={12}>
                    <TextField
                        fullWidth
                        id="select-currency"
                        select
                        label="Crypto:"
                        className={classes.textField}
                        value={this.state.currency}
                        onChange={this.onChange('currency')}
                        onBlur={this.onBlur.bind(this)}
                        InputProps={{
                            classes: {
                                input: classes.inputText
                            }
                        }}
                        InputLabelProps={{
                            classes: {
                                root: classes.label
                            }
                        }}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu
                            }
                        }}
                        helperText="Seleccione cryptomoneda"
                        margin="normal">
                        {currencies.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label} - {option.value}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item sm={12}>
                    <Button size="large" type="submit" color="primary" className={classes.button}>
                        Pagar
                </Button>
                </Grid>
            </form>
        )
    }
}

PaymentForm.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PaymentForm)
