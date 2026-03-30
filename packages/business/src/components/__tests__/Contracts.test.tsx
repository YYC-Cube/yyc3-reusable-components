import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Contracts } from './Contracts';

describe('Contracts', () => {
  const defaultProps = {
    currentLanguage: 'en',
  };

  it('renders correctly', () => {
    render(<Contracts {...defaultProps} />);
    expect(screen.getByText('Contract Management')).toBeInTheDocument();
  });

  it('displays contract list', () => {
    render(<Contracts {...defaultProps} />);
    expect(screen.getByText('Contract List')).toBeInTheDocument();
  });

  it('displays contract numbers', () => {
    render(<Contracts {...defaultProps} />);
    expect(screen.getByText(/CTR-\d+/)).toBeInTheDocument();
  });

  it('displays contract titles', () => {
    render(<Contracts {...defaultProps} />);
    expect(screen.getByText(/Contract/)).toBeInTheDocument();
  });

  it('displays partners', () => {
    render(<Contracts {...defaultProps} />);
    expect(screen.getByText(/Partner/)).toBeInTheDocument();
  });

  it('displays contract types', () => {
    render(<Contracts {...defaultProps} />);
    expect(screen.getByText(/Type/)).toBeInTheDocument();
  });

  it('displays contract amounts', () => {
    render(<Contracts {...defaultProps} />);
    expect(screen.getByText(/Amount/)).toBeInTheDocument();
  });

  it('displays contract dates', () => {
    render(<Contracts {...defaultProps} />);
    expect(screen.getByText(/Start Date|End Date/)).toBeInTheDocument();
  });

  it('displays contract status', () => {
    render(<Contracts {...defaultProps} />);
    expect(screen.getByText('Draft')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Expired')).toBeInTheDocument();
  });

  it('has add contract button', () => {
    render(<Contracts {...defaultProps} />);
    expect(screen.getByText('Add Contract')).toBeInTheDocument();
  });

  it('handles search input', () => {
    render(<Contracts {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText('Search contracts...');
    fireEvent.change(searchInput, { target: { value: 'Steel' } });
    expect(searchInput).toHaveValue('Steel');
  });

  it('has export button', () => {
    render(<Contracts {...defaultProps} />);
    expect(screen.getByText('Export')).toBeInTheDocument();
  });

  it('renders in Chinese language', () => {
    render(<Contracts {...defaultProps} currentLanguage="zh" />);
    expect(screen.getByText('合同管理')).toBeInTheDocument();
  });

  it('displays contract templates', () => {
    render(<Contracts {...defaultProps} />);
    expect(screen.getByText('Templates')).toBeInTheDocument();
  });

  it('displays contract analytics', () => {
    render(<Contracts {...defaultProps} />);
    expect(screen.getByText('Analytics')).toBeInTheDocument();
  });

  it('has filter button', () => {
    render(<Contracts {...defaultProps} />);
    const filterButton = screen.getByText('Filter');
    expect(filterButton).toBeInTheDocument();
  });

  it('displays contract overview', () => {
    render(<Contracts {...defaultProps} />);
    expect(screen.getByText('Overview')).toBeInTheDocument();
  });

  it('displays status icons', () => {
    render(<Contracts {...defaultProps} />);
    const statusIcons = screen.getAllByRole('img');
    expect(statusIcons.length).toBeGreaterThan(0);
  });
});
