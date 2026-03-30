import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Input } from '../input';

describe('Input', () => {
  it('renders correctly', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('applies default styles', () => {
    const { container } = render(<Input />);
    const input = container.querySelector('input');
    expect(input).toHaveClass('flex', 'h-9', 'w-full');
  });

  it('accepts placeholder text', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('accepts value prop', () => {
    render(<Input value="Test value" readOnly />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Test value');
  });

  it('handles onChange events', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('can be disabled', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('applies custom className', () => {
    const { container } = render(<Input className="custom-class" />);
    const input = container.querySelector('input');
    expect(input).toHaveClass('custom-class');
  });

  it('accepts type prop', () => {
    render(<Input type="password" />);
    const input = document.querySelector('input[type="password"]');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('applies different variants', () => {
    const { container } = render(<Input className="border-transparent" />);
    const input = container.querySelector('input');
    expect(input).toHaveClass('border-transparent');
  });
});
