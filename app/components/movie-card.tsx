'use client';

import { Movie } from '@/lib/db';
import { Button } from '././ui/button';
import { Card, CardContent, CardFooter } from '././ui/card';
import { Badge } from '././ui/badge';
import { Star, Pencil, Trash2, Check, Calendar, Film } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  onEdit: (movie: Movie) => void;
  onDelete: (id: string) => void;
  onToggleWatched: (id: string, watched: boolean) => void;
}

export function MovieCard({ movie, onEdit, onDelete, onToggleWatched }: MovieCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-gray-200 dark:border-gray-800">
      <div className="relative aspect-[2/3] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
        {movie.posterUrl ? (
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Film className="h-20 w-20 text-gray-400 dark:text-gray-600" />
          </div>
        )}

        {movie.watched && (
          <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full p-2 shadow-lg">
            <Check className="h-5 w-5" />
          </div>
        )}

        {movie.rating > 0 && (
          <div className="absolute top-3 left-3 bg-yellow-500 text-white rounded-lg px-2 py-1 shadow-lg flex items-center gap-1 font-semibold">
            <Star className="h-4 w-4 fill-current" />
            <span>{movie.rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-lg line-clamp-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="h-3.5 w-3.5" />
            <span>{movie.year}</span>
          </div>
        </div>

        {movie.genre && (
          <Badge variant="info" className="font-normal">
            {movie.genre}
          </Badge>
        )}

        {movie.notes && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {movie.notes}
          </p>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onToggleWatched(movie.id, !movie.watched)}
          className="flex-1"
        >
          {movie.watched ? 'Mark Unwatched' : 'Mark Watched'}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(movie)}
          className="hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(movie.id)}
          className="hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
