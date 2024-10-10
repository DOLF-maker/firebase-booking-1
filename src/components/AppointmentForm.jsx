import { useDispatch, useSelector } from 'react-redux';
import {
  updateBookingField,
  submitBooking,
  updateBookingInFirestore,
  resetBookingForm,
} from '../features/appointmentSlice';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function BookingForm() {
  const dispatch = useDispatch();
  const bookingData = useSelector((state) => state.booking.bookingData);
  const currentEditingId = useSelector((state) => state.booking.currentEditingId);
  const status = useSelector((state) => state.booking.status);

  const handleChange = (e) => {
    dispatch(updateBookingField({ field: e.target.name, value: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentEditingId) {
      await dispatch(updateBookingInFirestore({ ...bookingData, id: currentEditingId }));
    } else {
      await dispatch(submitBooking());
    }
    dispatch(resetBookingForm());
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Row className="border rounded-5 p-5 bg-white shadow box-area" style={{ width: '100%', maxWidth: '600px' }}>
        <Col>
          <h2 className="mb-4">{currentEditingId ? 'Edit Booking' : 'Book Your Session Now'}</h2>
          <p className="mb-4">Enter your details to make an appointment with our sport-science-experts.</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={bookingData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={bookingData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone:</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={bookingData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Session:</Form.Label>
              <Form.Control
                type="text"
                name="session"
                placeholder="Strength Training, Physiotherapy, Nutrition etc"
                value={bookingData.session}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date:</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={bookingData.date}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Time:</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={bookingData.time}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={status === 'loading'} className="d-flex align-items-center">
              {status === 'loading' ? 'Submitting...' : currentEditingId ? 'Update Booking' : 'Book Your Appointment Now!'}
            </Button>
          </Form>

          {status === 'failed' && (
            <Alert variant="danger" className="mt-3">
              Error submitting appointment. Please try again.
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}
