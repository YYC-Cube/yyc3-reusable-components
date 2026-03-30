import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Switch } from './switch';

describe('Switch', () => {
  it('renders correctly', () => {
    render(<Switch />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
  });

  it('can be checked', () => {
    render(<Switch />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).not.toBeChecked();
    fireEvent.click(switchElement);
    expect(switchElement).toBeChecked();
  });

  it('can be unchecked', () => {
    render(<Switch defaultChecked />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeChecked();
    fireEvent.click(switchElement);
    expect(switchElement).not.toBeChecked();
  });

  it('can be disabled', () => {
    render(<Switch disabled />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeDisabled();
  });

  it('applies custom className', () => {
    const { container } = render(<Switch className="custom-class" />);
    const switchElement = container.querySelector('.custom-class');
    expect(switchElement).toBeInTheDocument();
  });

  it('handles onChange events', () => {
    const handleChange = vi.fn();
    render(<Switch onCheckedChange={handleChange} />);
    const switchElement = screen.getByRole('switch');
    fireEvent.click(switchElement);
    expect(handleChange).toHaveBeenCalled();
  });

  it('respects checked prop', () => {
    render(<Switch checked={true} />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeChecked();
  });

  it('handles controlled state', () => {
    const { rerender } = render(<Switch checked={false} />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).not.toBeChecked();

    rerender(<Switch checked={true} />);
    expect(switchElement).toBeChecked();
  });
});
