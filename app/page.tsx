'use client';

import { useState, useEffect } from 'react';
import { Movie } from '@/lib/db';
import { localStorageDB } from '@/lib/storage';
import { MovieCard } from './components/movie-card';
import { MovieForm } from './components/movie-form';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Plus, Search, Film, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterWatched, setFilterWatched] = useState<'all' | 'watched' | 'unwatched'>('all');
  const [sortBy, setSortBy] = useState<'title' | 'year' | 'rating' | 'added'>('added');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadMovies();
  }, []);

  useEffect(() => {
    if (mounted) {
      applyFilters();
    }
  }, [movies, searchQuery, filterWatched, sortBy, mounted]);

  const loadMovies = () => {
    const data = localStorageDB.getAll();
    setMovies(data);
  };

  const applyFilters = () => {
    let filtered = [...movies];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.title.toLowerCase().includes(query) ||
          m.genre.toLowerCase().includes(query) ||
          m.notes.toLowerCase().includes(query)
      );
    }

    if (filterWatched !== 'all') {
      filtered = filtered.filter((m) =>
        filterWatched === 'watched' ? m.watched : !m.watched
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'year':
          return b.year - a.year;
        case 'rating':
          return b.rating - a.rating;
        case 'added':
        default:
          return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
      }
    });

    setFilteredMovies(filtered);
  };

  const handleSaveMovie = (movieData: Omit<Movie, 'id' | 'addedAt'>) => {
    if (editingMovie) {
      localStorageDB.update(editingMovie.id, movieData);
    } else {
      localStorageDB.create(movieData);
    }
    loadMovies();
    setIsFormOpen(false);
    setEditingMovie(null);
  };

  const handleEditMovie = (movie: Movie) => {
    setEditingMovie(movie);
    setIsFormOpen(true);
  };

  const handleDeleteMovie = (id: string) => {
    if (confirm('Are you sure you want to delete this movie?')) {
      localStorageDB.delete(id);
      loadMovies();
    }
  };

  const handleToggleWatched = (id: string, watched: boolean) => {
    localStorageDB.update(id, { watched });
    loadMovies();
  };

  const handleAddNew = () => {
    setEditingMovie(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingMovie(null);
  };

  const stats = {
    total: movies.length,
    watched: movies.filter((m) => m.watched).length,
    unwatched: movies.filter((m) => !m.watched).length,
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg">
                <Film className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  Movie Watchlist
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Track and manage your movies
                </p>
              </div>
            </div>
            <Button
              onClick={handleAddNew}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Movie
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Movies</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">Watched</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.watched}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">To Watch</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.unwatched}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search movies by title, genre, or notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={filterWatched} onValueChange={(value: any) => setFilterWatched(value)}>
                  <SelectTrigger className="w-[160px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Movies</SelectItem>
                    <SelectItem value="watched">Watched</SelectItem>
                    <SelectItem value="unwatched">To Watch</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="added">Recently Added</SelectItem>
                    <SelectItem value="title">Title (A-Z)</SelectItem>
                    <SelectItem value="year">Year (Newest)</SelectItem>
                    <SelectItem value="rating">Rating (Highest)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </header>

        {filteredMovies.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-gray-200 dark:bg-gray-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <Film className="h-12 w-12 text-gray-400 dark:text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {searchQuery || filterWatched !== 'all' ? 'No movies found' : 'No movies yet'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchQuery || filterWatched !== 'all'
                ? 'Try adjusting your filters or search query'
                : 'Start building your watchlist by adding your first movie'}
            </p>
            {!searchQuery && filterWatched === 'all' && (
              <Button onClick={handleAddNew} size="lg">
                <Plus className="h-5 w-5 mr-2" />
                Add Your First Movie
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onEdit={handleEditMovie}
                onDelete={handleDeleteMovie}
                onToggleWatched={handleToggleWatched}
              />
            ))}
          </div>
        )}
      </div>

      {isFormOpen && (
        <MovieForm
          movie={editingMovie}
          onSave={handleSaveMovie}
          onCancel={handleCloseForm}
        />
      )}
    </div>
  );
}
