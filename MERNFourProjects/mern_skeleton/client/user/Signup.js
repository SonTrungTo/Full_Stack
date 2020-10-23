import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Icon from "@material-ui/core/Icon";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { create } from "./api-user";

const useStyles = makeStyles( theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5)
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px \
        ${theme.spacing(2)}px`,
        color: theme.palette.openTitle,
        textAlign: 'center'
    },
    media: {
        minHeight: 400
    },
    textField: {
        textAlign: 'center'
    },
    submit: {
        margin: 'auto'
    },
    error: {
        marginRight: '10px'
    }
}));

export default function Signup() {
    const classes = useStyles();
    const initialState = {
        name: '',
        email: '',
        password: '',
        retypePassword: '',
        open: false,
        error: ''
    };
    const [values, setValues] = useState(initialState);

    const handleChange = label => event => {
        setValues({...values, [label]: event.target.value});
    };

    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined,
            retypePassword: values.retypePassword || undefined
        };

        create(user).then( data => {
            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                setValues({...values, error: '', open: true});
            }
        });
    }

    return (
    <div>
        <Card className={ classes.card }>
            <CardContent>
                <Typography variant="h6" className={ classes.title }>
                    Sign Up
                </Typography>
                <div className={ classes.textField } >
                    <TextField id="name" label="Name"
                    value={ values.name }
                    onChange={ handleChange("name") } margin="normal" />
                    <br />
                    <TextField id="email" label="Email" type="email"
                    value={ values.email }
                    onChange={ handleChange("email") } margin="normal" />
                    <br />
                    <TextField id="password" label="Password" type="password"
                    value={ values.password }
                    onChange={ handleChange("password") } margin="normal" />
                    <br />
                    <TextField id="retypePassword" label="Confirm password" type="password"
                    value={ values.retypePassword }
                    onChange={ handleChange("retypePassword") } margin="normal" />
                    <br />
                </div>
                {
                    values.error && 
                    (<Typography component="p" color="error">
                        <Icon color="error" className={ classes.error }>
                            error
                        </Icon>
                        {values.error}
                    </Typography>)
                }
            </CardContent>
            <CardActions>
                <Button color="primary" variant="contained"
                onClick={ clickSubmit }
                className={ classes.submit }>
                    Submit
                </Button>
            </CardActions>
        </Card>
        <Dialog open={values.open} disableBackdropClick={true}>
            <DialogTitle>
                New Account
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    New account successfully created!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Link to="/signin">
                    <Button color="primary" variant="contained">
                        Sign In
                    </Button>
                </Link>
            </DialogActions>
        </Dialog>
    </div>
    );
}