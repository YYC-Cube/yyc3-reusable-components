import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';

describe('Card', () => {
  it('renders Card correctly', () => {
    const { container } = render(<Card>Card content</Card>);
    const card = container.querySelector('.rounded-xl');
    expect(card).toBeInTheDocument();
  });

  it('renders CardHeader correctly', () => {
    const { container } = render(<CardHeader>Header content</CardHeader>);
    const header = container.querySelector('.flex.flex-col.space-y-1.5');
    expect(header).toBeInTheDocument();
  });

  it('renders CardTitle correctly', () => {
    render(<CardTitle>Card Title</CardTitle>);
    expect(screen.getByText('Card Title')).toBeInTheDocument();
  });

  it('renders CardDescription correctly', () => {
    render(<CardDescription>Card Description</CardDescription>);
    expect(screen.getByText('Card Description')).toBeInTheDocument();
  });

  it('renders CardContent correctly', () => {
    const { container } = render(<CardContent>Content</CardContent>);
    const content = container.querySelector('.pt-6');
    expect(content).toBeInTheDocument();
  });

  it('renders CardFooter correctly', () => {
    const { container } = render(<CardFooter>Footer</CardFooter>);
    const footer = container.querySelector('.flex.items-center.pt-6');
    expect(footer).toBeInTheDocument();
  });

  it('renders complete Card structure', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('applies custom className to Card', () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    const card = container.querySelector('.custom-class');
    expect(card).toBeInTheDocument();
  });
});
