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

			it('should accept two arguments, (invalid) charId and (invalid) battletag, and return status 404 GET',
			function(done){
				chai.request(app)
				.get('/profile')
				.query({charId:'5251941', id: 'slayeneq-186'})
				.end(function(err, res) {
					expect(res).to.have.status(404)
					done();
			})
		});

	it('should return character/item and accepts two arguements, charId and slots and return status 200 GET',
		function(done){
				chai.request(app)
				.get('/character/item')
				///character/item?CharId=52519415&slot=feet
				.query({charId:'52519415', slot:'feet'})
				.end(function(err, res) {
					expect(res).to.have.status(200)
					done();
			})
		})
	it('should accept two arguments, (invalid) charId and (invalid) slot, charId and slot and return 404  GET',
		function(done){
				chai.request(app)
				.get('/character/item')			
				.query({charId:'5251941', slot:'boot'})
				.end(function(err, res) {
					expect(res).to.have.status(200)
					done();
			})
		})
});

