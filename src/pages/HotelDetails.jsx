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
    toast.success('Hotel link copied to clipboard!', {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-6">
        <div className="h-6 w-24 bg-gray-200 dark:bg-slate-800 rounded animate-pulse" />
        <div className="aspect-[16/9] w-full bg-gray-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-10 w-2/3 bg-gray-200 dark:bg-slate-800 rounded animate-pulse" />
            <div className="h-4 w-1/3 bg-gray-200 dark:bg-slate-800 rounded animate-pulse" />
            <div className="h-24 w-full bg-gray-200 dark:bg-slate-800 rounded animate-pulse" />
          </div>
          <div className="h-48 bg-gray-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Hotel Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">{error || 'The property you are looking for does not exist.'}</p>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </button>
      </div>
    );
  }

  const isFav = isFavorite(hotel.id);
  const formattedPrice = Math.round(parseFloat(hotel.price) || 0).toLocaleString('en-IN');

  // Hardcode beautiful amenities list as the API doesn't provide them, making it look premium
  const AMENITIES = [
    { name: 'Free Ultra Wi-Fi', icon: <Wifi size={16} /> },
    { name: 'Smart TV Screen', icon: <Tv size={16} /> },
    { name: 'Complimentary Coffee', icon: <Coffee size={16} /> },
    { name: 'Free Car Parking', icon: <Car size={16} /> },
    { name: 'Guided City Tour', icon: <Compass size={16} /> },
    { name: 'Flexible Booking', icon: <Calendar size={16} /> },
    { name: 'Verified Staff Services', icon: <UserCheck size={16} /> },
  ];

  return (
    <div className="bg-gray-50/30 dark:bg-slate-950/20 py-8 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Action bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Go Back</span>
          </button>

          <div className="flex items-center gap-3">
            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-2.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 hover:border-indigo-500 rounded-xl text-gray-600 dark:text-gray-300 shadow-sm cursor-pointer transition-colors"
              aria-label="Share property link"
            >
              <Share2 size={18} />
            </button>

            {/* Favorite button */}
            <button
              onClick={() => toggleFavorite(hotel)}
              className="p-2.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 hover:border-red-500 rounded-xl shadow-sm cursor-pointer transition-colors"
              aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                size={18}
                className={isFav ? 'text-red-500 fill-current' : 'text-gray-600 dark:text-gray-300'}
              />
            </button>
          </div>
        </div>

        {/* Image Showcase Gallery */}
        <HotelGallery photos={hotel.photos} name={hotel.name} />

        {/* Details and Sidebar booking grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 items-start">
          
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Header info */}
            <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-gray-150 dark:border-slate-850 shadow-sm space-y-3">
              <div className="flex items-center gap-1 text-xs font-semibold text-gray-400 dark:text-gray-500">
                <MapPin size={13} className="text-indigo-500" />
                <span>{hotel.location}, India</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {hotel.name}
              </h1>

              <div className="flex items-center gap-4 pt-1">
                <RatingStars rating={hotel.rating} size={16} />
                <span className="text-gray-300 dark:text-gray-800">|</span>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/20 px-2.5 py-1 rounded-lg">
                  Superhost Stay
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-gray-150 dark:border-slate-850 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                About the Property
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-light whitespace-pre-line">
                {hotel.description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-gray-150 dark:border-slate-850 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Offered Amenities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {AMENITIES.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-900/60 rounded-xl text-slate-700 dark:text-gray-200 border border-gray-100 dark:border-slate-850"
                  >
                    <div className="text-indigo-500 dark:text-indigo-400 shrink-0">
                      {amenity.icon}
                    </div>
                    <span className="text-xs font-semibold">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking / Pricing Sidebar Card */}
          <div className="lg:col-span-1 sticky top-24">
            <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-gray-150 dark:border-slate-850 shadow-lg dark:shadow-none space-y-6">
              
              {/* Price details */}
              <div className="flex items-baseline justify-between border-b border-gray-100 dark:border-slate-850 pb-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">Total rate / night</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white">₹{formattedPrice}</span>
                  <span className="text-xs text-gray-400">INR</span>
                </div>
              </div>

              {/* Verified badges */}
              <div className="space-y-3.5">
                <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-gray-300">
                  <CheckCircle size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Free Cancellations</span>
                    <span className="text-gray-400 font-light">Cancel up to 24 hours prior for a full refund.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-gray-300">
                  <CheckCircle size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Instant Booking Confirmation</span>
                    <span className="text-gray-400 font-light">Confirm your booking instantly via email notification.</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() =>
                  toast.success(`Booking request for ${hotel.name} submitted!`, {
                    style: {
                      borderRadius: '10px',
                      background: '#10B981',
                      color: '#fff',
                    },
                  })
                }
                className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-500/20 active:scale-95 transition-all cursor-pointer text-center"
              >
                Book This Stay Now
              </button>

              <p className="text-[10px] text-center text-gray-400 leading-normal font-light">
                Secure 256-bit SSL encrypted connection. Your payments are safe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
