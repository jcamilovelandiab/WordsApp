import React, { Component } from 'react';
import { Grid, CssBaseline } from '@material-ui/core';
import SingleLineGridList from '../../components/SingleLineGridList/SingleLineGridList';

class Game extends Component {

    constructor(props){
        super(props);
        this.state = {
            words: (props.word)?props.word.split('-'): localStorage.getItem("WORD_TO_GUESS").split('-')
        }
    }

    render() {
        return (
            <div id="game">
                <Grid container component="main">
                    <CssBaseline />
                    <Grid container item xs={12}
                        style={{paddingTop: "64px", paddingBottom: "32px"}}>
                        <SingleLineGridList
                            items={this.state.words}
                            container={true}/>
                    </Grid>
                    <Grid container item xs={12} md={6} lg={4} style={{padding: "8px"}}>
                        <Grid container item xs={12}>
                            <SingleLineGridList
                                items={['a','b','c','d']}
                                bgColor="#a4d0fb"
                                />
                        </Grid>
                        <Grid container item xs={12}>
                            <SingleLineGridList
                                items={['e','f','g','h']}
                                bgColor="#a4d0fb"/>
                        </Grid>
                        <Grid container item xs={12}>
                            <SingleLineGridList
                                items={['i','j','k','l']}
                                bgColor="#a4d0fb"/>
                        </Grid>
                        <Grid container item xs={12}>
                            <SingleLineGridList
                                items={['m','n','o','p']}
                                bgColor="#a4d0fb"/>
                        </Grid>
                        <Grid container item xs={12}>
                            <SingleLineGridList
                                items={['q','r','s','t']}
                                bgColor="#a4d0fb"/>
                        </Grid>                        
                        <Grid container item xs={12}>
                            <SingleLineGridList
                                items={['u','v','w','x']}
                                bgColor="#a4d0fb"/>
                        </Grid>
                        <Grid container item xs={12}>
                            <SingleLineGridList
                                items={['y','z']}
                                bgColor="#a4d0fb"/>
                        </Grid>
                    </Grid>                    
                </Grid>
           </div>
        );
    }
    
}

export default Game;