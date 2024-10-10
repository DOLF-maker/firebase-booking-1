import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setEditingBooking,
  deleteBookingFromFirestore,
  fetchBookings,
} from '../features/appointmentSlice';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';

export default function BookingCard() {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.booking.bookings);
  const status = useSelector((state) => state.booking.status);

  useEffect(() => {
    const unsubscribePromise = dispatch(fetchBookings());
    return () => {
      unsubscribePromise.then((unsubscribe) => {
        if (typeof unsubscribe === 'function') {
          unsubscribe();
        }
      });
    };
  }, [dispatch]);

  const handleEdit = (id) => {
    dispatch(setEditingBooking(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteBookingFromFirestore(id));
  };

  if (status === 'loading') {
    return <div>Loading appointments...</div>;
  }

  if (status === 'failed') {
    return <Alert variant="danger">Error loading appointments. Please try again.</Alert>;
  }

  return (
    <Container className="mt-5"> 
      <Row className="g-4">
        {bookings.map((booking) => (
          <Col key={booking.id} xs={12} sm={6} md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>{booking.name}</Card.Title>
                <Card.Text>
                  <strong>Session:</strong> {booking.session} <br />
                  <strong>Date:</strong> {booking.date} <br />
                  <strong>Time:</strong> {booking.time} <br />
                  <strong>Email:</strong> {booking.email} <br />
                  <strong>Phone:</strong> {booking.phone} <br />
                </Card.Text>
                <Button variant="primary" onClick={() => handleEdit(booking.id)} className="me-2">
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(booking.id)}>
                   Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
