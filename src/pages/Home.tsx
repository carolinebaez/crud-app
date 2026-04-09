import { AppLayout } from "../layouts/AppLayout";
import { useBookings } from "../hooks/useBookings";
import { BookingForm } from "../components/BookingForm";
import { BookingList } from "../components/BookingList";

export const Home = () => {
  const { bookings, addBooking, deleteBooking, updateBooking } = useBookings();

  return (
    <AppLayout>
      <h1>Dashboard</h1>

      <BookingForm onAdd={addBooking} />

      <BookingList
        bookings={bookings}
        onDelete={deleteBooking}
        onUpdate={updateBooking}
      />
    </AppLayout>
  );
};
