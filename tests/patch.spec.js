

import {toJSON} from '../src/utils';
import {diff} from '../src/diff';
import {patch} from '../src/patch';
import dom from '../src/dom';


describe('Patch Specs', ()=> {


    it('should patch a dom node', ()=>{


        let tree = dom.div([

            dom.span([dom.text('test1')]),
            dom.div({id:'test1'}),
            dom.div({id: 'test2'}),
            dom.span()
        ]);

        let modTree = dom.div([

            dom.div({id:'test1'}),
            dom.span([dom.text('test2')]),
            dom.span(),
            dom.span(),
            dom.div({id: 'test2'}),
            dom.span()
        ]);

        let patches = diff(tree, modTree.cloneNode(true));

        patch(tree, patches);

        expect(tree.isEqualNode(modTree)).to.be.true;
    });
});