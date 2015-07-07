/**
 * Usefull stuff
 */


export function getChildNodes(node){

    return Array.prototype.slice.call(node.childNodes);
}

export function getAttributes(node){

    let attrs = node.attributes;
    let attributes = {};

    if(attrs !== undefined){

        for(var i = attrs.length - 1; i >= 0; i--){

            attributes[attrs[i].name] = attrs[i].value;
        }
    }

    return attributes;
}

export function getNodeIndex(node){

    for (var i=0; (node=node.previousSibling); i++);

    return i;
}

export function getChildAtIndex(parent, index){

    return getChildNodes(parent)[index];
}


export function without(arr, value){

    let index = arr.indexOf(value);

    if(index > -1)
        arr.splice(index, 1);

    return arr;
}


export function toJSON(node){

    return {
        tagName: node.tagName,
        type: node.nodeType,
        name: node.nodeName,
        value: node.nodeValue,
        attributes: node.attributes && getAttributes(node.attributes),
        children : getChildNodes(node).map(toJSON)
    }
}