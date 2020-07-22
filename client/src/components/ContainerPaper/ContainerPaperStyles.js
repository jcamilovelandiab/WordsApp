import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: "10px",
        margin: "2px",
        borderColor: "#000000", //1976d2
        [theme.breakpoints.down('sm')]: {
            width: "60px",
            height: "50px"
        },
        [theme.breakpoints.up('md')]: {
            width: "90px",
            height: "80px"
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }
}));

export default useStyles;