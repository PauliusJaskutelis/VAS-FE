import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import EmptyState from '../../../src/components/ModelStorageComponents/EmptyState';
describe('EmptyState', () => {
    it('renders heading and description', () => {
        render(_jsx(EmptyState, {}));
        expect(screen.getByText('No models uploaded')).toBeInTheDocument();
        expect(screen.getByText(/Start by uploading a model/i)).toBeInTheDocument();
    });
    it('renders upload icon', () => {
        render(_jsx(EmptyState, {}));
        expect(screen.getByTestId('upload-icon')).toBeInTheDocument();
    });
});
