import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    paper: {
        margin: "2px",
        borderColor: "#000000",
        alignSelf: 'center',
        [theme.breakpoints.down('sm')]: {
            width: "50px",
            height: "40px"
        },
        [theme.breakpoints.up('md')]: {
            width: "70px",
            height: "60px"
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }
}));

export default useStyles;