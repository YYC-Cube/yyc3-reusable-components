import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Performance } from './Performance';

describe('Performance', () => {
  const defaultProps = {
    currentLanguage: 'en',
  };

  it('renders correctly', () => {
    render(<Performance {...defaultProps} />);
    expect(screen.getByText('Performance Management')).toBeInTheDocument();
  });

  it('displays top performers', () => {
    render(<Performance {...defaultProps} />);
    expect(screen.getByText('Ahmed Al-Fahad')).toBeInTheDocument();
    expect(screen.getByText('Khalid Hassan')).toBeInTheDocument();
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
  });

  it('displays performer roles', () => {
    render(<Performance {...defaultProps} />);
    expect(screen.getByText('Operations Mgr')).toBeInTheDocument();
    expect(screen.getByText('Sales Exec')).toBeInTheDocument();
    expect(screen.getByText('Finance Mgr')).toBeInTheDocument();
  });

  it('displays performance scores', () => {
    render(<Performance {...defaultProps} />);
    expect(screen.getByText('98')).toBeInTheDocument();
    expect(screen.getByText('96')).toBeInTheDocument();
    expect(screen.getByText('95')).toBeInTheDocument();
  });

  it('displays KPI indicators', () => {
    render(<Performance {...defaultProps} />);
    expect(screen.getByText('Safety Compliance')).toBeInTheDocument();
    expect(screen.getByText('Revenue Target')).toBeInTheDocument();
    expect(screen.getByText('Audit Accuracy')).toBeInTheDocument();
  });

  it('displays performance charts', () => {
    render(<Performance {...defaultProps} />);
    expect(screen.getByText('Performance Trends')).toBeInTheDocument();
  });

  it('displays team performance', () => {
    render(<Performance {...defaultProps} />);
    expect(screen.getByText('Team Performance')).toBeInTheDocument();
  });

  it('displays department comparison', () => {
    render(<Performance {...defaultProps} />);
    expect(screen.getByText('Department Comparison')).toBeInTheDocument();
  });

  it('has add review button', () => {
    render(<Performance {...defaultProps} />);
    expect(screen.getByText('Add Review')).toBeInTheDocument();
  });

  it('has export button', () => {
    render(<Performance {...defaultProps} />);
    expect(screen.getByText('Export')).toBeInTheDocument();
  });

  it('renders in Chinese language', () => {
    render(<Performance {...defaultProps} currentLanguage="zh" />);
    expect(screen.getByText('绩效管理')).toBeInTheDocument();
  });

  it('displays performance statistics', () => {
    render(<Performance {...defaultProps} />);
    expect(screen.getByText('Average Score')).toBeInTheDocument();
    expect(screen.getByText('Top Performer')).toBeInTheDocument();
  });

  it('has filter button', () => {
    render(<Performance {...defaultProps} />);
    const filterButton = screen.getByText('Filter');
    expect(filterButton).toBeInTheDocument();
  });

  it('displays award icons', () => {
    render(<Performance {...defaultProps} />);
    const awardIcons = screen.getAllByRole('img');
    expect(awardIcons.length).toBeGreaterThan(0);
  });

  it('displays performance trends', () => {
    render(<Performance {...defaultProps} />);
    expect(screen.getByText('Monthly Trends')).toBeInTheDocument();
  });

  it('displays goal tracking', () => {
    render(<Performance {...defaultProps} />);
    expect(screen.getByText('Goal Tracking')).toBeInTheDocument();
  });
});
