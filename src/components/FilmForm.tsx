import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import env from "ts-react-dotenv";

export const FilmForm = (props: any) => {
	const [genres, setGenres] = useState([]);
	
	// user selected options
	const [genre, setGenre] = useState('');
	const [rating, setRating] = useState(0);
	const [afterYear, setAfterYear] = useState('');
	const [beforeYear, setBeforeYear] = useState('');

	// api variables
    const baseUrl = 'https://api.themoviedb.org/3/';
    const key = env.REACT_APP_KEY;

	// populates genre dropdown on render
	const getGenres = async () => {
		let movieOrShow;
		if (props.movie) {
			movieOrShow = "movie";
		} else if (props.show) {
			movieOrShow = "tv"
		};
		const genreRequestEndpoint = `/genre/${movieOrShow}/list`;
		const requestParams = `?api_key=${key}`;
		const urlToFetch = `${baseUrl}${genreRequestEndpoint}${requestParams}`;

		try {
			let response = await fetch(urlToFetch);
			let json = await response.json();
			setGenres(json.genres);
			let currGenre = json.genres[0];
			setGenre(currGenre.id);
		} catch (err) {
			console.log(err);
		};
	};

	useEffect(() => {
		getGenres();
	}, [props.movie, props.show]);

	// function to fetch film after submitting form
    const handleFilmFetch = async () => {
		// checks whether movie or show form is selected
		let currentSelection;
		let beforeYearSelection;
		let afterYearSelection;
		if (props.movie) {
			currentSelection = "movie";
			beforeYearSelection = "release_date.lte";
			afterYearSelection = "release_date.gte";
		} else if (props.show) {
			currentSelection = "tv";
			beforeYearSelection = "first_air_date.lte";
			afterYearSelection = "first_air_date.gte";
		};

		// picks random page
		let ranPage = Math.floor(Math.random() * 50);

        try {
            let response = await fetch(`${baseUrl}discover/${currentSelection}?api_key=${key}&language=en-US&include_adult=false&with_genres=${genre}&vote_average.gte=${rating}&${afterYearSelection}=${afterYear}&${beforeYearSelection}=${beforeYear}&page=${ranPage}`);
            let json = await response.json();
			console.log(`${baseUrl}discover/${currentSelection}?api_key=fake-key&language=en-US&with_genres=${genre}&vote_average.gte=${rating}&release_date.gte=${afterYear}&release_date.lte=${beforeYear}`);
			props.setLoading(true);
            console.log(json);
			// get random film and set it as chosen film
			const randomFilm = () => {
				let ranNum = Math.floor(Math.random() * 20).toString();
				let ranFilm = json.results[ranNum];
				if (ranFilm.vote_count > 20) {
					props.setLoading(false);
					return ranFilm
				} else {
					props.setLoading(true)
					handleFilmFetch()
				}
			}
			let ranFilm = randomFilm();
			props.setChosenFilm(ranFilm);
        } catch (err) {
            console.log(err);
        };
    };

    const handleSearch = (e: any) => {
        e.preventDefault();
		props.setMovie(false);
		props.setShow(false);
		props.setChosenFilm(null);
		props.setLoading(true);
        handleFilmFetch();
		setRating(0);
		setAfterYear('');
		setBeforeYear('');
    };

	// conditional to help style based on movie or show selection
	let formSelection;
	if (props.movie) {
		formSelection = "movie"
	} else if (props.show) {
		formSelection = "show"
	};

    return (
		<div className="film-form">
			<Form className="m-4 p-4">
				<h3 className="film-title" >Choose a <em className={formSelection === "movie" ? "movie" : "show"} >{formSelection}</em></h3>
			<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
				<Form.Label>Choose a genre</Form.Label>
				<Form.Select required onChange={(e: any) => {
						let currGenre = e.target.value;
						let formattedGenre = currGenre.split(' ').join('')
						setGenre(formattedGenre.toLowerCase())}
					} >
					{ genres.map((genre) => (
						// @ts-ignore
						<option key={genre.id} value={genre.id} >{genre.name}</option>
					)) }
				</Form.Select>
			</Form.Group>
			<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
				<Form.Label>Minimum rating</Form.Label>
				<Form.Select onChange={(e: any) => setRating(e.target.value)} >
					<option disabled selected> -- select an option -- </option>
					<option value="8" >8</option>
					<option value="7" >7</option>
					<option value="6" >6</option>
					<option value="5" >5</option>
					<option value="4" >4</option>
					<option value="3" >3</option>
					<option value="2" >2</option>
					<option value="1" >1</option>
				</Form.Select>
			</Form.Group>
			<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
				<Form.Label>After year</Form.Label>
					<Form.Control onChange={(e: any) => setAfterYear(e.target.value)} value={afterYear} type="number" placeholder="2011 (example)" min={1899} max={2022} />
					<Form.Text className="text-muted" />
			</Form.Group>
			<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
				<Form.Label>Before year</Form.Label>
					<Form.Control onChange={(e: any) => setBeforeYear(e.target.value)} value={beforeYear}type="number" placeholder="2018 (example)" min={1899} max={2022} />
					<Form.Text className="text-muted" />
			</Form.Group>
			<button className="form-button" onClick={handleSearch} >Search</button>
			</Form>
		</div>
    )
};