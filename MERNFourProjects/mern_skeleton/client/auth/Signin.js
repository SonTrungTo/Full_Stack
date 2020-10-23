import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Icon from "@material-ui/core/Icon";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signin } from "./api-auth";
import auth from "./auth-helper";

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
}) );

export default function Signin(props) {
    const classes = useStyles();

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        redirectToReferrer: false
    });

    const handleChange = label => event => {
        setValues({...values, [label]: event.target.value});
    }

    const clickSubmit = () => {
        const user = {
            email: values.email || undefined,
            password: values.password || undefined
        };

        signin(user).then( data => {
            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                auth.authenticate(data, () => {
                    setValues({...values, redirectToReferrer: true});
                });
            }
        } );
    }

    const { from } = props.location.state ||
        { from: {pathname: '/'} };
        const { redirectToReferrer } = values;
        if (redirectToReferrer) {
            return (<Redirect to={from} />);
        }

    return (
        <div>
            <Card className={ classes.card }>
                <CardContent>
                    <Typography className={ classes.title } variant="h6">
                        Sign In
                    </Typography>
                    <div className={ classes.textField }>
                        <TextField id="email" type="email"
                        value={values.email} label="Email"
                        onChange={handleChange("email")} margin="normal" />
                        <br />
                        <TextField id="password" type="password"
                        value={values.password} label="Password"
                        onChange={handleChange("password")} margin="normal" />
                        <br />
                    </div>
                    { values.error && 
                    (<Typography component="p" color="error">
                        <Icon className={ classes.error } color="error">
                            error
                        </Icon>
                        { values.error }
                    </Typography>) }
                </CardContent>
                <CardActions>
                    <Button className={ classes.submit }
                    onClick={clickSubmit} color="primary"
                    variant="contained">
                        Submit
                    </Button>
                </CardActions>
            </Card>
         </div>
    );
};