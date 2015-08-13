(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.dom = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * DOM
 *
 * a Templating Library that creates native DOM Nodes
 *
 * @author Haithem Bel Haj (hb@dietaikonauten.com)
 */

// All HTML5 Tags
var TAGS = ["a", "text", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio", "b", "base", "basefont", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "datalist", "dd", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noframes", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"];

// the global object
var dom = {};

// fragment cache
var frag = document.createDocumentFragment();

// create a HTML Tag
dom.create = function (tagname) {
    var attributes = arguments[1] === undefined ? {} : arguments[1];
    var children = arguments[2] === undefined ? [] : arguments[2];

    var elem = undefined;

    // support simpler interface
    if (Array.isArray(attributes) || typeof attributes === "string") {
        children = attributes;
        attributes = {};
    }

    // text nodes are easy
    if (tagname === "text") return document.createTextNode(children);

    elem = document.createElement(tagname);

    // set Attributes
    Object.keys(attributes).forEach(function (attr) {
        return elem.setAttribute(attr, attributes[attr]);
    });

    // add children
    Array.prototype.slice.call(children).forEach(function (node) {
        return frag.appendChild(node);
    });

    elem.appendChild(frag);

    return elem;
};

// extend dom
TAGS.forEach(function (tag) {
    return dom[tag] = createAlias(tag);
});

// export
exports["default"] = dom;

// creates an alias
function createAlias(tagname) {
    return function (attributes, children) {
        return dom.create(tagname, attributes, children);
    };
}
module.exports = exports["default"];
},{}]},{},[1])(1)
});