import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Label } from '../label';

describe('Label', () => {
  it('renders correctly', () => {
    render(<Label>Test Label</Label>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('applies default styles', () => {
    const { container } = render(<Label>Default Label</Label>);
    const label = container.querySelector('label');
    expect(label).toHaveClass('text-sm', 'font-medium', 'leading-none');
  });

  it('renders children correctly', () => {
    render(<Label>Label Content</Label>);
    expect(screen.getByText('Label Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Label className="custom-class">Custom Label</Label>);
    const label = container.querySelector('.custom-class');
    expect(label).toBeInTheDocument();
  });

  it('associates with input via htmlFor', () => {
    render(
      <div>
        <Label htmlFor="test-input">Test Input</Label>
        <input id="test-input" />
      </div>
    );
    const label = screen.getByText('Test Input');
    expect(label).toHaveAttribute('for', 'test-input');
  });

  it('handles disabled state', () => {
    const { container } = render(<Label className="opacity-50">Disabled Label</Label>);
    const label = container.querySelector('label');
    expect(label).toHaveClass('opacity-50');
  });
});
