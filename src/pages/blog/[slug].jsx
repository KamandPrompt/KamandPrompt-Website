import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Clock, User, Tag } from 'lucide-react';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch('/blogData.json');
        const blogs = await response.json();
        
        // Improved slug matching function
        const matchedBlog = blogs.find(blog => 
          blog.title.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/^-+|-+$/g, '') === slug
        );
        
        setBlog(matchedBlog);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [slug]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-2xl font-semibold text-gray-600">Loading...</div>
    </div>
  );

  if (!blog) return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl font-bold text-gray-800">Blog Not Found</h1>
      <p className="mt-4 text-gray-600">The blog you are looking for does not exist.</p>
      <Link to="/blogs" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
        Back to Blogs
      </Link>
    </div>
  );

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      {/* Back to Blogs Button */}
      <Link 
        to="/blogs" 
        className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6"
      >
        <ChevronLeft className="mr-2" />
        Back to Blogs
      </Link>

      {/* Header Section */}
      <article className="prose lg:prose-xl max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
        
        {/* Blog Metadata */}
        <div className="flex items-center text-gray-600 mb-8 space-x-4">
          <div className="flex items-center">
            <User className="mr-2 w-5 h-5" />
            <span>{blog.author}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 w-5 h-5" />
            <time dateTime={blog.date}>{blog.date}</time>
          </div>
        </div>

        {/* Featured Image (if available) */}
        {blog.featuredImage && (
          <img 
            src={blog.featuredImage} 
            alt={blog.title} 
            className="w-full h-96 object-cover rounded-lg mb-8 shadow-lg"
          />
        )}

        {/* Blog Content */}
        <div className="leading-relaxed text-gray-800">
          {blog.excerpt && (
            <p className="text-2xl font-semibold text-gray-700 mb-6 italic">
              {blog.excerpt}
            </p>
          )}
          
          {blog.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-xl mb-4">{paragraph}</p>
          ))}
        </div>

        {/* Tags Section */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
              <Tag className="mr-2 w-5 h-5" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default BlogDetail;