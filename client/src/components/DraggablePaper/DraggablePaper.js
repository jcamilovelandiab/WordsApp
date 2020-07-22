import React from 'react';
import useStyles from './DraggablePaperStyles';
import { Paper, Typography } from '@material-ui/core';

export default function DraggablePaper(props){

    const classes = useStyles();

    const handleOnDragStart = (event) =>{
        if(props.parent!=="container"){
            const dataItem = {text: props.text, bgColor: props.bgColor}
            event.dataTransfer.setData("drag-item", JSON.stringify(dataItem));
            event.dataTransfer.effectAllowed = "move";
        }else{
            props.leaving();
        }
    }

    const handleOnClick = () =>{
        if(props.leaving){
            props.leaving();
        }
    }

    const handleOnMouseOver = () =>{
        if(props.parent!=="container"){
            document.body.style.cursor = 'grab';
        }else{
            document.body.style.cursor = 'crosshair';
        }
    }

    const handleOnMouseOut = () =>{
        document.body.style.cursor = 'default';
    }

    const handleOnMouseDown = () =>{
        if(props.parent!=="container"){
            document.body.style.cursor = 'grabbing';
        }
    }

    const handleOnMouseUp = () =>{
        if(props.parent!=="container"){
            document.body.style.cursor = 'grab';
        }
    }

    return (
        console.log(props.bgColor)  ||  
        <Paper
            className={classes.paper}
            variant="outlined"
            elevation={6}
            draggable
            style={{backgroundColor: (props.bgColor)?props.bgColor:"#fff"}}
            onDragStart={(event)=>handleOnDragStart(event)}
            onClick = {()=>handleOnClick()}
            onMouseOver = {()=>handleOnMouseOver()}
            onMouseOut = {()=>handleOnMouseOut()}
            onMouseDown = {() => handleOnMouseDown()}
            onMouseUp = {()=>handleOnMouseUp()}
        >
            <Typography variant="h5" alignCenter>
                {props.text}
            </Typography>
        </Paper>
    );
}