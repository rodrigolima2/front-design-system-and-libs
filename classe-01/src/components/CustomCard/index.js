import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function CustomCard({ pokemon }) {
    return (
        <Card sx={{ maxWidth: 345, marginTop: 10 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="300"
                    image={pokemon.image}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {pokemon.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Habilidades:
                    </Typography>
                    {pokemon.abilities && pokemon.abilities.map(item => <Typography>{item.ability.name}</Typography>)}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}


export default CustomCard;