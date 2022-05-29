import { render } from 'tests/utils/react-testing-library';

import ViewLoading from './view-loading';

describe('ViewLoading', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ViewLoading />);
        expect(baseElement).toBeTruthy();
    });
});
