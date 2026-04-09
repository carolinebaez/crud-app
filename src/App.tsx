import { AppLayout } from "./layouts/AppLayout";
import { useBookings } from "./hooks/useBookings";
import { BookingForm } from "./components/BookingForm";
import { BookingList } from "./components/BookingList";
import { ToastProvider } from "./components/ToastProvider";

function App() {
  const { bookings, addBooking, deleteBooking, updateBooking } = useBookings();

  return (
    <ToastProvider>
      <AppLayout>
        <BookingForm onAdd={addBooking} />
        <BookingList
          bookings={bookings}
          onDelete={deleteBooking}
          onUpdate={updateBooking}
        />
      </AppLayout>
    </ToastProvider>
  );
}

export default App;
