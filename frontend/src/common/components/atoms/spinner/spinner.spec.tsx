import { render } from 'tests/utils/react-testing-library';

import Spinner from './spinner';

describe('Spinner', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Spinner />);
        expect(baseElement).toBeTruthy();
    });
});
