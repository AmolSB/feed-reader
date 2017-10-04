/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */
 $(function() {

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
         it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test ensures that each feed has a URL defined
         * and that the URL is not empty.
         */
         it('should have a url', function() {
            for(var feed of allFeeds) {
                expect(feed.url.trim()).toBeDefined();
                expect(feed.url.trim().length).not.toBe(0);
            }
        });

        /* This test ensures that each feed has a name defined
         * and that the name is not empty.
         */
         it('should have a name', function() {
            for(var feed of allFeeds) {
                expect(feed.name.trim()).toBeDefined();
                expect(feed.name.trim().length).not.toBe(0);
            }
        });
     });


    /* A new test suite named "The menu" */
    describe('The menu', function() {
        /* This test ensures that ensures the menu element is
         * hidden by default.
         */
         it('shuold be hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* This test ensures that the menu changes
          * visibility when the menu icon is clicked. 
          */
          it('should change visibility on click', function() {

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidder')).toBe(false);

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
      });

    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done){
            loadFeed(0, done);
         });

         it('should have at least one entry', function() {
            expect($('.feed .entry').length).not.toBe(0);
         });
    });

         /* TAnew test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var feedOne, feedTwo;
        /* This test ensures that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * loadFeed() is asynchronous.
         */
         
         beforeEach(function(done){
            loadFeed(0, function() {
                feedOne = $('.feed').html();
                done();
            });
         });

         it('should change the content', function(done) {
            loadFeed(1, function() {
                feedTwo = $('.feed').html();
                expect(feedTwo).not.toEqual(feedOne);
                done();
            }); 
         });
    });
}());
