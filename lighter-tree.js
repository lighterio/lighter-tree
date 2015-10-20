'use strict'
/**
 * Tree is an extendable Type with children that can be operated upon
 * recursively.
 */
var Type = require('lighter-type')
var Tree = module.exports = Type.extend({

  /**
   * Create a tree with children and an optional value.
   *
   * @param  {Any} value  An optional value for the tree.
   */
  init: function Tree (value) {
    this.value = value
    this.children = []
  },

  /**
   * Add a new value at the end of a tree's array of children.
   *
   * @param  {Any} value  A value to add.
   */
  leaf: function leaf (value) {
    var children = this.children
    children[children.length] = value
    return value
  },

  /**
   * Add a new subtree at the end of a tree's array of children.
   *
   * @param  {Any}  value  A n optional value for the branch.
   * @return {Tree}        The resulting branch.
   */
  branch: function branch (value) {
    var branch = new Tree(value)
    var children = this.children
    children[children.length] = branch
    return branch
  },

  /**
   * Call a function on tree values using preorder traversal.
   *
   * @param  {Object}   options  Options, defaulting to Tree.defaultEachOptions.
   * @param  {Function} fn       A function to call as `fn(value, isLeaf)`
   */
  each: function each (options, fn) {
    var children = this.children
    var value = this.value
    if (typeof options === 'function') {
      fn = options
      options = Tree.defaultEachOptions
    }
    if (!options.leavesOnly) {
      if (options.allowUndefined || (value !== undefined)) {
        fn(value, false)
      }
    }
    for (var i = 0, l = children.length; i < l; i++) {
      var child = children[i]
      if (child instanceof Tree) {
        child.each(options, fn)
      } else if (!options.branchesOnly) {
        if (options.allowUndefined || (child !== undefined)) {
          fn(child, true)
        }
      }
    }
  }
})

/**
 * Default options for the `tree.each`.
 */
Tree.defaultEachOptions = {
  branchesOnly: false,
  leavesOnly: false,
  allowUndefined: false
}
