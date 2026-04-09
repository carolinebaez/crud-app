import type { Booking } from "../types/booking";

type BookingCardProps = {
  booking: Booking;
  formattedDate: string;
  onEdit: () => void;
  onDelete: () => void;
};

export const BookingCard = ({
  booking,
  formattedDate,
  onEdit,
  onDelete,
}: BookingCardProps) => {
  return (
    <article className="booking-card">
      <div className="booking-card-header">
        <div>
          <h3 className="service-title" title={booking.service}>
            {booking.service}
          </h3>
          <p className="service-subtitle">Booking details</p>
        </div>
        <span className="booking-date">{formattedDate}</span>
      </div>

      <div className="booking-card-body">
        <div className="booking-details">
          <p className="customer-name">
            <span className="customer-icon" aria-hidden="true">
              👤
            </span>
            <span className="customer-info">
              <span className="customer-label">Guest</span>
              <span className="customer-text" title={booking.name}>
                {booking.name}
              </span>
            </span>
          </p>
        </div>
      </div>

      <div className="actions">
        <button
          type="button"
          className="btn-edit"
          onClick={onEdit}
          aria-label={`Edit booking for ${booking.service}`}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn-delete"
          onClick={onDelete}
          aria-label={`Delete booking for ${booking.service}`}
        >
          Delete
        </button>
      </div>
    </article>
  );
};
