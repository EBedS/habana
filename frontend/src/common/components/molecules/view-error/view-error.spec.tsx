import { render } from 'tests/utils/react-testing-library';

import ViewError from './view-error';

describe('ViewError', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ViewError />);
        expect(baseElement).toBeTruthy();
    });
});
