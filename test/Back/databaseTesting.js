'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../server');
//var chaiAsPromised = require('chai-as-promised');

chai.use(chaiHttp);
//chai.use(chaiAsPromised);
var should = chai.should();
var expect = chai.expect;


describe('Database calls', function(){
	it('should accept valid id on /profile?id= GET and return status 200',
	 		function(done) {
				chai.request(app)
					.get('/profile?id=slayeneq-1864')
			    .end(function( err,res) {					 					
						expect(res).to.have.status(200);			
						done();
					})
			});
				
		
	it('should accept invalid id on /profile?id= GET and return status 404',

	 		function(done){
				chai.request(app)
					.get('/profile?id=slayeneq')			
					.end(function(err, res){
						expect(res).to.have.status(404)
						done();
					})
			});
	it('should return a charater and accepts two arguments, charId and battletag, and return status 200 GET',
			function(done){
				chai.request(app)
				.get('/profile')
				.query({charId:'52519415', id: 'slayeneq-1864'})
				.end(function(err, res) {
					expect(res).to.have.status(200)
					done();
			})
		});
	xit('')
	xit('should return chatacter/item and accpets two arguements, charId and slots  GET');
})

