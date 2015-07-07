/**
 * DOM
 *
 * a Templating Library that creates native DOM Nodes
 *
 * @author Haithem Bel Haj (hb@dietaikonauten.com)
 */

// All HTML5 Tags
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
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
//# sourceMappingURL=data:application/json;base64,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SUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7ZUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7S0FBQSxDQUFDLENBQUM7OztBQUdwRixTQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTtlQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO0tBQUEsQ0FBQyxDQUFDOztBQUU3RSxRQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUV2QixXQUFPLElBQUksQ0FBQztDQUNmLENBQUM7OztBQUdGLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHO1dBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUM7Q0FBQSxDQUFDLENBQUM7OztxQkFHbkMsR0FBRzs7O0FBR2xCLFNBQVMsV0FBVyxDQUFDLE9BQU8sRUFBQztBQUN6QixXQUFPLFVBQVMsVUFBVSxFQUFFLFFBQVEsRUFBQztBQUNqQyxlQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztLQUNwRCxDQUFBO0NBQ0oiLCJmaWxlIjoiZG9tLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBET01cbiAqXG4gKiBhIFRlbXBsYXRpbmcgTGlicmFyeSB0aGF0IGNyZWF0ZXMgbmF0aXZlIERPTSBOb2Rlc1xuICpcbiAqIEBhdXRob3IgSGFpdGhlbSBCZWwgSGFqIChoYkBkaWV0YWlrb25hdXRlbi5jb20pXG4gKi9cblxuLy8gQWxsIEhUTUw1IFRhZ3NcbmNvbnN0IFRBR1MgPSBbXCJhXCIsXCJ0ZXh0XCIsXCJhYmJyXCIsXCJhY3JvbnltXCIsXCJhZGRyZXNzXCIsXCJhcHBsZXRcIixcImFyZWFcIixcImFydGljbGVcIixcImFzaWRlXCIsXCJhdWRpb1wiLFwiYlwiLFwiYmFzZVwiLFwiYmFzZWZvbnRcIixcImJkaVwiLFwiYmRvXCIsXCJiaWdcIixcImJsb2NrcXVvdGVcIixcImJvZHlcIixcImJyXCIsXCJidXR0b25cIixcImNhbnZhc1wiLFwiY2FwdGlvblwiLFwiY2VudGVyXCIsXCJjaXRlXCIsXCJjb2RlXCIsXCJjb2xcIixcImNvbGdyb3VwXCIsXCJkYXRhbGlzdFwiLFwiZGRcIixcImRlbFwiLFwiZGV0YWlsc1wiLFwiZGZuXCIsXCJkaWFsb2dcIixcImRpclwiLFwiZGl2XCIsXCJkbFwiLFwiZHRcIixcImVtXCIsXCJlbWJlZFwiLFwiZmllbGRzZXRcIixcImZpZ2NhcHRpb25cIixcImZpZ3VyZVwiLFwiZm9udFwiLFwiZm9vdGVyXCIsXCJmb3JtXCIsXCJmcmFtZVwiLFwiZnJhbWVzZXRcIixcImgxXCIsXCJoMlwiLFwiaDNcIixcImg0XCIsXCJoNVwiLFwiaDZcIixcImhlYWRcIixcImhlYWRlclwiLFwiaHJcIixcImh0bWxcIixcImlcIixcImlmcmFtZVwiLFwiaW1nXCIsXCJpbnB1dFwiLFwiaW5zXCIsXCJrYmRcIixcImtleWdlblwiLFwibGFiZWxcIixcImxlZ2VuZFwiLFwibGlcIixcImxpbmtcIixcIm1haW5cIixcIm1hcFwiLFwibWFya1wiLFwibWVudVwiLFwibWVudWl0ZW1cIixcIm1ldGFcIixcIm1ldGVyXCIsXCJuYXZcIixcIm5vZnJhbWVzXCIsXCJub3NjcmlwdFwiLFwib2JqZWN0XCIsXCJvbFwiLFwib3B0Z3JvdXBcIixcIm9wdGlvblwiLFwib3V0cHV0XCIsXCJwXCIsXCJwYXJhbVwiLFwicHJlXCIsXCJwcm9ncmVzc1wiLFwicVwiLFwicnBcIixcInJ0XCIsXCJydWJ5XCIsXCJzXCIsXCJzYW1wXCIsXCJzY3JpcHRcIixcInNlY3Rpb25cIixcInNlbGVjdFwiLFwic21hbGxcIixcInNvdXJjZVwiLFwic3BhblwiLFwic3RyaWtlXCIsXCJzdHJvbmdcIixcInN0eWxlXCIsXCJzdWJcIixcInN1bW1hcnlcIixcInN1cFwiLFwidGFibGVcIixcInRib2R5XCIsXCJ0ZFwiLFwidGV4dGFyZWFcIixcInRmb290XCIsXCJ0aFwiLFwidGhlYWRcIixcInRpbWVcIixcInRpdGxlXCIsXCJ0clwiLFwidHJhY2tcIixcInR0XCIsXCJ1XCIsXCJ1bFwiLFwidmFyXCIsXCJ2aWRlb1wiLFwid2JyXCJdO1xuXG4vLyB0aGUgZ2xvYmFsIG9iamVjdFxubGV0IGRvbSA9IHt9O1xuXG4vLyBmcmFnbWVudCBjYWNoZVxubGV0IGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbi8vIGNyZWF0ZSBhIEhUTUwgVGFnXG5kb20uY3JlYXRlID0gZnVuY3Rpb24odGFnbmFtZSwgYXR0cmlidXRlcyA9IHt9LCBjaGlsZHJlbiA9IFtdKXtcblxuICAgIGxldCBlbGVtO1xuXG4gICAgLy8gc3VwcG9ydCBzaW1wbGVyIGludGVyZmFjZVxuICAgIGlmKEFycmF5LmlzQXJyYXkoYXR0cmlidXRlcykgfHwgdHlwZW9mIGF0dHJpYnV0ZXMgPT09IFwic3RyaW5nXCIpe1xuICAgICAgICBjaGlsZHJlbiA9IGF0dHJpYnV0ZXM7XG4gICAgICAgIGF0dHJpYnV0ZXMgPSB7fTtcbiAgICB9XG5cbiAgICAvLyB0ZXh0IG5vZGVzIGFyZSBlYXN5XG4gICAgaWYodGFnbmFtZSA9PT0gXCJ0ZXh0XCIpXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZHJlbik7XG5cbiAgICBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWduYW1lKTtcblxuICAgIC8vIHNldCBBdHRyaWJ1dGVzXG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaCgoYXR0cik9PiBlbGVtLnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyaWJ1dGVzW2F0dHJdKSk7XG5cbiAgICAvLyBhZGQgY2hpbGRyZW5cbiAgICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChjaGlsZHJlbikuZm9yRWFjaCgobm9kZSk9PmZyYWcuYXBwZW5kQ2hpbGQobm9kZSkpO1xuXG4gICAgZWxlbS5hcHBlbmRDaGlsZChmcmFnKTtcblxuICAgIHJldHVybiBlbGVtO1xufTtcblxuLy8gZXh0ZW5kIGRvbVxuVEFHUy5mb3JFYWNoKCh0YWcpPT4gZG9tW3RhZ10gPSBjcmVhdGVBbGlhcyh0YWcpKTtcblxuLy8gZXhwb3J0XG5leHBvcnQgZGVmYXVsdCBkb207XG5cbi8vIGNyZWF0ZXMgYW4gYWxpYXNcbmZ1bmN0aW9uIGNyZWF0ZUFsaWFzKHRhZ25hbWUpe1xuICAgIHJldHVybiBmdW5jdGlvbihhdHRyaWJ1dGVzLCBjaGlsZHJlbil7XG4gICAgICAgIHJldHVybiBkb20uY3JlYXRlKHRhZ25hbWUsIGF0dHJpYnV0ZXMsIGNoaWxkcmVuKTtcbiAgICB9XG59XG4iXX0=