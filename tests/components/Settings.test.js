import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from '@testing-library/react';
import Settings from '../../src/components/Settings';
import { useSettings } from '../../src/context/SettingsContext';
import { useNavigate } from 'react-router-dom';
// 🧪 Mocks
jest.mock('../../src/context/SettingsContext');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));
describe('Settings', () => {
    const mockUpdateSettings = jest.fn();
    const mockNavigate = jest.fn();
    beforeEach(() => {
        useSettings.mockReturnValue({
            settings: {
                predictionCount: 3,
                confidenceThreshold: 0.5,
            },
            updateSettings: mockUpdateSettings,
        });
        useNavigate.mockReturnValue(mockNavigate);
        localStorage.clear();
    });
    it('renders when open is true', () => {
        render(_jsx(Settings, { open: true, onClose: () => { } }));
        expect(screen.getByText('Settings')).toBeInTheDocument();
    });
    it('calls updateSettings when sliders change', () => {
        render(_jsx(Settings, { open: true, onClose: () => { } }));
        const sliders = screen.getAllByRole('slider');
        fireEvent.change(sliders[0], { target: { value: 5 } });
        fireEvent.change(sliders[1], { target: { value: 0.8 } });
        expect(mockUpdateSettings).toHaveBeenCalledWith({ predictionCount: 5 });
        expect(mockUpdateSettings).toHaveBeenCalledWith({
            confidenceThreshold: 0.8,
        });
    });
    it('logs out and navigates to login', () => {
        render(_jsx(Settings, { open: true, onClose: () => { } }));
        const logoutButton = screen.getByRole('button', { name: /logout/i });
        fireEvent.click(logoutButton);
        expect(localStorage.getItem('token')).toBeNull();
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
});
