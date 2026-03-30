import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Dashboard } from './Dashboard';

describe('Dashboard', () => {
  it('renders correctly', () => {
    render(<Dashboard />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('displays key metrics', () => {
    render(<Dashboard />);
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('Active Users')).toBeInTheDocument();
    expect(screen.getByText('Conversion Rate')).toBeInTheDocument();
  });

  it('shows charts and graphs', () => {
    render(<Dashboard />);
    expect(screen.getByTestId('revenue-chart')).toBeInTheDocument();
    expect(screen.getByTestId('user-activity-chart')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Dashboard className="custom-class" />);
    const dashboard = container.querySelector('.custom-class');
    expect(dashboard).toBeInTheDocument();
  });

  it('handles data loading state', () => {
    render(<Dashboard loading />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error state', () => {
    render(<Dashboard error="Failed to load data" />);
    expect(screen.getByText('Failed to load data')).toBeInTheDocument();
  });
});
