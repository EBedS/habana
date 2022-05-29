import { render } from 'tests/utils/react-testing-library';

import { Anchor } from './anchor';

describe('Anchor', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Anchor href="#/">Hello</Anchor>);
        expect(baseElement).toHaveTextContent('Hello');
    });
});
