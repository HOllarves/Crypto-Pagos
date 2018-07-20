import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
});

class MenuBar extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            BitActivo
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

MenuBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuBar);