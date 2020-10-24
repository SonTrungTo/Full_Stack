import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Avatar from "@material-ui/core/Avatar";
import Person from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";
import { list } from "./api-user";
import auth from "../auth/auth-helper";

const useStyles = makeStyles( theme => ({
    root: {
        border: 0,
        borderRadius: 3,
        color: '#ad61ff',
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px \
        ${theme.spacing(2)}px`,
        color: theme.palette.openTitle,
        textTransform: 'capitalize',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
    }
}));

export default function Users() {
    const [users, setUsers] = useState([]);
    const [redirectToSignin, setRedirectToSignin] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const res = auth.isAuthenticated();

        list({t: res.token}, signal).then(data => {
            if (data && data.error) {
                console.log(data.error);
                setRedirectToSignin(true);
            } else {
                setUsers(data);
            }
        });
        return () => {
            abortController.abort();
        };
    }, []);

    if (redirectToSignin) {
        return (<Redirect to="/signin" />);
    }

    return (
        <Paper elevation={4} className={ classes.root }>
            <Typography variant="h6" className={ classes.title }>
                all users
            </Typography>
            <List dense>
                {users.map((item, i) => {
                    return (
                        <Link to={"/user/" + item._id} key={i}>
                            <ListItem button>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Person />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={item.name} />
                                <ListItemSecondaryAction>
                                    <IconButton>
                                        <ArrowForward />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </Link>
                    );
                })}
            </List>           
        </Paper>
    );
}