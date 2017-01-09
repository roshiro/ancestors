describe("Cache", function() {
  var cache = require('../app/assets/js/cache');

  afterEach(() => {
    cache.flushCache();
  });

  describe('.hasCachedResultFor', () => {
    describe('when there is no cache for the key', () => {
      it('returns false', () => {
        expect(cache.hasCachedResultFor('Alp')).toEqual(false);
      });
    });

    describe('when there is cache for the key', () => {
      it('returns true', () => {
        cache.cacheResultFor('Alp', 'test data')
        expect(cache.hasCachedResultFor('Alp')).toEqual(true);
      });
    });
  });

  describe('.getCachedResultFor', () => {
    describe('when there is no cache for the key', () => {
      it('returns nothing', () => {
        expect(cache.getCachedResultFor('some_key')).toEqual(undefined);
      });
    });

    describe('when there is cache for the key', () => {
      it('returns the cached result', () => {
        cache.cacheResultFor('some_key', 'dummy data')
        expect(cache.getCachedResultFor('some_key')).toEqual('dummy data');
      });
    });
  });

  describe('.cacheResultFor', () => {
    it('caches the result correctly', () => {
      expect(cache.getCachedResultFor('blah')).toEqual(undefined);
      cache.cacheResultFor('blah', 'test');
      expect(cache.getCachedResultFor('blah')).toEqual('test');
    });
  });

  describe('.flushCache', () => {
    it('clears cache', () => {
      cache.cacheResultFor('blah', 'test');
      cache.flushCache();
      expect(cache.hasCachedResultFor('blah')).toEqual(false);
    });
  });
});
