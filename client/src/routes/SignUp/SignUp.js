import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import FaceIcon from '@material-ui/icons/Face';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import signUpStyles from './SignUpStyles.js';
import swal from 'sweetalert';
import { withRouter } from 'react-router-dom';
import Copyright from '../../utils/LabelHelper';
import {ValidateUsername, ValidatePassword, ValidateInternationalNames }  from '../../utils/ValidationHelper.js';

function SignUp(props) {
    const classes = signUpStyles();

    const [firstName, setFirstName] = React.useState("");
    const [errorFirstNameMsg, setErrorFirstNameMsg] = React.useState("");

    const [lastName, setLastName] = React.useState("");
    const [errorLastNameMsg, setErrorLastNameMsg] = React.useState("");

    const [password, setPassword] = React.useState("");
    const [errorPasswordMsg, setErrorPasswordMsg] = React.useState("");

    const [username, setUsername] = React.useState("");
    const [errorUsernameMsg, setErrorUsernameMsg] = React.useState("");

    const validateFieldUsername = (username) =>{
        let resultValidation = ValidateUsername(username);
        if(resultValidation.error ===null && resultValidation.success){
            setErrorUsernameMsg("");
            return true;
        }else{
            document.getElementById("username").focus();
            setErrorUsernameMsg(resultValidation.error.message);
            return false;
        }
    }

    const validateFieldPassword = (password) =>{
        if(password===""){
            document.getElementById("password").focus();
            setErrorPasswordMsg("Enter your password!");
            return false;
        }else{
            try{
                if(ValidatePassword(password)){
                    setErrorPasswordMsg("");
                    return true;
                }
            }catch(ex){
                document.getElementById("password").focus();
                setErrorPasswordMsg("Password must contain at least one number, one lowercase letter, one uppercase letter, and a minimum length of 6 characters.");
                return false;
            }
        }
    }

    const validateFieldFirstName = (name) =>{
        if(firstName===""){
            document.getElementById("firstName").focus();
            setErrorFirstNameMsg("Enter your first name!");
            return false;
        }else if(!ValidateInternationalNames(name)){
            document.getElementById("firstName").focus();
            setErrorFirstNameMsg("You have entered an invalid name!");
            return false;
        }else{
            setErrorFirstNameMsg("");
            return true;
        }
    }

    const validateFieldLastName = (name) =>{
        if(lastName===""){
            document.getElementById("lastName").focus();
            setErrorLastNameMsg("Enter your last name!");
            return false;
        }else if(!ValidateInternationalNames(name)){
            document.getElementById("lastName").focus();
            setErrorLastNameMsg("You have entered an invalid name!");
            return false;
        }else{
            setErrorLastNameMsg("");
            return true;
        }
    }

    const handleFirstNameChange = (event) =>{
        setFirstName(event.target.value);
        validateFieldFirstName(event.target.value);
    }

    const handleLastNameChange = (event) =>{
        setLastName(event.target.value);
        validateFieldLastName(event.target.value);
    }

    const handleUsernameChange = (event) =>{
        setUsername(event.target.value);
        validateFieldUsername(event.target.value);
    }

    const handlePasswordChange = (event) =>{
        setPassword(event.target.value);
        validateFieldPassword(event.target.value);
    }

    const handleSubmitForm = (event) => {
        event.preventDefault();
        if(!(validateFieldFirstName(firstName) && 
            validateFieldLastName(lastName) &&
            validateFieldUsername(username) &&
            validateFieldPassword(password))) return false;

        var listUser = (localStorage.getItem("users")===null)? [] : JSON.parse(localStorage.getItem("users"));
        var canSignUp = true;
        for(var i=0; i<listUser.length; i++){
            if(listUser[i].username === username){
                canSignUp = false; break;
            }
        }

        if(canSignUp){
            var user = { firstName: firstName, lastName: lastName, username: username, password: password}
            swal({
                title: "Good job!",
                text: "You have signed up successfully!!",
                icon: "success",
                timer: 2000,
                button: false,
            }).then(()=>{
                var listUser = (localStorage.getItem("users")===null)? [] : JSON.parse(localStorage.getItem("users"));
                listUser.push(user);
                localStorage.setItem("users", JSON.stringify(listUser));
                localStorage.setItem("loggedUser", JSON.stringify(user));
                props.history.push("home");
            });
        }else{
            document.getElementById("email").focus();
            swal({
                title: "Ooops!",
                text: "This email is already associated with an account!",
                icon: "error",
                button: false,
                timer: 2000
            });
        }     
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <FaceIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Words App
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmitForm}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        onChange = {(event)=>{handleFirstNameChange(event)}}
                        error={(errorFirstNameMsg==="")?false:true}
                        helperText={(errorFirstNameMsg==="")?"": errorFirstNameMsg}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                        onChange = {(event)=>{handleLastNameChange(event)}}
                        error={(errorLastNameMsg==="")?false:true}
                        helperText={(errorLastNameMsg==="")?"": errorLastNameMsg}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        onChange = {(event)=>{handleUsernameChange(event)}}
                        error={(errorUsernameMsg==="")?false:true}
                        helperText={(errorUsernameMsg==="")?"": errorUsernameMsg}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange = {(event)=>{handlePasswordChange(event)}}
                        error={(errorPasswordMsg==="")?false:true}
                        helperText={(errorPasswordMsg==="")?"": errorPasswordMsg}
                    />
                </Grid>
            </Grid>
            <Button
                disabled = { (firstName==="" || errorFirstNameMsg!=="") ||
                            (lastName==="" || errorLastNameMsg!=="") ||
                            (username==="" || errorUsernameMsg!=="") ||
                            (password==="" || errorPasswordMsg!=="")}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}>
                Sign Up
            </Button>
            <Grid container justify="flex-end">
                <Grid item>
                    <Link href="/signin" variant="body2">
                        Already have an account? Sign in
                    </Link>
                </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
            <Copyright />
        </Box>
      </Container>
    );
  }

export default withRouter(SignUp);