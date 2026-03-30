import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Checkbox } from '../checkbox';

describe('Checkbox', () => {
  it('renders correctly', () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('can be checked', () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('can be unchecked', () => {
    render(<Checkbox defaultChecked />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('can be disabled', () => {
    render(<Checkbox disabled />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('applies custom className', () => {
    const { container } = render(<Checkbox className="custom-class" />);
    const checkbox = container.querySelector('.custom-class');
    expect(checkbox).toBeInTheDocument();
  });

  it('handles onChange events', () => {
    const handleChange = vi.fn();
    render(<Checkbox onCheckedChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalled();
  });

  it('respects checked prop', () => {
    render(<Checkbox checked={true} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });
});
