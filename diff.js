'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

/**
 * Get the difference between two dom nodes
 * @param a an Element Node
 * @param b an Element Node
 *
 * @return a patch object
 */
exports.diff = diff;

var _Patch = require('./patch');

var _getChildNodes$getAttributes$getNodeIndex$without = require('./utils');

function diff(a, b) {

    if (a.isEqualNode(b)) {
        return diffProperties(a, b).concat(diffChildren(a, b));
    }if (a.nodeType !== b.nodeType || a.tagName !== b.tagName) {
        return [new _Patch.Patch(_Patch.Patch.REPLACE, a, b)];
    }return diffAttributes(a, b).concat(diffProperties(a, b)).concat(diffChildren(a, b));
}

// diff node attributes
function diffAttributes(a, b) {

    var patches = [];

    var aAttrs = _getChildNodes$getAttributes$getNodeIndex$without.getAttributes(a);
    var bAttrs = _getChildNodes$getAttributes$getNodeIndex$without.getAttributes(b);

    Object.keys(aAttrs).forEach(function (attr) {

        if (attr in bAttrs) {

            var bValue = bAttrs[attr];

            if (bValue !== aAttrs[attr]) patches.push(new _Patch.Patch(_Patch.Patch.CHANGEATTRIBUTE, a, attr, bValue));

            delete bAttrs[attr];
        } else {

            patches.push(new _Patch.Patch(_Patch.Patch.REMOVEATTRIBUTE, a, attr));
        }

        delete aAttrs[attr];
    });

    Object.keys(bAttrs).forEach(function (attr) {

        patches.push(new _Patch.Patch(_Patch.Patch.ADDATTRIBUTE, a, attr, bAttrs[attr]));
    });

    return patches;
}

var PROPS = ['value', 'selected', 'checked', 'data'];

// diff properties
function diffProperties(a, b) {

    var patches = [];

    PROPS.forEach(function (prop) {

        var aProp = a[prop];
        var bProp = b[prop];

        if (aProp !== bProp) patches.push(new _Patch.Patch(_Patch.Patch.CHANGEPROPERTY, a, prop, bProp));
    });

    return patches;
}

function diffChildren(a, b) {

    var patches = [];

    var aChilds = _getChildNodes$getAttributes$getNodeIndex$without.getChildNodes(a);
    var bChilds = _getChildNodes$getAttributes$getNodeIndex$without.getChildNodes(b);
    var aRemaining = [].concat(aChilds);
    var bRemaining = [].concat(bChilds);
    var insertPatches = [];

    // elements with ids are special
    aChilds.forEach(function (aChild, aI) {

        if (aChild.id && b.querySelector) {

            var similar = b.querySelector('[id="' + aChild.id + '"]');

            if (similar) {

                var index = _getChildNodes$getAttributes$getNodeIndex$without.getNodeIndex(similar);

                patches = patches.concat(diff(aChild, similar));

                if (index !== aI) {
                    insertPatches.push(new _Patch.Patch(_Patch.Patch.INSERT, a, aChild, index));
                }

                _getChildNodes$getAttributes$getNodeIndex$without.without(aRemaining, aChild);
                _getChildNodes$getAttributes$getNodeIndex$without.without(bRemaining, bChilds[index]);
            }
        }
    });

    var Remaining = [].concat(bRemaining);

    aRemaining.forEach(function (aChild, aI) {

        var bChild = bRemaining[aI];

        if (bChild === undefined) return patches.push(new _Patch.Patch(_Patch.Patch.REMOVE, aChild));

        patches = patches.concat(diff(aChild, bChild));

        _getChildNodes$getAttributes$getNodeIndex$without.without(Remaining, bChild);
    });

    Remaining.forEach(function (bChild) {

        patches.push(new _Patch.Patch(_Patch.Patch.INSERT, a, bChild, -1));
    });

    return patches.concat(insertPatches);
}