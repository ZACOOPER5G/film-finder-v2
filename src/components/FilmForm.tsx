import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import env from "ts-react-dotenv";

export const FilmForm = () => {
	const [genres, setGenres] = useState([]);
	
	// selected options
	const [genre, setGenre] = useState('');
	const [rating, setRating] = useState(0);
	const [afterYear, setAfterYear] = useState('');
	const [beforeYear, setBeforeYear] = useState('');

    const baseUrl = 'https://api.themoviedb.org/3/';
    const key = env.REACT_APP_KEY;

	// populates genre dropdown on render
	const getGenres = async () => {
		const genreRequestEndpoint = '/genre/movie/list';
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
	}, []);

	// function to fetch film after submitting form
    const handleFilmFetch = async () => {
        try {
            let response = await fetch(`${baseUrl}discover/movie?api_key=${key}&language=en-US&include_adult=false&with_genres=${genre}&vote_average.gte=${rating}&release_date.gte=${afterYear}&release_date.lte=${beforeYear}`);
            let json = await response.json();
			console.log(`${baseUrl}discover/movie?api_key=fake-key&language=en-US&with_genres=${genre}&vote_average.gte=${rating}&release_date.gte=${afterYear}&release_date.lte=${beforeYear}`);
            console.log(json);
        } catch (err) {
            console.log(err);
        };
    };

    const handleSearch = (e: any) => {
        e.preventDefault();
        handleFilmFetch();
		setRating(0);
		setAfterYear('');
		setBeforeYear('');
    };

    return (
        <Form className="m-4 p-4">
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
				<option value="10" >10</option>
				<option value="9" >9</option>
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
    )
};