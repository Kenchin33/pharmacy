import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Toast from '../Components/Toast';

export default class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      message: '',
      showToast: false,
      toastMessage: ''
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.email,
          message: this.state.message
        })
      });

      const data = await response.json();

      if (response.ok) {
        this.setState({
          email: '',
          message: '',
          toastMessage: data.message || 'Повідомлення надіслано!',
          showToast: true
        });
      } else {
        this.setState({
          toastMessage: data.error || 'Сталася помилка',
          showToast: true
        });
      }
    } catch (error) {
      this.setState({
        toastMessage: 'Помилка з’єднання з сервером',
        showToast: true
      });
    }
  };

  render() {
    return (
      <Container className="contacts">
        <h1>Зворотній зв'язок</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              className="form-control"
              type="email"
              placeholder="Ваш email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicMessage">
            <Form.Control
              className="form-control"
              as="textarea"
              rows="3"
              placeholder="Напишіть ваше питання"
              value={this.state.message}
              onChange={(e) => this.setState({ message: e.target.value })}
              required
            />
          </Form.Group>
          <Button className="btn-submit" variant="primary" type="submit">
            Надіслати
          </Button>
        </Form>

        {this.state.showToast && (
          <Toast
            message={this.state.toastMessage}
            onClose={() => this.setState({ showToast: false })}
          />
        )}
      </Container>
    );
  }
}
