/*jshint esversion: 6 */

const fs = require("fs");
const crypto = require('crypto');
const expect = require('chai').expect;

var heroprotocol = require('../');

describe('required tests', function() {
    describe('javascript extraction', function() {
        this.timeout(6000);

        it('all files', function() {
            for (var i = heroprotocol.FILES.length - 1; i >= 0; i--) {
                heroprotocol.extractFileJS(heroprotocol.FILES[i], 'test/replays/towers-of-doom.StormReplay');
            }
        });

        it('header', function(){
            let file = heroprotocol.extractFileJS('header', 'test/replays/towers-of-doom.StormReplay');
            expect(crypto.createHash('md5').update(JSON.stringify(file)).digest("hex")).to.be.equal('b8567cf64808cc62f87a73a65e4da3f0');
        });

        it('replay.details', function(){
            let file = heroprotocol.extractFileJS('replay.details', 'test/replays/towers-of-doom.StormReplay');
            expect(crypto.createHash('md5').update(JSON.stringify(file)).digest("hex")).to.be.equal('90603aa97abcf540912178d6cc35fe20');
        });

        it('replay.initdata', function(){
            let file = heroprotocol.extractFileJS('replay.initdata', 'test/replays/towers-of-doom.StormReplay');
            expect(crypto.createHash('md5').update(JSON.stringify(file)).digest("hex")).to.be.equal('9a401eb0998f2157deb095d0df36d372');
        });

        it('replay.game.events', function(){
            let file = heroprotocol.extractFileJS('replay.game.events', 'test/replays/towers-of-doom.StormReplay');
            expect(crypto.createHash('md5').update(JSON.stringify(file)).digest("hex")).to.be.equal('e73e83c0daba8189deccb89010d58372');
        });

        it('replay.message.events', function(){
            let file = heroprotocol.extractFileJS('replay.message.events', 'test/replays/towers-of-doom.StormReplay');
            expect(crypto.createHash('md5').update(JSON.stringify(file)).digest("hex")).to.be.equal('4ac34f76e04589745a654ac0992eae47');
        });

        it('replay.tracker.events', function(){
            let file = heroprotocol.extractFileJS('replay.tracker.events', 'test/replays/towers-of-doom.StormReplay');
            expect(crypto.createHash('md5').update(JSON.stringify(file)).digest("hex")).to.be.equal('5f274a9ea723843d8335fed741c03f2b');
        });

        it('replay.attributes.events', function(){
            let file = heroprotocol.extractFileJS('replay.attributes.events', 'test/replays/towers-of-doom.StormReplay');
            expect(crypto.createHash('md5').update(JSON.stringify(file)).digest("hex")).to.be.equal('08039edd8ccafc62d272f9decfdc3d59');
        });

        it('replay.server.battlelobby', function(){
            let file = heroprotocol.extractFileJS('replay.server.battlelobby', 'test/replays/towers-of-doom.StormReplay');
            expect(crypto.createHash('md5').update(file).digest("hex")).to.be.equal('80ddc671b40d3208037ce3e77bf57d2a');
        });
    });
});

describe('optional tests', function() {
    if (typeof heroprotocol.stormVersion !== "undefined") {
        isTestRelevant = true;
    } else {
        isTestRelevant = false;
    }

    this.timeout(6000);
    it('checking if storm-replay is installed', isTestRelevant ? function() {
        expect(heroprotocol.stormVersion).to.not.be.undefined;
    } : null);

    if (isTestRelevant === true) {
        describe('compiled extraction', function() {

            it('all files', function() {
            for (var i = heroprotocol.FILES.length - 1; i >= 0; i--) {
                heroprotocol.extractFile(heroprotocol.FILES[i], 'test/replays/towers-of-doom.StormReplay');
            }
            });
            it('header', function(){
                let file = heroprotocol.extractFile('header', 'test/replays/towers-of-doom.StormReplay');
                expect(crypto.createHash('md5').update(JSON.stringify(file)).digest("hex")).to.be.equal('187bf52b5b0304ac52fa20aa568d968e');
            });

            it('replay.details', function(){
                let file = heroprotocol.extractFile('replay.details', 'test/replays/towers-of-doom.StormReplay');
                expect(crypto.createHash('md5').update(JSON.stringify(file)).digest("hex")).to.be.equal('90603aa97abcf540912178d6cc35fe20');
            });

            it('replay.initdata', function(){
                let file = heroprotocol.extractFile('replay.initdata', 'test/replays/towers-of-doom.StormReplay');
                expect(crypto.createHash('md5').update(JSON.stringify(file)).digest("hex")).to.be.equal('9a401eb0998f2157deb095d0df36d372');
            });

            it('replay.game.events', function(){
                let file = heroprotocol.extractFile('replay.game.events', 'test/replays/towers-of-doom.StormReplay');
                expect(crypto.createHash('md5').update(JSON.stringify(file)).digest("hex")).to.be.equal('e73e83c0daba8189deccb89010d58372');
            });

            it('replay.message.events', function(){
                let file = heroprotocol.extractFile('replay.message.events', 'test/replays/towers-of-doom.StormReplay');
                expect(crypto.createHash('md5').update(JSON.stringify(file)).digest("hex")).to.be.equal('4ac34f76e04589745a654ac0992eae47');
            });

            it('replay.tracker.events', function(){
                let file = heroprotocol.extractFile('replay.tracker.events', 'test/replays/towers-of-doom.StormReplay');
                expect(crypto.createHash('md5').update(JSON.stringify(file)).digest("hex")).to.be.equal('5f274a9ea723843d8335fed741c03f2b');
            });

            it('replay.attributes.events', function(){
                let file = heroprotocol.extractFile('replay.attributes.events', 'test/replays/towers-of-doom.StormReplay');
                expect(crypto.createHash('md5').update(JSON.stringify(file)).digest("hex")).to.be.equal('08039edd8ccafc62d272f9decfdc3d59');
            });

            it('replay.server.battlelobby', function(){
                let file = heroprotocol.extractFile('replay.server.battlelobby', 'test/replays/towers-of-doom.StormReplay');
                expect(crypto.createHash('md5').update(file).digest("hex")).to.be.equal('80ddc671b40d3208037ce3e77bf57d2a');
            });
        });
    }
});
