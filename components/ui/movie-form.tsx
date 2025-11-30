'use client';

import { useState, useEffect } from 'react';
import { Movie } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';

interface MovieFormProps {
  movie?: Movie | null;
  onSave: (movie: Omit<Movie, 'id' | 'addedAt'>) => void;
  onCancel: () => void;
}

export function MovieForm({ movie, onSave, onCancel }: MovieFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    year: new Date().getFullYear(),
    genre: '',
    rating: 0,
    watched: false,
    notes: '',
    posterUrl: ''
  });

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title,
        year: movie.year,
        genre: movie.genre,
        rating: movie.rating,
        watched: movie.watched,
        notes: movie.notes,
        posterUrl: movie.posterUrl || ''
      });
    }
  }, [movie]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {movie ? 'Edit Movie' : 'Add New Movie'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Movie Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter movie title"
              required
              className="text-base"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Year *</Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || 0 })}
                min="1800"
                max={new Date().getFullYear() + 5}
                required
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating">Rating (0-10)</Label>
              <Input
                id="rating"
                type="number"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })}
                min="0"
                max="10"
                step="0.1"
                className="text-base"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="genre">Genre</Label>
            <Input
              id="genre"
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
              placeholder="e.g., Action, Drama, Sci-Fi"
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="posterUrl">Poster URL</Label>
            <Input
              id="posterUrl"
              value={formData.posterUrl}
              onChange={(e) => setFormData({ ...formData, posterUrl: e.target.value })}
              placeholder="https://example.com/poster.jpg"
              type="url"
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Add your thoughts, why you want to watch it, etc."
              rows={4}
              className="text-base resize-none"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="watched"
              type="checkbox"
              checked={formData.watched}
              onChange={(e) => setFormData({ ...formData, watched: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <Label htmlFor="watched" className="cursor-pointer">
              I've already watched this movie
            </Label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              {movie ? 'Update Movie' : 'Add Movie'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
