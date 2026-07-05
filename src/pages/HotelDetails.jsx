import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Share2,
  Heart,
  MapPin,
  Star,
  Wifi,
  Tv,
  Coffee,
  Calendar,
  Compass,
  Car,
  UserCheck,
  CheckCircle,
} from 'lucide-react';
import { api } from '../services/api';
import { useFavorites } from '../context/FavoritesContext';
import RatingStars from '../components/RatingStars';
import HotelGallery from '../components/HotelGallery';
import toast from 'react-hot-toast';

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    async function fetchDetails() {
      setLoading(true);
      setError(null);
      try {
        const result = await api.getHotelById(id);
        if (result && result.status === 200 && result.data) {
          setHotel(result.data);
        } else {
          throw new Error(result?.message || 'Failed to fetch hotel details');
        }
      } catch (err) {
        console.error('Error fetching hotel details:', err);
        setError(err.message || 'Hotel not found or API error.');
      } finally {
        setLoading(false);
      }
    }
    
    if (id) fetchDetails();
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Sanctuary coordinates copied to clipboard.', {
      style: {
        borderRadius: '4px',
        background: '#111',
        color: '#fff',
        fontSize: '11px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      },
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-28 space-y-6">
        <div className="h-4 w-20 bg-neutral-100 dark:bg-neutral-900 animate-pulse rounded-sm" />
        <div className="aspect-[16/9] w-full bg-neutral-100 dark:bg-neutral-900 animate-pulse rounded-sm" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-10 w-2/3 bg-neutral-100 dark:bg-neutral-900 animate-pulse rounded-sm" />
            <div className="h-4 w-1/3 bg-neutral-100 dark:bg-neutral-900 animate-pulse rounded-sm" />
            <div className="h-24 w-full bg-neutral-100 dark:bg-neutral-900 animate-pulse rounded-sm" />
          </div>
          <div className="h-48 bg-neutral-100 dark:bg-neutral-900 animate-pulse rounded-sm" />
        </div>
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-28 flex flex-col items-center justify-center text-center space-y-4 min-h-[60vh]">
        <h2 className="font-editorial text-2xl italic text-neutral-800 dark:text-white">Property Index Unavailable</h2>
        <p className="text-xs text-neutral-400 max-w-sm">{error || 'The property index you requested is not active.'}</p>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-6 py-3 border border-neutral-900 dark:border-neutral-200 text-[10px] font-bold uppercase tracking-widest"
        >
          <ArrowLeft size={12} />
          <span>Return to Index</span>
        </button>
      </div>
    );
  }

  const isFav = isFavorite(hotel.id);
  const formattedPrice = Math.round(parseFloat(hotel.price) || 0).toLocaleString('en-IN');

  const AMENITIES = [
    { name: 'FREE ULTRA WI-FI', icon: <Wifi size={14} /> },
    { name: 'SMART TV SCREEN', icon: <Tv size={14} /> },
    { name: 'COMPLIMENTARY COFFEE', icon: <Coffee size={14} /> },
    { name: 'FREE CAR PARKING', icon: <Car size={14} /> },
    { name: 'GUIDED CITY TOUR', icon: <Compass size={14} /> },
    { name: 'FLEXIBLE BOOKING', icon: <Calendar size={14} /> },
    { name: 'VERIFIED STAFF SERVICES', icon: <UserCheck size={14} /> },
  ];

  return (
    <div className="bg-white dark:bg-luxury-gray-dark py-24 min-h-screen transition-colors duration-300 select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        
        {/* Navigation Action bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={12} />
            <span>Return to Index</span>
          </button>

          <div className="flex items-center gap-3">
            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-2 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-900 rounded-sm text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Share Coordinates"
            >
              <Share2 size={14} />
            </button>

            {/* Favorite button */}
            <button
              onClick={() => toggleFavorite(hotel)}
              className="p-2 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-900 rounded-sm cursor-pointer transition-colors"
              aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                size={14}
                className={isFav ? 'text-neutral-950 dark:text-white fill-current' : 'text-neutral-400 dark:text-neutral-500'}
              />
            </button>
          </div>
        </div>

        {/* Image Showcase Gallery */}
        <HotelGallery photos={hotel.photos} name={hotel.name} />

        {/* Details Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mt-12 items-start">
          
          {/* Main Info Column */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Title & header */}
            <div className="space-y-4 text-left border-b border-neutral-200 dark:border-neutral-850 pb-8">
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-neutral-400 tracking-[0.25em] uppercase">
                <MapPin size={10} className="text-neutral-400" />
                <span>{hotel.location}, India</span>
              </div>
              <h1 className="font-editorial text-4xl sm:text-5xl font-light text-neutral-900 dark:text-white leading-tight italic">
                {hotel.name}
              </h1>

              <div className="flex items-center gap-4 pt-2">
                <RatingStars rating={hotel.rating} size={13} />
                <span className="text-neutral-250 dark:text-neutral-800">|</span>
                <span className="text-[8px] font-bold tracking-[0.2em] text-neutral-500 uppercase">
                  Sanctuary Stay
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="text-left space-y-4">
              <h2 className="text-[10px] font-extrabold tracking-[0.25em] text-neutral-900 dark:text-white uppercase font-sans">
                About the Property
              </h2>
              <p className="text-sm font-light text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans max-w-2xl whitespace-pre-line">
                {hotel.description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="text-left space-y-6">
              <h2 className="text-[10px] font-extrabold tracking-[0.25em] text-neutral-900 dark:text-white uppercase font-sans">
                Sanctuary Amenities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {AMENITIES.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3.5 p-3.5 bg-neutral-50 dark:bg-neutral-900/40 rounded-sm border border-neutral-200/50 dark:border-neutral-800"
                  >
                    <div className="text-neutral-400 shrink-0">
                      {amenity.icon}
                    </div>
                    <span className="text-[9px] font-bold tracking-widest text-neutral-700 dark:text-neutral-300">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & Booking Column */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white dark:bg-luxury-gray-dark border border-neutral-900 dark:border-neutral-800 p-6 sm:p-8 rounded-sm space-y-6">
              
              <div className="flex items-baseline justify-between border-b border-neutral-200 dark:border-neutral-850 pb-4">
                <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">Rate / Night</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-editorial text-2xl font-medium text-neutral-900 dark:text-white">₹{formattedPrice}</span>
                  <span className="text-[9px] text-neutral-400 tracking-wider">INR</span>
                </div>
              </div>

              {/* Booking Checkmarks */}
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <CheckCircle size={14} className="text-neutral-900 dark:text-neutral-200 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-extrabold tracking-widest block uppercase text-neutral-800 dark:text-neutral-200">Flexible Cancellations</span>
                    <span className="text-xs font-light text-neutral-400 dark:text-neutral-500">Cancel up to 24 hours prior without charges.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={14} className="text-neutral-900 dark:text-neutral-200 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-extrabold tracking-widest block uppercase text-neutral-800 dark:text-neutral-200">Private Escort Included</span>
                    <span className="text-xs font-light text-neutral-400 dark:text-neutral-500">Includes secure regional airport transfer.</span>
                  </div>
                </div>
              </div>

              {/* Action Trigger */}
              <button
                onClick={() =>
                  toast.success(`Booking request for ${hotel.name} submitted.`, {
                    style: {
                      borderRadius: '4px',
                      background: '#111',
                      color: '#fff',
                      fontSize: '11px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    },
                  })
                }
                className="w-full py-4 border border-neutral-900 dark:border-neutral-200 bg-neutral-900 dark:bg-neutral-200 hover:bg-transparent dark:hover:bg-transparent text-white dark:text-neutral-950 hover:text-neutral-900 dark:hover:text-white text-[10px] font-bold uppercase tracking-[0.25em] transition-colors duration-450 cursor-pointer"
              >
                Request Sanctuary Booking
              </button>

              <p className="text-[8px] text-center text-neutral-400 tracking-widest uppercase">
                Secure 256-Bit Editorial Checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
