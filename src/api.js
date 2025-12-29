/**
 * Centralized API Layer for KamandPrompt Club Website
 * 
 * This module handles all data fetching from a configurable base URL.
 * For development, it uses the local public folder.
 * For production, it can point to a GitHub raw content URL.
 */

// Configure this to your GitHub raw content URL when deploying
// Example: 'https://raw.githubusercontent.com/KamandPrompt/club-data/main'
const BASE_URL = "https://raw.githubusercontent.com/KamandPrompt/website-data/main";

// In-memory cache for fetched data
const cache = new Map();

/**
 * Convert relative asset paths to full GitHub raw URLs
 * @param {string} path - The relative asset path (e.g., '/team/images/xyz.jpg' or 'images/xyz.jpg')
 * @param {string} prefix - Optional prefix to prepend (e.g., '/team')
 * @returns {string} - The full GitHub raw URL
 */
export const getAssetUrl = (path, prefix = '') => {
    if (!path) return '';

    // If already a full URL, return as-is
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }

    // Normalize the path
    let fullPath = path;

    // If path doesn't start with /, prepend the prefix
    if (!path.startsWith('/') && prefix) {
        fullPath = `${prefix}/${path}`;
    }

    // Remove leading slash for concatenation with BASE_URL
    if (fullPath.startsWith('/')) {
        fullPath = fullPath.slice(1);
    }

    return `${BASE_URL}/${fullPath}`;
};

/**
 * Generic fetch wrapper with caching and error handling
 */
const fetchData = async (endpoint) => {
    const cacheKey = endpoint;

    // Return cached data if available
    if (cache.has(cacheKey)) {
        return cache.get(cacheKey);
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${endpoint}: ${response.status}`);
        }
        const data = await response.json();
        cache.set(cacheKey, data);
        return data;
    } catch (error) {
        console.error(`API Error fetching ${endpoint}:`, error);
        throw error;
    }
};

/**
 * Clear the data cache (useful for forcing refresh)
 */
export const clearCache = () => {
    cache.clear();
};

// ============================================
// Data Fetching Functions
// ============================================

/**
 * Fetch events data
 */
export const getEvents = () => fetchData('/events/events.json');

/**
 * Fetch team members data
 */
export const getTeam = () => fetchData('/team/json/all_members.json');

/**
 * Fetch GSoC data
 */
export const getGsoc = () => fetchData('/gsoc/gsoc.json');

/**
 * Fetch competitions data
 */
export const getCompete = () => fetchData('/compete/compete.json');

/**
 * Fetch projects data
 */
export const getProjects = () => fetchData('/projectsData.json');

/**
 * Fetch resources data
 */
export const getResources = () => fetchData('/resources/resources.json');

// ============================================
// Preload Function
// ============================================

/**
 * Preload all essential data for the website
 * Returns a promise that resolves when all data is loaded
 * Used by the Preloader component
 */
export const preloadAllData = async (onProgress) => {
    const endpoints = [
        { name: 'Events', fn: getEvents },
        { name: 'Team', fn: getTeam },
        { name: 'GSoC', fn: getGsoc },
        { name: 'Competitions', fn: getCompete },
        { name: 'Projects', fn: getProjects },
        { name: 'Resources', fn: getResources },
    ];

    const total = endpoints.length;
    let loaded = 0;

    const results = await Promise.allSettled(
        endpoints.map(async ({ name, fn }) => {
            try {
                const data = await fn();
                loaded++;
                if (onProgress) {
                    onProgress(Math.round((loaded / total) * 100), name);
                }
                return { name, data, success: true };
            } catch (error) {
                loaded++;
                if (onProgress) {
                    onProgress(Math.round((loaded / total) * 100), name);
                }
                console.warn(`Failed to preload ${name}:`, error);
                return { name, error, success: false };
            }
        })
    );

    return results;
};

export default {
    getEvents,
    getTeam,
    getGsoc,
    getCompete,
    getProjects,
    getResources,
    getAssetUrl,
    preloadAllData,
    clearCache,
};
