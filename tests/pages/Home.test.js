import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../../src/pages/Home';
import { useNavigate } from 'react-router-dom';
// 🧪 Mocks
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));
jest.mock('../../src/components/Navigation', () => (props) => (_jsxs("div", { children: [_jsx("div", { children: "Mock Navigation" }), _jsx("button", { onClick: props.onSettingsClick, children: "Open Settings" })] })));
jest.mock('../../src/components/Settings', () => (props) => props.open ? (_jsxs("div", { children: [_jsx("div", { children: "Settings Panel" }), _jsx("button", { onClick: props.onClose, children: "Close Settings" })] })) : null);
jest.mock('../../src/components/ImageUploader', () => (props) => (_jsxs("div", { children: [_jsx("div", { children: "Uploader" }), _jsx("button", { onClick: () => props.onUploadSuccess({
                results: ['label1', 'label2'],
                imageBase64: 'base64string',
            }), children: "Simulate Upload" })] })));
describe('Home Page', () => {
    const mockNavigate = jest.fn();
    beforeEach(() => {
        useNavigate.mockReturnValue(mockNavigate);
    });
    it('renders Navigation and Uploader', () => {
        render(_jsx(Home, {}));
        expect(screen.getByText('Mock Navigation')).toBeInTheDocument();
        expect(screen.getByText('Uploader')).toBeInTheDocument();
    });
    it('opens settings when nav button is clicked', () => {
        render(_jsx(Home, {}));
        fireEvent.click(screen.getByText('Open Settings'));
        expect(screen.getByText('Settings Panel')).toBeInTheDocument();
    });
    it('closes settings when close is clicked', () => {
        render(_jsx(Home, {}));
        fireEvent.click(screen.getByText('Open Settings'));
        fireEvent.click(screen.getByText('Close Settings'));
        expect(screen.queryByText('Settings Panel')).not.toBeInTheDocument();
    });
    it('navigates to results on upload success', () => {
        render(_jsx(Home, {}));
        fireEvent.click(screen.getByText('Simulate Upload'));
        expect(mockNavigate).toHaveBeenCalledWith('/results', {
            state: {
                results: ['label1', 'label2'],
                imagePreview: 'base64string',
            },
        });
    });
});
