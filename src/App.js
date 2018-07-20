// React
import React, { Component } from 'react';

// Internal Components
import MenuBar from './components/MenuBar'
import PaymentForm from './components/PaymentForm'
import PayCard from './components/PayCard'

// 3rd Party Libs
import Grid from '@material-ui/core/Grid'

// Assets
import './App.css'



class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      toPay: 0,
      currencySelected: "",
      rate: 0
    }
  }

  amountToPay(payment, rate, currency) {
    this.setState({
      toPay: payment,
      currencySelected: currency,
      rate: rate
    })
  }

  render() {
    return (
      <div className="App">
        <MenuBar />
        <Grid container
          className="App-payment-form"
          justify="center"
          alignItems="center"
          direction="column"
          spacing={16}>
          <Grid
            item
            lg={4}
            md={6}
            sm={8}>
            <PaymentForm invoiceUpdate={this.amountToPay.bind(this)} />
          </Grid>
          {this.state.toPay !== 0 && this.state.currencySelected &&
            <Grid
              item xs={8}>
              <PayCard payment={this.state.toPay} rate={this.state.rate} currency={this.state.currencySelected} />
            </Grid>}
        </Grid>
      </div>
    );
  }
}

export default App;
