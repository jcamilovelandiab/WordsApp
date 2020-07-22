import React from 'react';
import useStyles from './ContainerPaperStyles';
import { Paper } from '@material-ui/core';
import DraggablePaper from '../DraggablePaper/DraggablePaper';

export default function ContainerPaper(props){

    const [droppedItemText, setDroppedItemText] = React.useState(null);
    const [droppedItemBgColor, setDroppedItemBgColor] = React.useState(null);

    const classes = useStyles();

    const handleOnDragOver = (event) =>{
        event.preventDefault();
    }

    const handleOnDragEnter = (event) =>{
        event.preventDefault();
        if(droppedItemText===null && droppedItemBgColor===null){
            let element = event.target;
            element.style.backgroundColor = 'rgba(0,0,0,0.3)';
        }
    }

    const handleOnDragLeave = (event) =>{
        if(droppedItemText===null && droppedItemBgColor===null){
            let element = event.target;
            element.style.backgroundColor = (props.bgColor)?props.bgColor:"#fff";
        }
    }

    const handleOnDrop = (event) =>{
        if(droppedItemText===null && droppedItemBgColor===null){
            let currentBox = event.target;
            currentBox.style.backgroundColor = (props.bgColor)?props.bgColor:"#fff";
            const droppedItem = JSON.parse(event.dataTransfer.getData("drag-item"));
            if (droppedItem) {
                console.log(droppedItem);
                setDroppedItemText(droppedItem.text);
                setDroppedItemBgColor(droppedItem.bgColor);
            }
        }
    }

    const removeCard = () =>{
        setDroppedItemText(null);
        setDroppedItemBgColor(null);
    }

    return (
        <Paper
            className={classes.paper}
            variant="outlined"
            elevation={24}
            style={{backgroundColor: (props.bgColor)?props.bgColor:"#fff"}}
            onDragOver = {(event)=>handleOnDragOver(event)}
            onDragEnter = {(event)=>handleOnDragEnter(event)}
            onDragLeave = {(event)=>handleOnDragLeave(event)}
            onDrop = {(event)=>handleOnDrop(event)}
            >
                {(droppedItemText!==null) && 
                    <DraggablePaper
                        parent="container"
                        leaving = {removeCard}
                        bgColor={(droppedItemBgColor!==null)?droppedItemBgColor:"#fff"}
                        text={droppedItemText}/>
                }
        </Paper>
    );
    
}