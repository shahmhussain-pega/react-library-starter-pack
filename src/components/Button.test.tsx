
import { render, screen } from '@testing-library/react';
import Button from './Button';
import { describe, it, expect } from 'vitest';

describe('Button', () => {
    it('should render the button with text', () => {
        render(<Button />);
        const heading = screen.getByText(/Main Button/i);
        expect(heading).toBeInTheDocument();
    })
});
