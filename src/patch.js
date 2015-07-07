
import {getChildAtIndex} from './utils';

/**
 * Patch Class
 *
 */
export class Patch{

    constructor(operation, ...args){

        this.operation = operation;
        this.args = args;
    }
}

Patch.REMOVE = 'REMOVE';
Patch.REPLACE = 'REPLACE';
Patch.INSERT = 'INSERT';
Patch.ADDATTRIBUTE = 'ADDATTRIBUTE';
Patch.REMOVEATTRIBUTE = 'REMOVEATTRIBUTE';
Patch.CHANGEATTRIBUTE = 'CHANGEATTRIBUTE';
Patch.CHANGEPROPERTY = 'CHANGEPROPERTY';

/**
 * patch the dom
 *
 * @param patches
 */
export function patch(patches){

    sortInserts(patches).forEach(patchNode);
}

function sortInserts(patches){

    return patches.sort(function(patchA, patchB){

        if(patchA.operation === Patch.INSERT && patchB.operation === Patch.INSERT){

            return patchA.args[1] - patchB.args[1];

        } else {

            return 0;
        }
    }).reverse()
}


function patchNode({operation, args}){

    switch(operation){

        case Patch.REMOVE:
            remove(...args);
            break;

        case Patch.REPLACE:
            replace(...args);
            break;

        case Patch.INSERT:
            insert(...args);
            break;

        case Patch.ADDATTRIBUTE:
            setAttribute(...args);
            break;

        case Patch.CHANGEATTRIBUTE:
            setAttribute(...args);
            break;

        case Patch.REMOVEATTRIBUTE:
            removeAttribute(...args);
            break;

        case Patch.CHANGEPROPERTY:
            changeProperty(...args);
            break;
    }
}


function remove(node){

    node.parentNode && node.parentNode.removeChild(node);
}

function replace(nodeA, nodeB){

    node.parentNode && node.parentNode.replaceChild(nodeB, nodeA);
}

function insert(parent, node, index){

    if(index !== -1)
        return parent && parent.removeChild(node) && parent.insertBefore(node, getChildAtIndex(parent, index));

    parent && parent.appendChild(node);
}

function setAttribute(node, attr, value){

    node.setAttribute(attr, value);
}

function removeAttribute(node, attr){

    node.removeAttribute(attr, value);
}

function changeProperty(node, prop, value){

    node[prop] = value;
}