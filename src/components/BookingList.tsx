import { useMemo, useState } from "react";
import type { Booking } from "../types/booking";
import { BookingCard } from "./BookingCard";
import { BookingEditor } from "./BookingEditor";
import { Modal } from "./Modal";
import { formatBookingDate } from "../utils/dateHelpers";

type Props = {
  bookings: Booking[];
  onDelete: (id: string) => void;
  onUpdate: (booking: Booking) => void;
};

export const BookingList = ({ bookings, onDelete, onUpdate }: Props) => {
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [deletingBooking, setDeletingBooking] = useState<Booking | null>(null);

  const sortedBookings = useMemo(
    () => [...bookings].sort((a, b) => a.date.localeCompare(b.date)),
    [bookings],
  );

  const handleDelete = (booking: Booking) => {
    setDeletingBooking(booking);
  };

  const confirmDelete = () => {
    if (!deletingBooking) return;

    onDelete(deletingBooking.id);
    setDeletingBooking(null);
  };

  const cancelDelete = () => {
    setDeletingBooking(null);
  };

  const handleStartEdit = (booking: Booking) => {
    setEditingBooking(booking);
  };

  const handleCancelEdit = () => {
    setEditingBooking(null);
  };

  const handleSaveEdit = (booking: Booking) => {
    onUpdate(booking);
    setEditingBooking(null);
  };

  return (
    <section className="booking-list">
      <div className="booking-list-header">
        <div>
          <h2 className="booking-list-title">Your bookings</h2>
          <p className="booking-list-subtitle">
            {bookings.length} total booking{bookings.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      {editingBooking && (
        <Modal
          title="Edit booking"
          description="Make changes and save when ready."
          onClose={handleCancelEdit}
        >
          <BookingEditor
            booking={editingBooking}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
          />
        </Modal>
      )}

      {deletingBooking && (
        <Modal
          title="Delete booking"
          description={`Delete booking for ${deletingBooking.name} on ${formatBookingDate(
            deletingBooking.date,
          )}?`}
          onClose={cancelDelete}
        >
          <div className="modal-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={cancelDelete}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn-delete"
              onClick={confirmDelete}
            >
              Delete booking
            </button>
          </div>
        </Modal>
      )}

      {sortedBookings.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📅</div>
          <h3>No bookings yet</h3>
          <p>Create your first booking to get started.</p>
        </div>
      ) : (
        <div className="booking-grid">
          {sortedBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              formattedDate={formatBookingDate(booking.date)}
              onEdit={() => handleStartEdit(booking)}
              onDelete={() => handleDelete(booking)}
            />
          ))}
        </div>
      )}
    </section>
  );
};
