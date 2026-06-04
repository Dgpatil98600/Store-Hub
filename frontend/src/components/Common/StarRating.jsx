import React from 'react';

const StarRating = ({ rating = 0, onRate, readonly = false, size = 'md' }) => {
    const sizeClasses = { sm: 'text-base', md: 'text-xl', lg: 'text-2xl' };
    const [hoverRating, setHoverRating] = React.useState(0);

    return (
        <div className="star-rating" role="group" aria-label="Star rating">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={`star ${sizeClasses[size]} ${star <= (hoverRating || rating) ? 'filled' : ''} ${readonly ? 'readonly' : ''}`}
                    onClick={() => !readonly && onRate && onRate(star)}
                    onMouseEnter={() => !readonly && setHoverRating(star)}
                    onMouseLeave={() => !readonly && setHoverRating(0)}
                    onKeyDown={(e) => { if (!readonly && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onRate && onRate(star); } }}
                    role={readonly ? 'img' : 'button'}
                    tabIndex={readonly ? -1 : 0}
                    aria-label={`${star} star${star > 1 ? 's' : ''}`}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default StarRating;
