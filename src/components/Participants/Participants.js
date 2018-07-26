import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './Participants.css';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

function Participants(props) {
    const { classes } = props;

    return (
        <Paper className={classes.root + ' participants'}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Participants</TableCell>
                        <TableCell>City</TableCell>
                        <TableCell>Date of birth</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>CPF</TableCell>
                        <TableCell>Miles</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map(n => {
                        return (
                            <TableRow key={n.id}>
                                <TableCell component="th" scope="row">
                                    {n.name}
                                </TableCell>
                                <TableCell>{n.city}</TableCell>
                                <TableCell>{n.date}</TableCell>
                                <TableCell>{n.phone}</TableCell>
                                <TableCell>{n.cpf}</TableCell>
                                <TableCell>{n.miles}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
}

Participants.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Participants);