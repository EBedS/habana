import { render } from 'tests/utils/react-testing-library';

import Button from './button';

describe('Button', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Button>Hello</Button>);
        expect(baseElement).toHaveTextContent('Hello');
    });
});
