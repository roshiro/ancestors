(function() {
  window.cache = {}
  var URL = 'https://athena-7.herokuapp.com/ancients.json';

  function getAncestors(search) {
    return $.get(URL, { search: search })
      .always(function(data) {
        if(search)
          cacheResultFor(search, data.ancients);
      });
  };

  function getError() {
    return $.get(URL, { error: "true" });
  };

  // Check if local cache has $searchTerm key
  function hasCachedResultFor(searchTerm) {
    return cache.hasOwnProperty(searchTerm);
  };

  // Returns local cache has $searchTerm key
  function getCachedResultFor(searchTerm) {
    console.log('retrieving cache');
    return cache[searchTerm];
  };

  // Caches the $result, with the $searchTerm as key.
  function cacheResultFor(searchTerm, result) {
    console.log('new cache')
    return cache[searchTerm] = result;
  };

  function populateGrid(data) {
    var template = $('#template').html();
    Mustache.parse(template);
    var rendered = Mustache.render(template, data);
    $('#target').html(rendered);
  };

  window.ancestors = {
    /**
     * Retrieves a list of ancients and populate the grid with it.
     */
    init: function() {
      debugger;
      getAncestors().done(populateGrid(data));
    },

    /**
     * Searches the list of ancients by name.
     * @param: String $searchTerm Term to search for
     */
    search: function(searchTerm) {
      // If search term is already cached, use it.
      if(hasCachedResultFor(searchTerm)) {
        populateGrid(getCachedResultFor(searchTerm));
      } else {
        getAncestors(searchTerm).done(populateGrid);
      }
    },

    /**
     * Shows the error in the page.
     */
    showError: function() {
      getError().done(function(data) {
        console.log(data);
      });
    }
  }
})();
