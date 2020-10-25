import React, { useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { remove } from "./api-user";
import auth from "../auth/auth-helper";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

DeleteUser.propTypes = {
    userId: PropTypes.string.isRequired
};

export default function DeleteUser(props) {
    const [open, setOpen] = useState(false);
    const [openSecondary, setOpenSecondary] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const deleteButton = () => {
        const { token } = auth.isAuthenticated();
        remove({
            userId: props.userId
        }, {t: token}).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                auth.clearJWT(() => console.log('deleted'));
                setOpenSecondary(true);
            }
        });
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseSecondary = () => {
        setOpenSecondary(false);
        setRedirect(true);
    }

    if (redirect) {
        return (<Redirect to="/" />);
    }

    return (
        <span>
            <IconButton color="secondary" aria-label="Delete"
            onClick={ handleOpen }>
                <Delete />
            </IconButton>
            <Dialog open={ open } onClose={ handleClose }>
                <DialogTitle>
                    Delete Account
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please confirm your deletion of this account
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={ handleClose }
                    color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={ deleteButton }
                    color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={ openSecondary } onClose={ handleClose }>
                <DialogTitle>
                    Success!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        We are sad to see you go. All the best!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ handleCloseSecondary } color="primary"
                    variant="contained">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </span>
    );
}