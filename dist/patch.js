(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.patch = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

Object.defineProperty(exports, '__esModule', {
    value: true
});

/**
 * patch the dom
 *
 * @param patches
 */
exports.patch = patch;

var _getChildAtIndex$getNodeIndex = require('./utils');

/**
 * Patch Class
 *
 */

var Patch = function Patch(operation) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    _classCallCheck(this, Patch);

    this.operation = operation;
    this.args = args;
};

exports.Patch = Patch;

Patch.REMOVE = 'REMOVE';
Patch.REPLACE = 'REPLACE';
Patch.INSERT = 'INSERT';
Patch.ADDATTRIBUTE = 'ADDATTRIBUTE';
Patch.REMOVEATTRIBUTE = 'REMOVEATTRIBUTE';
Patch.CHANGEATTRIBUTE = 'CHANGEATTRIBUTE';
Patch.CHANGEPROPERTY = 'CHANGEPROPERTY';
function patch(node, patches) {

    var parent = node.parentNode;

    if (parent) {

        var index = _getChildAtIndex$getNodeIndex.getNodeIndex(node);
        var frag = document.createDocumentFragment();

        frag.appendChild(node);

        patches.forEach(patchNode);

        parent.insertBefore(frag, _getChildAtIndex$getNodeIndex.getChildAtIndex(parent, index));
    } else {

        patches.forEach(patchNode);
    }

    return node;
}

function patchNode(_ref) {
    var operation = _ref.operation;
    var args = _ref.args;

    switch (operation) {

        case Patch.REMOVE:
            remove.apply(undefined, _toConsumableArray(args));
            break;

        case Patch.REPLACE:
            replace.apply(undefined, _toConsumableArray(args));
            break;

        case Patch.INSERT:
            insert.apply(undefined, _toConsumableArray(args));
            break;

        case Patch.ADDATTRIBUTE:
            setAttribute.apply(undefined, _toConsumableArray(args));
            break;

        case Patch.CHANGEATTRIBUTE:
            setAttribute.apply(undefined, _toConsumableArray(args));
            break;

        case Patch.REMOVEATTRIBUTE:
            removeAttribute.apply(undefined, _toConsumableArray(args));
            break;

        case Patch.CHANGEPROPERTY:
            changeProperty.apply(undefined, _toConsumableArray(args));
            break;
    }
}

function remove(node) {

    node.parentNode && node.parentNode.removeChild(node);
}

function replace(nodeA, nodeB) {

    node.parentNode && node.parentNode.replaceChild(nodeB, nodeA);
}

function insert(parent, node, index) {

    if (index !== -1) {
        return parent && parent.removeChild(node) && parent.insertBefore(node, _getChildAtIndex$getNodeIndex.getChildAtIndex(parent, index));
    }parent && parent.appendChild(node);
}

function setAttribute(node, attr, value) {

    node.setAttribute(attr, value);
}

function removeAttribute(node, attr) {

    node.removeAttribute(attr, value);
}

function changeProperty(node, prop, value) {

    node[prop] = value;
}
},{"./utils":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Usefull stuff
 */

exports.getChildNodes = getChildNodes;
exports.getAttributes = getAttributes;
exports.getNodeIndex = getNodeIndex;
exports.getChildAtIndex = getChildAtIndex;
exports.without = without;
exports.toJSON = toJSON;

function getChildNodes(node) {

    return Array.prototype.slice.call(node.childNodes);
}

function getAttributes(node) {

    var attrs = node.attributes;
    var attributes = {};

    if (attrs !== undefined) {

        for (var i = attrs.length - 1; i >= 0; i--) {

            attributes[attrs[i].name] = attrs[i].value;
        }
    }

    return attributes;
}

function getNodeIndex(node) {

    for (var i = 0; node = node.previousSibling; i++);

    return i;
}

function getChildAtIndex(parent, index) {

    return getChildNodes(parent)[index];
}

function without(arr, value) {

    var index = arr.indexOf(value);

    if (index > -1) arr.splice(index, 1);

    return arr;
}

function toJSON(node) {

    return {
        tagName: node.tagName,
        type: node.nodeType,
        name: node.nodeName,
        value: node.nodeValue,
        attributes: node.attributes && getAttributes(node.attributes),
        children: getChildNodes(node).map(toJSON)
    };
}
},{}]},{},[1])(1)
});