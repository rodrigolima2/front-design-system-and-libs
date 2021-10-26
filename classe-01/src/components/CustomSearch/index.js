import { TextField, Button } from "@mui/material";

import useStyles from './styles';

function CustomSearch(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TextField
                label="Search new pokemon"
                value={props.searchPokemon}
                onChange={e => props.setSearchPokemon(e.target.value)}
                variant="outlined"
            />

            <Button
                className={classes.button}
                variant="contained"
                onClick={props.handleFindPokemon}
                color="secondary"
            >
                Search
            </Button>
        </div>
    );
}

export default CustomSearch;