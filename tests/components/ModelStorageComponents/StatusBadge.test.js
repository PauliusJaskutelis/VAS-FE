import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import StatusBadge from '../../../src/components/ModelStorageComponents/StatusBadge';
describe('StatusBadge', () => {
    const statuses = [
        'EXTRACTING',
        'VALIDATING',
        'ANALYZING',
        'READY',
        'ERROR',
    ];
    statuses.forEach((status) => {
        it(`renders ${status} badge correctly`, () => {
            render(_jsx(StatusBadge, { status: status }));
            expect(screen.getByText(status)).toBeInTheDocument();
        });
    });
});
