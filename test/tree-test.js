'use strict'
/* global describe it */
var Type = require('lighter-type')
var Tree = require('../lighter-tree')
var is = global.is || require('exam/lib/is')
var mock = global.mock || require('exam/lib/mock')

describe('Tree', function () {
  it('is a function', function () {
    is.function(Tree)
  })

  it('extends Type', function () {
    is(Tree.extend, Type.extend)
  })

  describe('constructor', function () {
    it('instantiates a tree', function () {
      var o = new Tree()
      is.object(o)
      is.instanceOf(o, Tree)
    })

    it('creates a children array', function () {
      var o = new Tree()
      is.array(o.children)
      is(o.children.length, 0)
    })

    it('defaults to an undefined value', function () {
      var o = new Tree()
      is.undefined(o.value)
    })

    it('accepts a defined value', function () {
      var o = new Tree(1)
      is(o.value, 1)
    })

    it('is callable from Tree.init', function () {
      var o = {}
      Tree.init(o)
      is.object(o)
      is.function(o.branch)
      is.notInstanceOf(o, Tree)
    })
  })

  describe('.leaf', function () {
    it('adds a child', function () {
      var o = new Tree()
      is(o.children.length, 0)
      o.leaf('hello')
      is(o.children.length, 1)
      is(o.children[0], 'hello')
    })

    it('returns the leafed child', function () {
      var o = new Tree()
      var v = o.leaf('hello')
      is(v, 'hello')
    })
  })

  describe('.branch', function () {
    it('adds a branch', function () {
      var o = new Tree()
      is(o.children.length, 0)
      o.branch()
      is(o.children.length, 1)
      is.instanceOf(o.children[0], Tree)
    })

    it('returns the new branch', function () {
      var o = new Tree()
      var b = o.branch(1)
      is(o.children[0], b)
    })

    it('can go deep', function () {
      var a = new Tree(0)
      var b = a.branch(1)
      var c = b.branch(2)
      var d = c.branch(3)
      var e = d.branch(4)
      is.instanceOf(e, Tree)
      var f = mock.concat()
      a.each(f)
      is(f.value, '01234')
    })
  })

  describe('.each', function () {
    it('ignores undefined values', function () {
      var o = new Tree()
      o.leaf()
      o.each(function () {
        is.fail('should not get here')
      })
    })

    it('works on an empty tree', function () {
      var o = new Tree()
      o.each(function () {
        is.fail('should not get here')
      })
    })

    it('works on a tree with a value', function (done) {
      var o = new Tree(1)
      o.each(function (value) {
        is(value, 1)
        done()
      })
    })

    it('works on a tree with one leaf', function (done) {
      var o = new Tree()
      o.leaf(2)
      o.each(function (value) {
        is(value, 2)
        done()
      })
    })

    it('works on a tree with one empty branch', function () {
      var o = new Tree()
      o.branch()
      o.each(function (value) {
        is.fail('should not get here')
      })
    })

    it('works on a tree with two leaves', function () {
      var o = new Tree()
      o.leaf('a')
      o.leaf('b')
      var f = mock.concat()
      o.each(f)
      is(f.value, 'ab')
    })

    it('works on a tree that is a 2-level binary tree', function () {
      var o = new Tree()
      var l = o.branch()
      l.leaf('a')
      l.leaf('b')
      var r = o.branch()
      r.leaf('c')
      r.leaf('d')
      var f = mock.concat()
      o.each(f)
      is(f.value, 'abcd')
    })

    it('passes value and isLeaf arguments', function () {
      var o = new Tree()
      var b = o.branch('branch')
      b.leaf('leaf')
      var f = mock.args()
      o.each(f)
      is.same(f.value, [{'0': 'branch', '1': false}, {'0': 'leaf', '1': true}])
    })

    describe('options.allowUndefined', function () {
      it('turns off undefined value filtering', function () {
        var o = new Tree()
        var n = 0
        o.each({allowUndefined: 1}, function (value, isLeaf) {
          is(value, undefined)
          is(isLeaf, false)
          n++
        })
        is(n, 1)
      })
    })

    describe('options.branchesOnly', function () {
      it('filters out leaf value callbacks', function () {
        var o = new Tree()
        o.branch('branch')
        o.leaf('leaf')
        o.each({branchesOnly: 1}, function (value, isLeaf) {
          is(value, 'branch')
          is(isLeaf, false)
        })
      })
    })

    describe('options.leavesOnly', function () {
      it('filters out branch value callbacks', function () {
        var o = new Tree()
        o.branch('branch')
        o.leaf('leaf')
        o.each({leavesOnly: 1}, function (value, isLeaf) {
          is(value, 'leaf')
          is(isLeaf, true)
        })
      })
    })
  })
})
