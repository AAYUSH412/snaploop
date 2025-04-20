import { Hash, Music, Code, Gamepad, Film, Smile, Camera, Zap } from 'lucide-react';
import React from 'react';

// Categories for the category bar
export const categories = [
  { id: 'all', name: 'All', iconComponent: Hash, iconSize: 14 },
  { id: 'trending', name: 'Trending', iconComponent: Zap, iconSize: 14 },
  { id: 'music', name: 'Music', iconComponent: Music, iconSize: 14 },
  { id: 'tech', name: 'Tech', iconComponent: Code, iconSize: 14 },
  { id: 'gaming', name: 'Gaming', iconComponent: Gamepad, iconSize: 14 },
  { id: 'comedy', name: 'Comedy', iconComponent: Smile, iconSize: 14 },
  { id: 'movies', name: 'Movies', iconComponent: Film, iconSize: 14 },
  { id: 'photography', name: 'Photography', iconComponent: Camera, iconSize: 14 },
  { id: 'sports', name: 'Sports', iconComponent: Zap, iconSize: 14 },
  { id: 'food', name: 'Food', iconComponent: Zap, iconSize: 14 },
  { id: 'fashion', name: 'Fashion', iconComponent: Zap, iconSize: 14 },
  { id: 'travel', name: 'Travel', iconComponent: Zap, iconSize: 14 },
];

// Categories for the explore page
export const exploreCategories = [
  { id: 'trending', name: 'Trending', iconComponent: Zap, iconSize: 20 },
  { id: 'music', name: 'Music', iconComponent: Music, iconSize: 20 },
  { id: 'tech', name: 'Technology', iconComponent: Code, iconSize: 20 },
  { id: 'design', name: 'Design', iconComponent: Camera, iconSize: 20 },
  { id: 'photography', name: 'Photography', iconComponent: Camera, iconSize: 20 },
  { id: 'gaming', name: 'Gaming', iconComponent: Gamepad, iconSize: 20 }
];

// Common hashtags for upload and filters
export const suggestedTags = ['animation', 'tutorial', 'coding', 'design', 'music', 'vlog'];