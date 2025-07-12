import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import QuestionCard from '../components/Questions/QuestionCard';
import FilterBar from '../components/Questions/FilterBar';
import SearchBar from '../components/Questions/SearchBar';
import Pagination from '../components/Common/Pagination';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { HiPlus } from 'react-icons/hi';

const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();

  const currentPage = parseInt(searchParams.get('page')) || 1;
  const currentSort = searchParams.get('sort') || 'newest';
  const currentTag = searchParams.get('tag') || '';
  const currentSearch = searchParams.get('search') || '';

  useEffect(() => {
    fetchQuestions();
  }, [currentPage, currentSort, currentTag, currentSearch]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
        sort: currentSort,
      });

      if (currentTag) params.append('tag', currentTag);
      if (currentSearch) params.append('search', currentSearch);

      const response = await axios.get(`/api/questions?${params}`);
      setQuestions(response.data.questions);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', page);
    setSearchParams(newSearchParams);
  };

  const handleSortChange = (sort) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('sort', sort);
    newSearchParams.set('page', '1'); // Reset to first page
    setSearchParams(newSearchParams);
  };

  const handleTagFilter = (tag) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (tag) {
      newSearchParams.set('tag', tag);
    } else {
      newSearchParams.delete('tag');
    }
    newSearchParams.set('page', '1'); // Reset to first page
    setSearchParams(newSearchParams);
  };

  const handleSearch = (searchTerm) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (searchTerm) {
      newSearchParams.set('search', searchTerm);
    } else {
      newSearchParams.delete('search');
    }
    newSearchParams.set('page', '1'); // Reset to first page
    setSearchParams(newSearchParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950 dark:to-accent-950 p-8">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {currentSearch ? (
                  <>
                    Search results for{' '}
                    <span className="gradient-text">&quot;{currentSearch}&quot;</span>
                  </>
                ) : (
                  <>
                    Find answers to your{' '}
                    <span className="gradient-text">coding questions</span>
                  </>
                )}
              </h1>
              {currentTag && (
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-gray-600 dark:text-gray-300">Filtered by:</span>
                  <span className="tag">{currentTag}</span>
                </div>
              )}
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {currentSearch 
                  ? `Found ${pagination.totalQuestions || 0} questions matching your search`
                  : 'Join our community of developers and get help with your programming challenges'
                }
              </p>
            </div>
            {isAuthenticated && (
              <div className="lg:ml-8">
                <Link
                  to="/ask"
                  className="btn-primary btn-lg inline-flex items-center space-x-2 shadow-glow hover:shadow-glow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <HiPlus className="h-5 w-5" />
                  <span>Ask Question</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-6">
        <div className="card p-6">
          <SearchBar
            initialValue={currentSearch}
            onSearch={handleSearch}
          />
        </div>
        <FilterBar
          currentSort={currentSort}
          currentTag={currentTag}
          onSortChange={handleSortChange}
          onTagFilter={handleTagFilter}
          onClearFilters={clearFilters}
          hasActiveFilters={!!(currentTag || currentSearch)}
        />
      </div>

      {/* Questions List */}
      {questions.length === 0 ? (
        <div className="text-center py-16">
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-500 rounded-full animate-pulse"></div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            {currentSearch || currentTag ? 'No questions found' : 'No questions yet'}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
            {currentSearch || currentTag
              ? 'Try adjusting your search or filter criteria to find what you&apos;re looking for.'
              : 'Be the first to ask a question and help build our community!'
            }
          </p>
          {isAuthenticated && !currentSearch && !currentTag && (
            <Link 
              to="/ask" 
              className="btn-primary btn-lg inline-flex items-center space-x-2"
            >
              <HiPlus className="h-5 w-5" />
              <span>Ask the First Question</span>
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div 
              key={question._id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <QuestionCard
                question={question}
                onVote={fetchQuestions}
              />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="card p-6">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
            hasNext={pagination.hasNext}
            hasPrev={pagination.hasPrev}
          />
        </div>
      )}

      {/* Results Summary */}
      {questions.length > 0 && (
        <div className="text-center py-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-medium text-gray-700 dark:text-gray-300">
              {((pagination.currentPage - 1) * 10) + 1}
            </span> to{' '}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {Math.min(pagination.currentPage * 10, pagination.totalQuestions)}
            </span> of{' '}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {pagination.totalQuestions}
            </span> questions
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage; 