import Toast from '../src/components/Toast';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('Toast',()=>{

    test('测试loading', ()=>{
        act(()=>{
            Toast.loading("测试loading",0);
        });

        console.log(document.body);

        expect(screen.findByText('测试loading')).toBeInTheDocument();
    });

});