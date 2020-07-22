import React, { Component } from 'react';
import UserList from '../../components/UserList/UserList';
import { Grid, CssBaseline, Paper, Button, Typography, Snackbar } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Alert from '@material-ui/lab/Alert';
import ResponsiveDialog from '../../components/ResponsiveDialog';
import {ResultValidation, Exception, ValidateAlphabeticWords} from '../../utils/ValidationHelper';
import Game from '../Game/Game';

const ROOM_STATUS = "ROOM_STATUS";
const ROOM_WAITING_STATUS = "WAITING";
const ROOM_PLAYING_STATUS = "PLAYING";
const ROOM_DEMO_STATUS = "DEMO";
const WORD_TO_GUESS = "WORD_TO_GUESS";

class Room extends Component {

    constructor(props){
        super(props);
        this.state = {
            roomInformation: {
                owner: 'joansweeney34',
                occupants: [{
                    'name': 'joan',
                    'username': 'joansweeney34',
                    'role': 'teacher'
                },{
                    'name': 'camilo',
                    'username': 'camilovb',
                    'role': 'student'
                },{
                    'name': 'tess',
                    'username': 'tess123',
                    'role': 'student'
                },{
                    'name': 'jean',
                    'username': 'jean123',
                    'role': 'student'
                },{
                    'name': 'tony',
                    'username': 'tony123',
                    'role': 'student'
                }]
            },
            myUsername: JSON.parse(localStorage.getItem('loggedUser')).username,
            openSnackbar: false,
            openDialog: false,
            wordToGuess: ""
        };
        this.copyToClipboard = this.copyToClipboard.bind(this);
        this.handleOpenSnackbar = this.handleOpenSnackbar.bind(this);
        this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.validatorResponsiveDialog = this.validatorResponsiveDialog.bind(this);
        this.startGame = this.startGame.bind(this);

        if(!localStorage.getItem(ROOM_STATUS)){
            localStorage.setItem(ROOM_STATUS,ROOM_WAITING_STATUS);
        }
    }

    copyToClipboard(){
        navigator.clipboard.writeText(window.location.href);
        this.handleOpenSnackbar();
    }

    handleOpenSnackbar(){
        this.setState({
            openSnackbar: true
        });
    }

    handleCloseSnackbar(){
        this.setState({
            openSnackbar: false
        });
    }

    handleOpenDialog(){
        this.setState({
            openDialog: true
        });
    }

    handleCloseDialog(word, createGameFlag){
        console.log(word, createGameFlag);
        this.setState({
            openDialog: false,
            wordToGuess: word
        });
        if(createGameFlag){
            this.startGame(word);
        }
    }

    startGame(word){
        localStorage.setItem(ROOM_STATUS,ROOM_PLAYING_STATUS);
        localStorage.setItem(WORD_TO_GUESS, word);
    }

    validatorResponsiveDialog(word){
        const WORD_VALIDATION = "Word validation";
        if(word.length>=50){
            return new ResultValidation(false,
                new Exception(WORD_VALIDATION,"The word must have a maximum of 50 characters."));
        }else if(!ValidateAlphabeticWords(word)){
            return new ResultValidation(false,
                new Exception(WORD_VALIDATION,"Invalid word!"));
        }else{
            const real_word = word.replace('-','');
            if(real_word.length<2){
                return new ResultValidation(false,
                    new Exception(WORD_VALIDATION,"Invalid word!"));
            }else{
                return new ResultValidation(true, null);
            }
        }
    }

    render() {

        const briefDialogExplanation = 'Before starting the game, you must enter the word you want '+
         'your students to build. Please, divide the word into small words so that your students can'+
         ' put it together, and type them separately with hyphens. For example: "checking" -> "ch-e-ck-ing".';

        return (
            <div id="room"
                style={{
                    height: "100%",
                    minHeight: "100vh",
                    backgroundImage: 'url(https://source.unsplash.com/random)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                { (localStorage.getItem(ROOM_STATUS)===ROOM_WAITING_STATUS) &&
                <Grid container component="main">
                    <CssBaseline />
                    <Grid container item xs={12}>
                        <Grid item xs={12} sm={6} md={3}
                            style={{
                                padding: "10px 32px 10px 32px"
                            }}
                            >
                            <Paper
                                elevation={3}
                                style={{
                                    margin: "40px auto 0px",
                                    padding: "10px",
                                    alignSelf: "baseline",
                                    flex: "auto"
                                }}
                            >
                                <Typography 
                                    variant="h6"
                                    style={{marginTop: "5px"}}
                                    gutterBottom>Room</Typography>

                                <UserList 
                                    occupants={this.state.roomInformation.occupants}
                                    me={this.state.myUsername}/>
                                {(this.state.myUsername === this.state.roomInformation.owner)?
                                <React.Fragment>
                                    <Button 
                                        variant="contained"
                                        color="secondary"
                                        style={{
                                            margin: "15px",
                                            width: "80%"
                                        }}
                                        onClick={this.handleOpenDialog}
                                        >
                                        Start game
                                    </Button>
                                    <Button
                                        style={{
                                            marginTop: "0px",
                                            marginLeft: "15px",
                                            marginRight: "15px",
                                            width: "80%"
                                        }}
                                        >
                                        Start demo
                                    </Button>
                                </React.Fragment>
                                : <React.Fragment />}
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={12} sm={6} md={3}
                            style={{padding: "5px 5px 20px"}}
                        >
                            <Button
                                spacing={3}
                                color="primary"
                                variant="contained"
                                onClick={this.copyToClipboard}
                                style={{
                                    marginLeft: "20px",
                                    marginRight: "20px",
                                    
                                    alignSelf: "baseline",
                                    flex: "auto"
                                }}
                                startIcon={<FileCopyIcon />}
                            >
                                Copy link
                            </Button>
                        </Grid>
                    </Grid>

                    <Snackbar 
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        open={this.state.openSnackbar} 
                        autoHideDuration={2000}
                        onClose={this.handleCloseSnackbar}>
                        <Alert onClose={this.handleCloseSnackbar} severity="info">
                            Link has been copied
                        </Alert>
                    </Snackbar>
                    <ResponsiveDialog 
                        dialogOpen={this.state.openDialog}
                        handleCloseDialog={this.handleCloseDialog}
                        inputLabel={"Word"}
                        dialogTitle={"Enter a word"}
                        dialogText={briefDialogExplanation}
                        validateField = {this.validatorResponsiveDialog}
                    />
                </Grid>
                }
                {(localStorage.getItem(ROOM_STATUS)===ROOM_PLAYING_STATUS)  && 
                    <Game word={this.state.wordToGuess} key={this.state.wordToGuess} />
                }
                {(localStorage.getItem(ROOM_STATUS)===ROOM_DEMO_STATUS) &&
                    <React.Fragment />
                }
            </div>
        );
    }
}
export default withRouter(Room);