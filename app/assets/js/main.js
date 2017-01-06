(function() {
  window.cache = {}
  const URL = 'https://athena-7.herokuapp.com/ancients.json';

  var getAncients = (search) => {
    return $.get(URL, { search: search })
      .always((data) => {
        if(search)
          cacheResultFor(search, data.ancients);
      });
  },

  getError = () => {
    return $.get(URL, { error: "true" });
  },

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

  populateGrid = (data) => {
    let template = $('#template').html(),
        rendered = Mustache.render(template, formatAncestorList(data));

    $('#target').html(rendered);
  },

  attachEvents = () => {
    // Attach click event to search button
    $('#search-btn').on('click', (e) => {
      e.preventDefault();
      let searchTerm = $('#search-term').val();
      window.ancients.search(searchTerm);
    });
    // Attach click event to show error link
    $('#show-error').on('click', (e) => {
      window.ancients.showError();
    });
  };

  function formatAncestorList(list){
    return (list.ancients || list).map(function(item) {
      return {
        name: item.name.toUpperCase(),
        superpower: item.superpower.toUpperCase(),
        end_of_an_era: new Date(item.end_of_an_era).toLocaleDateString()
      }
    });
  };

  window.ancients = {
    /**
     * Retrieves a list of ancients and populate the grid with it.
     */
    init: () => {
      attachEvents();
      getAncients().done(populateGrid);
    },

    /**
     * Searches the list of ancients by name.
     * @param: String $searchTerm Term to search for
     */
    search: (searchTerm) => {
      // If search term is already cached, use it.
      if(hasCachedResultFor(searchTerm)) {
        populateGrid(getCachedResultFor(searchTerm));
      } else {
        getAncients(searchTerm).done(populateGrid);
      }
    },

    /**
     * Shows the error in the page.
     */
    showError: () => {
      getError().fail((data) => {
        let parsedResponse = JSON.parse(data.responseText);
        $('#error-msg').html(parsedResponse.error);
      });
    }
  }
})();
