/**
 * DOM
 *
 * a Templating Library that creates native DOM Nodes
 *
 * @author Haithem Bel Haj (hb@dietaikonauten.com)
 */

// All HTML5 Tags
const TAGS = ["a","text","abbr","acronym","address","applet","area","article","aside","audio","b","base","basefont","bdi","bdo","big","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","datalist","dd","del","details","dfn","dialog","dir","div","dl","dt","em","embed","fieldset","figcaption","figure","font","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noframes","noscript","object","ol","optgroup","option","output","p","param","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strike","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","tt","u","ul","var","video","wbr"];

// the global object
let dom = {};

// fragment cache
let frag = document.createDocumentFragment();

// create a HTML Tag
dom.create = function(tagname, attributes = {}, children = []){

    let elem;

    // support simpler interface
    if(Array.isArray(attributes) || typeof attributes === "string"){
        children = attributes;
        attributes = {};
    }

    // text nodes are easy
    if(tagname === "text")
        return document.createTextNode(children);

    elem = document.createElement(tagname);

    // set Attributes
    Object.keys(attributes).forEach((attr)=> elem.setAttribute(attr, attributes[attr]));

    // add children
    Array.prototype.slice.call(children).forEach((node)=>frag.appendChild(node));

    elem.appendChild(frag);

    return elem;
};

// extend dom
TAGS.forEach((tag)=> dom[tag] = createAlias(tag));

// export
export default dom;

// creates an alias
function createAlias(tagname){
    return function(attributes, children){
        return dom.create(tagname, attributes, children);
    }
}
