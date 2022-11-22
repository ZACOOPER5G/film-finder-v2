import { MouseEventHandler } from 'react';
import Form from 'react-bootstrap/Form';

export const FilmForm = () => {
  const handleSearch = (e: any) => {
      e.preventDefault();
  };

  return (
    <Form className="m-4 p-4">
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Choose a genre</Form.Label>
        <Form.Select placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Example textarea</Form.Label>
        <Form.Select as="textarea" rows={3} />
      </Form.Group>
      <button className="form-button" onClick={handleSearch} >Search</button>
    </Form>
  )
};