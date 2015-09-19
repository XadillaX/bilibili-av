/**
 * XadillaX created at 2015-09-20 00:00:10 With ♥
 *
 * Copyright (c) 2015 Souche.com, all rights
 * reserved.
 */
var should = require("should");
var bilibili = require("../");
var AV = bilibili.AV;

describe("# parse cid and page name", function() {
    it("should parse av628659-1's cid", function(done) {
        var av = new AV(628659);
        av.getCid(function(err, cid) {
            should(err).be.eql(undefined);
            cid.should.be.eql(925930);
            done();
        });
    });

    it("should parse av2674489-2's cid", function(done) {
        var av = new AV(2674489, 2);
        av.getCid(function(err, cid) {
            should(err).be.eql(undefined);
            cid.should.be.eql(4188084);
            done();
        });
    });

    it("should parse av2674489-13's page name", function(done) {
        var av = new AV(2674489, 13);
        av.getPageName(function(err, pageName) {
            should(err).be.eql(undefined);
            pageName.should.be.eql("《欲望门》");
            done();
        });
    });

    it("should get no such page av628659-2", function(done) {
        var av = new AV(628659, 2);
        av.getCid(function(err) {
            err.message.should.be.eql("No such page in 628659");
            done();
        });
    });

    it("should get no such av2674090", function(done) {
        var av = new AV(2674090, 2);
        av.getCid(function(err) {
            err.message.should.be.eql("No such aid 2674090");
            done();
        });
    });

    it("should timeout", function(done) {
        var av = new AV(2674090, {
            timeout: 10
        });

        av.getCid(function(err) {
            err.message.indexOf("timeout").should.not.be.eql(-1);
            done();
        });

    });
});
