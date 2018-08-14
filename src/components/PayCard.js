
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
    card: {
        minWidth: 500,
    },
    title: {
        marginBottom: 16,
        fontSize: 35
    },
    pos: {
        marginBottom: 0,
        fontSize: 14
    },
    amount: {
        fontSize: 20
    },
    infoContainer: {
        marginTop: 12
    },
    footer: {
        marginTop: 5
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


class PayCard extends React.Component {

    constructor(props) {
        super(props)
        let selectedCurrency = currencies.filter(val => { return val.value === props.currency })[0]
        this.state = {
            toPay: props.payment,
            rate: props.rate,
            currency: selectedCurrency ? selectedCurrency.label : ""
        }
    }

    componentWillReceiveProps(props) {
        let selectedCurrency = currencies.filter(val => { return val.value === props.currency })[0]
        this.setState({ toPay: props.payment, rate: props.rate, currency: selectedCurrency ? selectedCurrency.label : "" })
    }

    render() {
        const { classes } = this.props;
        let rate = 1 / this.state.rate
        let currentPrice = parseFloat(this.state.rate)
        return (
            <div>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} variant="headline" component="h1">
                            Monto a pagar:
                        </Typography>
                        <Typography className={classes.amount} component="p">
                            {this.state.currency + " " + this.state.toPay.toFixed(8)}
                        </Typography>
                        <div className={classes.infoContainer}>
                            <Typography className={classes.pos} component="p">
                                1€ = {this.state.currency && rate && this.state.currency + " " + rate.toFixed(8)}
                            </Typography>
                            <Typography className={classes.pos} component="p">
                                1{this.state.currency} = {currentPrice && "€ " + currentPrice.toFixed(2)}
                            </Typography>
                        </div>
                        <div className={classes.footer}>
                            <Typography className={classes.pos} component="p" color="textSecondary">
                                Precios proporcionados por <a rel="noopener noreferrer" href="https://es.cryptonator.com/api" target="_blank"> Cryptonator </a>
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}


PayCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PayCard);