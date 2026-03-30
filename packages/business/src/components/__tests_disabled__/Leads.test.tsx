import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Leads } from './Leads';

describe('Leads', () => {
  const defaultProps = {
    currentLanguage: 'en',
  };

  it('renders correctly', () => {
    render(<Leads {...defaultProps} />);
    expect(screen.getByText('Lead Management')).toBeInTheDocument();
  });

  it('displays lead pipeline', () => {
    render(<Leads {...defaultProps} />);
    expect(screen.getByText('Pipeline')).toBeInTheDocument();
  });

  it('displays lead stages', () => {
    render(<Leads {...defaultProps} />);
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByText('Contacted')).toBeInTheDocument();
    expect(screen.getByText('Qualified')).toBeInTheDocument();
    expect(screen.getByText('Proposal')).toBeInTheDocument();
    expect(screen.getByText('Negotiation')).toBeInTheDocument();
    expect(screen.getByText('Won')).toBeInTheDocument();
    expect(screen.getByText('Lost')).toBeInTheDocument();
  });

  it('displays lead list', () => {
    render(<Leads {...defaultProps} />);
    expect(screen.getByText('List')).toBeInTheDocument();
  });

  it('displays lead analytics', () => {
    render(<Leads {...defaultProps} />);
    expect(screen.getByText('Analytics')).toBeInTheDocument();
  });

  it('displays company names', () => {
    render(<Leads {...defaultProps} />);
    expect(screen.getByText(/Company/)).toBeInTheDocument();
  });

  it('displays contact information', () => {
    render(<Leads {...defaultProps} />);
    expect(screen.getByText(/Contact/)).toBeInTheDocument();
    expect(screen.getByText(/Phone/)).toBeInTheDocument();
    expect(screen.getByText(/Email/)).toBeInTheDocument();
  });

  it('displays lead sources', () => {
    render(<Leads {...defaultProps} />);
    expect(screen.getByText(/Source/)).toBeInTheDocument();
  });

  it('displays lead values', () => {
    render(<Leads {...defaultProps} />);
    expect(screen.getByText(/Value/)).toBeInTheDocument();
  });

  it('displays probability', () => {
    render(<Leads {...defaultProps} />);
    expect(screen.getByText(/Probability/)).toBeInTheDocument();
  });

  it('displays assignees', () => {
    render(<Leads {...defaultProps} />);
    expect(screen.getByText(/Assignee/)).toBeInTheDocument();
  });

  it('has add lead button', () => {
    render(<Leads {...defaultProps} />);
    expect(screen.getByText('Add Lead')).toBeInTheDocument();
  });

  it('handles search input', () => {
    render(<Leads {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText('Search leads...');
    fireEvent.change(searchInput, { target: { value: 'Company' } });
    expect(searchInput).toHaveValue('Company');
  });

  it('has export button', () => {
    render(<Leads {...defaultProps} />);
    expect(screen.getByText('Export')).toBeInTheDocument();
  });

  it('renders in Chinese language', () => {
    render(<Leads {...defaultProps} currentLanguage="zh" />);
    expect(screen.getByText('线索管理')).toBeInTheDocument();
    expect(screen.getByText('管道')).toBeInTheDocument();
    expect(screen.getByText('列表')).toBeInTheDocument();
  });

  it('displays lead statistics', () => {
    render(<Leads {...defaultProps} />);
    expect(screen.getByText('Total Leads')).toBeInTheDocument();
    expect(screen.getByText('Conversion Rate')).toBeInTheDocument();
  });

  it('has filter button', () => {
    render(<Leads {...defaultProps} />);
    const filterButton = screen.getByText('Filter');
    expect(filterButton).toBeInTheDocument();
  });

  it('displays activity timeline', () => {
    render(<Leads {...defaultProps} />);
    expect(screen.getByText(/Activity/)).toBeInTheDocument();
  });

  it('displays tags', () => {
    render(<Leads {...defaultProps} />);
    expect(screen.getByText(/Tags/)).toBeInTheDocument();
  });
});
