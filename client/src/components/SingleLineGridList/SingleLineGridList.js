import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import useStyles from './SingleLineGridListStyles';
import DraggablePaper from '../DraggablePaper/DraggablePaper';
import ContainerPaper from '../ContainerPaper/ContainerPaper'

export default function SingleLineGridList(props) {

  const isContainer = (props.container)?props.container: false;
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <GridList cellHeight="auto" className={classes.gridList} cols={props.items.length}
          style={{width: "100%", padding: "2px"}}>
        {props.items.map((item,index) => (
            <GridListTile key={item+index}>
                {(isContainer)?
                  <ContainerPaper
                  />
                :
                  <DraggablePaper bgColor={props.bgColor} text={item}/>
                }
            </GridListTile>
        ))}
        </GridList>
    </div>
  );
}
