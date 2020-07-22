import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import LocalLibraryRoundedIcon from '@material-ui/icons/LocalLibraryRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function UserList(props) {
    const classes = useStyles();
    const users = props.occupants.map((user)=>
        <ListItem key={user.name}>
            <ListItemAvatar>
                <Avatar>
                    {(user.role==='teacher')?
                        <LocalLibraryRoundedIcon color="secondary"/>
                        : <AccountCircleRoundedIcon color="primary"/>
                    }
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={(user.username===props.me)?user.role+" - Me": user.role}/>
        </ListItem>
    );

    return (
        <List className={classes.root}>
            {users}
        </List>
    );
}
