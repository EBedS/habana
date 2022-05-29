import { render } from 'tests/utils/react-testing-library';

import LoadableButton from './loadable-button';

describe('LoadableButton', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<LoadableButton loading />);
        expect(baseElement).toBeTruthy();
    });
});
