import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const [blogs, setBlogData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = ['All', ...new Set(blogs.map(blog => blog.category))];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/blogData.json');
      const data = await response.json();
      setBlogData(data);
    };
    fetchData();
  }, []);

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
  };

  const filteredBlogs = blogs
    .filter(blog => selectedCategory === 'All' || blog.category === selectedCategory)
    .filter(blog =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const featuredBlog = filteredBlogs.find(blog => blog.featured);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with gradient overlay */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h1 className="text-6xl font-bold mb-4 text-center tracking-tight">Club Blog</h1>
          <p className="text-xl text-gray-300 max-w-2xl text-center">
            Where Technology Meets Innovation: Discover the Latest in Tech, AI, and Development
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-16">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-3 bg-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
            />
            <Search className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full border transition-all duration-300 ${selectedCategory === category
                    ? 'bg-white text-black border-white'
                    : 'border-gray-600 text-white hover:border-white'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Blog */}
        {featuredBlog && (
          <div className="mb-16">
            <Link to={`/blog/${generateSlug(featuredBlog.title)}`}>
              <div className="relative group rounded-2xl overflow-hidden bg-gray-900">
                <div className="aspect-[21/9] overflow-hidden">
                  <img
                    src={featuredBlog.image}
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <div className="absolute bottom-0 p-8 md:p-12">
                    <div className="inline-block px-4 py-1 bg-white text-black text-sm font-semibold rounded-full mb-6">
                      Featured Post
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 max-w-4xl">
                      {featuredBlog.title}
                    </h2>
                    <p className="text-gray-300 text-lg mb-6 max-w-2xl">
                      {featuredBlog.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="text-white">{featuredBlog.author}</span>
                      <span>•</span>
                      <span>{featuredBlog.date}</span>
                      <span>•</span>
                      <span>{featuredBlog.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs
            .filter(blog => !blog.featured)
            .map(blog => (
              <div
                key={blog.title}
                className="group bg-white/5 rounded-xl overflow-hidden border border-transparent hover:border-white/20 transition-all duration-300"
              >
                <Link to={`/blog/${generateSlug(blog.title)}`}>
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-white/10 text-sm rounded-full">
                        {blog.category}
                      </span>
                      <span className="text-gray-400 text-sm">{blog.readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors duration-300">
                      {blog.title}
                    </h3>

                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {blog.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="font-medium text-white">{blog.author}</span>
                      <span>•</span>
                      <span>{blog.date}</span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {blog.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 bg-white/10 rounded-full text-gray-300 hover:bg-white/20 transition-colors duration-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
