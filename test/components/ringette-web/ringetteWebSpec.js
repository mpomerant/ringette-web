define(['components/ringette-web/ringetteWeb'], function(Web) {

  var context = {
    props: function() {
      return Promise.resolve({})
    }()
  }


  describe('test/components/ringette-web/ringetteWebSpec.js', function() {


    it('should initialize a name', function() {
      var testWeb = new Web (context);
      expect(testWeb).toBeDefined();
      expect(testWeb.name()).toEqual('web');
    });



  });

});
