import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog';

describe('Dialog', () => {
  it('renders DialogTrigger correctly', () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <button>Open Dialog</button>
        </DialogTrigger>
      </Dialog>
    );
    expect(screen.getByText('Open Dialog')).toBeInTheDocument();
  });

  it('renders DialogContent when open', () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Description</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('renders DialogTitle correctly', () => {
    render(<DialogTitle>Test Title</DialogTitle>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders DialogDescription correctly', () => {
    render(<DialogDescription>Test Description</DialogDescription>);
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders DialogFooter correctly', () => {
    const { container } = render(<DialogFooter>Footer Content</DialogFooter>);
    const footer = container.querySelector('.flex.flex-col-reverse');
    expect(footer).toBeInTheDocument();
  });

  it('applies custom className to DialogContent', () => {
    const { container } = render(
      <Dialog open>
        <DialogContent className="custom-class">Content</DialogContent>
      </Dialog>
    );
    const content = container.querySelector('.custom-class');
    expect(content).toBeInTheDocument();
  });
});
