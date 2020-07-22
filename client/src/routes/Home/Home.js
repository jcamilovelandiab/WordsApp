import React, {Component} from 'react';
import MyMenu from '../../components/MyMenu/MyMenu'; 
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Grid, Button } from '@material-ui/core';
import {v1 as uuid} from 'uuid';
import { withRouter } from "react-router-dom";

class Home extends Component{

    constructor(props){
        super(props);
        let loggedUserJSON = JSON.parse(localStorage.getItem("loggedUser"));
        this.state = {
            welcomeMessage: (loggedUserJSON)?"Hi "+loggedUserJSON.firstName+"!":"Hi!"
        }
    }

    render(){

        const createRoom = () => {
            const id = uuid();
            this.props.history.push(`/room/${id}`);
        }
        
        return(
            <div>
                <MyMenu />
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Typography variant="h5">
                                {this.state.welcomeMessage}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Typography variant="body1">
                                To start playing. Create a game
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Button 
                                variant="contained"
                                size="large"
                                color="secondary"
                                onClick={createRoom}>
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default withRouter(Home);