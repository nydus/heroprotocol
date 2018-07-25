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
            heroprotocol.get(heroprotocol.FILES[i], 'test/replays/towers-of-doom.StormReplay');
        }
        Object.defineProperty(process, 'platform', {
            value: this.originalPlatform
        });
    });

    if (heroprotocol.stormVersion !== undefined) {
        it('storm-replay extraction', function() {
            for (var i = heroprotocol.FILES.length - 1; i >= 0; i--) {
                heroprotocol.get(heroprotocol.FILES[i], 'test/replays/towers-of-doom.StormReplay');
            }
        });
    }

});