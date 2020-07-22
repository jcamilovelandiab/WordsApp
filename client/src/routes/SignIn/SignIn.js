import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FaceIcon from '@material-ui/icons/Face';
import Typography from '@material-ui/core/Typography';
import signInStyles from './SignInStyles.js';
import swal from 'sweetalert';
import { withRouter } from 'react-router-dom';
import Copyright from '../../utils/LabelHelper';
import {ValidateUsername, ValidatePassword } from '../../utils/ValidationHelper.js';

function SignInSide(props) {
    const classes = signInStyles();
    
    const [password, setPassword] = React.useState("");
    const [errorPasswordMsg, setErrorPasswordMsg] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [errorUsernameMsg, setErrorUsernameMsg] = React.useState("");

    const redirectToHome = () =>{
        const {history} = props;
        if(history){
            console.log("Redirecting...");
            history.push("/home");
        }
    }

    const showErrorMessage = (message) =>{
        swal({
            title: "Ooops!",
            text: message,
            icon: "error",
            button: false,
            timer: 2000
        });
    }

    const validateFieldUsername = (username) =>{
        try{
            console.log("validating username...");
            if(ValidateUsername(username)){
                console.log("valid username");
                setErrorUsernameMsg("");
                return true;
            }
            console.log("invalid username");
        }catch(ex){
            console.log("invalid username. Exception handled");
            document.getElementById("username").focus();
            setErrorUsernameMsg("Enter your username");
            return false;
        }
    }

    const validateFieldPassword = (password) =>{
        console.log("validating password...");
        if(password===""){
            document.getElementById("password").focus();
            setErrorPasswordMsg("Enter your password!");
            console.log("Empty password");
            return false;
        }else{
            try{
                if(ValidatePassword(password)){
                    console.log("valid password");
                    setErrorPasswordMsg("");
                    return true;
                }
                console.log("invalid password.");
            }catch(ex){
                console.log("invalid password. Exception handled");
                document.getElementById("password").focus();
                setErrorPasswordMsg("Password must contain at least one number, one lowercase letter, one uppercase letter, and a minimum length of 6 characters.");
                return false;
            }
        }
    }

    const handleSubmitForm = (event) => {
        event.preventDefault();
        console.log("Validating form...");
        if(validateFieldUsername(username) &&
            validateFieldPassword(password)){
            
            let listUser = (localStorage.getItem("users")===null)? [] : 
                JSON.parse(localStorage.getItem("users"));
            let user = null;
            for(var i=0; i<listUser.length; i++){
                if(listUser[i].username === username &&
                    listUser[i].password ===password){
                    user = listUser[i]; break;
                }
            }
            if(user!== null){
                console.log("Logging in...");
                localStorage.setItem("loggedUser", JSON.stringify(user));
                redirectToHome();
            }else{
                showErrorMessage("Username or Password is incorrect!");
            }
        }
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <FaceIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Words App
                    </Typography>
                    <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmitForm}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            onChange = {(event)=>{setUsername(event.target.value)}}
                            onBlur = {(event)=>{validateFieldUsername(event.target.value)}}
                            error={(errorUsernameMsg==="")?false:true}
                            helperText={(errorUsernameMsg==="")?"": errorUsernameMsg}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange = {(event)=>{setPassword(event.target.value)}}
                            onBlur = {(event)=>{validateFieldPassword(event.target.value)}}
                            error={(errorPasswordMsg==="")?false:true}
                            helperText={(errorPasswordMsg==="")?"": errorPasswordMsg}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}>
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
  );
}
export default withRouter(SignInSide);