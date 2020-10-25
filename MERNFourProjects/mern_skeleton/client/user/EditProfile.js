import React, { useState, useEffect } from "react";
import { read, update } from "./api-user";
import { Redirect } from "react-router-dom";
import auth from "../auth/auth-helper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5)
    },
    title: {
        color: theme.palette.primary,
        textAlign: 'center',
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px \
        ${theme.spacing(2)}px`
    },
    textField: {
        textAlign: 'center'
    },
    error: {
        marginRight: '10px'
    },
    submit: {
        margin: 'auto'
    }
}));

export default function EditProfile(props) {
    const classes = useStyles();

    const [user, setUser] = useState({});
    const [redirectToProfile, setRedirectToProfile] = useState(false);
    const [redirectToSignin, setRedirectToSignin] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const { token } = auth.isAuthenticated();

        read({
            userId: props.match.params.userId
        }, {t: token}, signal).then(data => {
            if (data.error) {
                setRedirectToSignin(true);
            } else {
                setUser(data);
            }
        });

        return function cleanUp() {
            abortController.abort();
        }
    }, [props.match.params.userId]);

    if (redirectToSignin) {
        return (<Redirect to="/signin" />);
    }

    const handleChange = name => event => {
        setUser({...user, [name]: event.target.value});
    };

    const clickSubmit = () => {
        const { token } = auth.isAuthenticated();
        const updatedUser = {
            name: user.name || undefined,
            email: user.email || undefined,
            password: user.password || undefined,
            retypePassword: user.retypePassword || undefined
        };

        update({
            userId: props.match.params.userId
        }, {t: token}, updatedUser).then(data => {
            if (data.error) {
                setUser({...user, error: data.error});
            } else {
                setUser({...user});
                setRedirectToProfile(true);
            }
        });
    };

    if (redirectToProfile) {
        return (<Redirect to={"/user/" + user._id} />);
    }

    return (
        <div>
            <Card className={ classes.card }>
                <CardContent>
                    <Typography variant="h6" className={ classes.title }>
                        Edit Profile
                    </Typography>
                    <div className={ classes.textField } >
                        <TextField id="name" label="Name"
                        value={ user.name }
                        onChange={ handleChange("name") } margin="normal" />
                        <br />
                        <TextField id="email" label="Email" type="email"
                        value={ user.email }
                        onChange={ handleChange("email") } margin="normal" />
                        <br />
                        <TextField id="password" label="Password" type="password"
                        value={ user.password }
                        onChange={ handleChange("password") } margin="normal" />
                        <br />
                        <TextField id="retypePassword" label="Confirm password" type="password"
                        value={ user.retypePassword }
                        onChange={ handleChange("retypePassword") } margin="normal" />
                        <br />
                    </div>
                    {
                        user.error && 
                        (<Typography component="p" color="error">
                            <Icon color="error" className={ classes.error }>
                                error
                            </Icon>
                            {user.error}
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
        </div>
    );
};