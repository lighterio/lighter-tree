# lighter-tree
[![Chat](https://badges.gitter.im/chat.svg)](//gitter.im/lighterio/public)
[![Version](https://img.shields.io/npm/v/lighter-tree.svg)](//www.npmjs.com/package/lighter-tree)
[![Downloads](https://img.shields.io/npm/dm/lighter-tree.svg)](//www.npmjs.com/package/lighter-tree)
[![Build](https://img.shields.io/travis/lighterio/lighter-tree.svg)](//travis-ci.org/lighterio/lighter-tree)
[![Coverage](https://img.shields.io/coveralls/lighterio/lighter-tree/master.svg)](//coveralls.io/r/lighterio/lighter-tree)
[![Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](//www.npmjs.com/package/standard)

The `lighter-tree` module is a lightweight trie data structure implementation.
It can be used to build a structure of values, and perform a preorder traversal
over all of the non-null values (including leaves which are not tree instances).

## Installation

From your project directory, install and save as a dependency:
```bash
npm install --save lighter-tree
```

## API

### Type
The `lighter-tree` module exports a constructor that extends the Type
constructor from [`lighter-type`](//www.npmjs.com/package/lighter-type). When
a Type (such as **Tree**) is uppercased in documentation, it refers to the
constructor or its constructor properties. And when a type is lowercased (such
as **tree**), it refers to an instance and its prototype properties.

### Tree
`Tree` is a constructor which instantiates `tree` objects. In documentation,
A new tree object can be constructed simply with the `new` keyword.

```js
var Tree = require('lighter-tree')

// Create a brand new Tree object.
var tree = new Tree()
```

#### Tree.init(object)
If you would like to add tree functionality to an existing JavaScript object,
you can use the `init` method to decorate it with `Tree.prototype` methods. It
will be able to do everything a tree can do, without being an instance of Tree.

```js
var Tree = require('lighter-tree')
var fs = require('fs')

// Mix tree functionality into the filesystem object.
Tree.init(fs)
var root = fs.branch('/')
var tmp = root.branch('/tmp')
tmp.leaf('/tmp/a')
tmp.leaf('/tmp/b')
fs.each(console.log)
//> /
//> /tmp
//> /tmp/a
//> /tmp/b
```

#### tree.value
Tree instances can have an optional value, with the default being `undefined`.
There is no requirement for the type of value, although the `undefined` type is
handled in a special way, by triggering a function call when the tree's values
are iterated with the `each` method.

#### tree.children
Tree instances have an array of children, with the default being an empty array.
Entries in the children array can have any type of value. If a child is an
instance of Tree, it can be called a branch, otherwise, it is a leaf.

#### tree.leaf(value)
Adds a value into the array of children. If the value is an instance of Tree,
it will be treated as a branch, otherwise, it will be treated as a leaf.

#### tree.branch([value])
Creates a Tree instance with an optional `value`, and adds it to the
`tree` instance's children, thereby making it a branch.

#### tree.each(fn)
Iterates over a tree using preorder traversal, and calling `fn(value, isLeaf)`
for each branch and leaf that has a defined value.


## More on lighter-tree...
* [Contributing](//github.com/lighterio/lighter-tree/blob/master/CONTRIBUTING.md)
* [License (ISC)](//github.com/lighterio/lighter-tree/blob/master/LICENSE.md)
* [Change Log](//github.com/lighterio/lighter-tree/blob/master/CHANGELOG.md)
* [Roadmap](//github.com/lighterio/lighter-tree/blob/master/ROADMAP.md)
