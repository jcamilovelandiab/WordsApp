import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

/**
 * To use this component you must specify the following parameters.
 * - DialogOpen [true|false]
 * - A callback handleClose with two parameters.
 *   The first one is the word that the user entered, and the second one is a boolean
 *   that indicates if the user clicked on cancel or accept button.
 * - dialogTitle
 * - dialogText
 * - inputLabel
 * - Validation callback 
 * @param {} props 
 */
export default function ResponsiveDialog(props) {

    const [inputField, setInputField] = React.useState(""); 
    const [fieldError, setFieldError] = React.useState("Please enter a word!");

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const validateField = (field) =>{
        if(field===""){
            setFieldError("Please enter a word!");
        }else{
            const resultValidation = props.validateField(field);
            if(resultValidation.error ===null && resultValidation.success){
                setFieldError("");
            }else{
                setFieldError(resultValidation.error.message);
            }
        }
    }

    const handleClose = (cancelFlag) =>{
        props.handleCloseDialog(inputField, cancelFlag);
    }

    const handleInputChange = (event) =>{
        setInputField(event.target.value);
        validateField(event.target.value);
    }

    return (
            <Dialog
                fullScreen={fullScreen}
                open={props.dialogOpen}
                onClose={()=> handleClose(false)}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{props.dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText> {props.dialogText} </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="inputField"
                        label={(props.inputLabel)?props.inputLabel: "Field"}
                        type="text"
                        fullWidth
                        onChange = {(event)=>{handleInputChange(event)}}
                        error={(fieldError==="")?false:true}
                        helperText={fieldError}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={()=>handleClose(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        disabled={fieldError!==""}
                        onClick={()=> handleClose(true)}
                        color="primary"
                        autoFocus>
                        Accept
                    </Button>
                </DialogActions>
            </Dialog>
    );
    
}
