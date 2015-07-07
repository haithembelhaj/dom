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