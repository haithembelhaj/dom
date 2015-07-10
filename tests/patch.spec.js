

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


    it('should patch an attached dom node', ()=>{


        let tree = dom.ul([

            dom.li({id:'1'}, [dom.text('test1')]),
            dom.li({id:'2'}, [dom.text('test2')]),
            dom.li({id:'3'}, [dom.text('test3')]),
            dom.li({id:'4'}, [dom.text('test4')]),
            dom.li({id:'5'}, [dom.text('test5')]),
            dom.li({id:'6'}, [dom.text('test6')])
        ]);

        let modTree = dom.ul([

            dom.li({id:'2'}, [dom.text('test2')]),
            dom.li({id:'1'}, [dom.text('test1')]),
            dom.li({id:'5'}, [dom.text('test5')]),
            dom.li({id:'4'}, [dom.text('test4')]),
            dom.li({id:'3'}, [dom.text('test3')]),
            dom.li({id:'7'}, [dom.text('test7')]),
            dom.li({id:'8'}, [dom.text('test8')]),
            dom.li({id:'6'}, [dom.text('test6')])
        ]);

        document.body.appendChild(tree);

        let patches = diff(tree, modTree.cloneNode(true));

        patch(tree, patches);

        expect(tree.isEqualNode(modTree)).to.be.true;
    });
});