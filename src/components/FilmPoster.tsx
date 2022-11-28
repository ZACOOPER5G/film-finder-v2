import { Card, CardContent, CardActions, CardMedia, Button, Typography } from "@mui/material";

export const FilmPoster = ({ chosenFilm }: any) => {
    const filmPoster = `https://image.tmdb.org/t/p/original/${chosenFilm.poster_path}`;

    const filmInfoSearcher = (film: string) => {
        const filmConvert = film.split(' ').join('+')
        return filmConvert;
    };

    return (
        <Card className="film-poster-card" sx={{ maxWidth: 500 }}>
            <div className="film-poster">
                <CardMedia
                    component="img"
                    height="740"
                    image={filmPoster}
                    alt="film poster"
                />
                <CardContent className="card-content" >
                    <h3>{chosenFilm.name || chosenFilm.original_title}</h3>
                    <p className="film-bio" >{chosenFilm.overview}</p>
                    <p className="film-info">Rating: {chosenFilm.vote_average}</p>
                    <p className="film-info">Original Language: {chosenFilm.original_language}</p>
                    <p className="film-info">Release: {chosenFilm.release_date}</p>
                </CardContent>
                <CardActions className="card-content">
                    <button className="film-button" ><a  target="_blank" href={`https://www.google.com/search?q=${filmInfoSearcher(chosenFilm.original_title || chosenFilm.name)}`}>{chosenFilm.original_title ? "Film information" : "Show information"}</a></button>
                </CardActions>
            </div>
        </Card>
    )
}
