/*jshint esversion: 6 */

const fs = require("fs");
const expect = require('chai').expect;
const heroprotocol = require('../');

describe('test extraction methods', function(){

    it('javascript extraction', function() {
        this.originalPlatform = process.platform;
        Object.defineProperty(process, 'platform', {
            value: 'win'
        });
        for (var i = heroprotocol.FILES.length - 1; i >= 0; i--) {
            heroprotocol.get(heroprotocol.FILES[i], 'alterac-pass.StormReplay');
        }
    });


    it('storm-replay extraction', function() {
        Object.defineProperty(process, 'platform', {
            value: this.originalPlatform
        });
        for (var i = heroprotocol.FILES.length - 1; i >= 0; i--) {
            heroprotocol.get(heroprotocol.FILES[i], 'alterac-pass.StormReplay');
        }
    });

});
