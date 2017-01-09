// Variable that will store the cache in memory
let cache = {},

// Check if local cache has $searchTerm key
hasCachedResultFor = (searchTerm) => {
  return cache.hasOwnProperty(searchTerm);
},

// Returns local cache has $searchTerm key
getCachedResultFor = (searchTerm) => {
  console.log('accessing cache');
  return cache[searchTerm];
},

// Caches the $result, with the $searchTerm as key.
cacheResultFor = (searchTerm, result) => {
  console.log('caching result')
  return cache[searchTerm] = result;
},

flushCache = () => {
  cache = {};
};

module.exports = {
  hasCachedResultFor: hasCachedResultFor,
  getCachedResultFor: getCachedResultFor,
  cacheResultFor: cacheResultFor,
  flushCache: flushCache
}
