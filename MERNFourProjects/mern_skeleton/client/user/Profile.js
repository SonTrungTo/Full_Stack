import React, { useState, useEffect } from "react";
import auth from "../auth/auth-helper";
import { read } from "./api-user";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Redirect, Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Person from "@material-ui/icons/Person";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Delete from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

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
    root: {
        color: theme.palette.primary.main
    }
}) );

export default function Profile(props) {
    const classes = useStyles();
    const [user, setUser] = useState({});
    const [redirectToSignin, setRedirectToSignin] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const jwt = auth.isAuthenticated();

        read({
            userId: props.match.params.userId
        }, {t: jwt.token}, signal).then(data => {
            if (data.error) {
                setRedirectToSignin(true);
            } else {
                setUser(data);
            }
        });

        return function cleanUp() {
            abortController.abort();
        };
    }, [props.match.params.userId]);

    if (redirectToSignin) {
        return <Redirect to="/signin" />
    };

    return (
        <Paper elevation={4} className={ classes.root }>
            <Typography variant="h6" className={ classes.title }>
                Profile
            </Typography>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Person />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={ user.name }
                    secondary={ user.email } />
                    {
                        auth.isAuthenticated().user &&
        auth.isAuthenticated().user._id === user._id && (
                    <ListItemSecondaryAction>
                        <Link to={"/user/edit/" + user._id}>
                            <IconButton aria-label="Edit" color="primary">
                                <Edit />
                            </IconButton>
                        </Link>
                        <IconButton>
                            <Delete />
                        </IconButton>
                    </ListItemSecondaryAction>
        )
                    }
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText
                    primary={ "Joined: " + (
                        new Date(user.created).toDateString()
                    ) } />
                </ListItem>
            </List>
        </Paper>
    );
};