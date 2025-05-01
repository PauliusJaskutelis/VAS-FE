import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from '@testing-library/react';
import ModelList from '../../../src/components/ModelStorageComponents/ModelList';
const mockModels = [
    {
        id: '1',
        filename: 'model1.h5',
        inputWidth: 224,
        inputHeight: 224,
        inputShape: '224,224,3',
        colorMode: 'RGB',
        preprocessing: 'normalize',
        status: 'READY',
        storagePath: '/models/model1.h5',
    },
];
describe('ModelList', () => {
    it('shows upload button and fallback message when no models exist', () => {
        const onUploadClick = jest.fn();
        render(_jsx(ModelList, { models: [], onSelect: () => { }, onUploadClick: onUploadClick }));
        expect(screen.getByText(/No models found/i)).toBeInTheDocument();
        const button = screen.getByRole('button', { name: /upload new model/i });
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        expect(onUploadClick).toHaveBeenCalledWith(true);
    });
    it('renders a list of model cards and handles selection', () => {
        const handleSelect = jest.fn();
        render(_jsx(ModelList, { models: mockModels, onSelect: handleSelect, onUploadClick: () => { } }));
        expect(screen.getByText('model1.h5')).toBeInTheDocument();
        fireEvent.click(screen.getByText('model1.h5'));
        expect(handleSelect).toHaveBeenCalledWith(mockModels[0]);
    });
});
