
import {Patch} from './patch';
import {getChildNodes,getAttributes, getNodeIndex, without} from './utils';


/**
 * Get the difference between two dom nodes
 * @param a an Element Node
 * @param b an Element Node
 *
 * @return a patch object
 */
export function diff(a,b){

    if(a.isEqualNode(b))
        return diffProperties(a,b).concat(diffChildren(a,b));

    if(a.tagName !== b.tagName)
        return [new Patch(Patch.REPLACE, a, b)];


    return diffAttributes(a,b).concat(diffProperties(a,b)).concat(diffChildren(a,b));
}


// diff node attributes
function diffAttributes(a, b){

    let patches = [];

    let aAttrs = getAttributes(a);
    let bAttrs = getAttributes(b);


    Object.keys(aAttrs).forEach(function(attr){

        if(attr in bAttrs){

            patches.push(new Patch(Patch.CHANGEATTRIBUTE, a, attr, bAttrs[attr]));

            delete bAttrs[attr];

        } else{

            patches.push(new Patch(Patch.REMOVEATTRIBUTE, a, attr));
        }

        delete aAttrs[attr];
    });

    Object.keys(bAttrs).forEach(function(attr){

        patches.push(new Patch(Patch.ADDATTRIBUTE, a, attr, bAttrs[attr]))
    });

    return patches;
}


const PROPS = ['value', 'selected', 'checked', 'data'];

// diff properties
function diffProperties(a, b){

    let patches = [];

    PROPS.forEach(function(prop){

        let aProp = a[prop];
        let bProp = b[prop];

        if(aProp !== bProp)
            patches.push(new Patch(Patch.CHANGEPROPERTY, a, prop, bProp));

    });

    return patches;
}


function diffChildren(a, b){

    let patches = [];

    let aChilds = getChildNodes(a);
    let bChilds = getChildNodes(b);
    let aRemaining = [].concat(aChilds);
    let bRemaining = [].concat(bChilds);

    // elements with ids are special
    aChilds.forEach(function(aChild ,aI){

        if(aChild.id && b.querySelector){

            let similar = b.querySelector('#'+aChild.id);

            if(similar) {

                let index = getNodeIndex(similar);

                patches = patches.concat(diff(aChild, similar));

                if (index !== aI) {
                    patches.push(new Patch(Patch.INSERT, a, aChild, index))
                }

                without(aRemaining, aChild);
                without(bRemaining, bChilds[index]);
            }
        }

    });

    aRemaining.forEach(function(aChild ,aI){

        let bChild = bRemaining[aI];

        if(bChild === undefined)
            return patches.push(new Patch(Patch.REMOVE, aChild));

        patches = patches.concat(diff(aChild, bChild));

        without(bRemaining, bChild);
    });

    bRemaining.forEach(function(bChild){

        patches.push(new Patch(Patch.INSERT, a, bChild, -1));
    });

    return patches;
}