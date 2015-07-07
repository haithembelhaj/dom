

import {diff} from '../src/diff';
import {Patch} from '../src/patch';
import dom from '../src/dom';


describe('Diff Specs', ()=> {

    it('should detect replace node operation', ()=> {

        let patches = diff(dom.div(), dom.span());

        expect(patches[0].operation).to.equal(Patch.REPLACE);
    });

    it('should detect change attribute operation', ()=> {

        let patches = diff(dom.div({href: '#'}), dom.div({href: '/'}));

        expect(patches[0].operation).to.equal(Patch.CHANGEATTRIBUTE);
    });

    it('should detect remove attribute operation', ()=> {

        let patches = diff(dom.div({href: '#'}), dom.div());

        expect(patches[0].operation).to.equal(Patch.REMOVEATTRIBUTE);
    });

    it('should detect add attribute operation', ()=> {

        let patches = diff(dom.div(), dom.div({href: '#'}));

        expect(patches[0].operation).to.equal(Patch.ADDATTRIBUTE);
    });


    it('should detect change property operation', ()=> {

        let inputWithValue = dom.input();

        inputWithValue.value = 'test';

        let patches = diff(dom.input(), inputWithValue);

        expect(patches[0].operation).to.equal(Patch.CHANGEPROPERTY);
    });


    it('should detect children changes', ()=> {

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

        let patches = diff(tree, modTree);

        expect(patches[0].operation).to.equal(Patch.INSERT);
        expect(patches[0].args[2]).to.equal(0);

        expect(patches[1].operation).to.equal(Patch.INSERT);
        expect(patches[1].args[2]).to.equal(4);
    });


    it('should handle text nodes correctly', ()=> {

        let tree = dom.div([

            dom.text(''),
            dom.div({'class':'container'},[
               dom.div()
            ]),
            dom.text('')
        ]);

        let modTree = dom.div([

            dom.text(''),
            dom.div({'class':'container'},[
                dom.div(),
                dom.div()
            ]),
            dom.text('')
        ]);

        let patches = diff(tree, modTree);

        expect(patches[0].operation).to.equal(Patch.INSERT);
        expect(patches[0].args[2]).to.equal(-1);
    });


});