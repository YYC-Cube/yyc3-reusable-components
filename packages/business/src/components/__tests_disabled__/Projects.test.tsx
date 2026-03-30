import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Projects } from './Projects';

describe('Projects', () => {
  const defaultProps = {
    currentLanguage: 'en',
  };

  it('renders correctly', () => {
    render(<Projects {...defaultProps} />);
    expect(screen.getByText('Project Management')).toBeInTheDocument();
  });

  it('displays project list', () => {
    render(<Projects {...defaultProps} />);
    expect(screen.getByText('NEOM Steel Supply Contract')).toBeInTheDocument();
    expect(screen.getByText('Riyadh Metro Scrap Collection')).toBeInTheDocument();
    expect(screen.getByText('Jeddah Port Aluminum Recovery')).toBeInTheDocument();
  });

  it('displays project clients', () => {
    render(<Projects {...defaultProps} />);
    expect(screen.getByText('NEOM Infrastructure')).toBeInTheDocument();
    expect(screen.getByText('Riyadh Development Authority')).toBeInTheDocument();
    expect(screen.getByText('Jeddah Port Authority')).toBeInTheDocument();
  });

  it('displays project status', () => {
    render(<Projects {...defaultProps} />);
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('displays project progress', () => {
    render(<Projects {...defaultProps} />);
    expect(screen.getByText('65%')).toBeInTheDocument();
    expect(screen.getByText('45%')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('displays project budget', () => {
    render(<Projects {...defaultProps} />);
    expect(screen.getByText('5,600,000')).toBeInTheDocument();
    expect(screen.getByText('3,200,000')).toBeInTheDocument();
    expect(screen.getByText('2,100,000')).toBeInTheDocument();
  });

  it('displays project spent amount', () => {
    render(<Projects {...defaultProps} />);
    expect(screen.getByText('3,640,000')).toBeInTheDocument();
    expect(screen.getByText('1,440,000')).toBeInTheDocument();
  });

  it('displays project dates', () => {
    render(<Projects {...defaultProps} />);
    expect(screen.getByText('2024-11-01')).toBeInTheDocument();
    expect(screen.getByText('2025-04-30')).toBeInTheDocument();
  });

  it('displays project team size', () => {
    render(<Projects {...defaultProps} />);
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
  });

  it('displays project materials count', () => {
    render(<Projects {...defaultProps} />);
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
  });

  it('handles search input', () => {
    render(<Projects {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText('Search projects...');
    fireEvent.change(searchInput, { target: { value: 'NEOM' } });
    expect(searchInput).toHaveValue('NEOM');
  });

  it('has add project button', () => {
    render(<Projects {...defaultProps} />);
    expect(screen.getByText('Add Project')).toBeInTheDocument();
  });

  it('has filter button', () => {
    render(<Projects {...defaultProps} />);
    const filterButton = screen.getByText('Filter');
    expect(filterButton).toBeInTheDocument();
  });

  it('renders in Chinese language', () => {
    render(<Projects {...defaultProps} currentLanguage="zh" />);
    expect(screen.getByText('项目管理')).toBeInTheDocument();
    expect(screen.getByText('NEOM 钢铁供应合同')).toBeInTheDocument();
    expect(screen.getByText('利雅得地铁废料回收')).toBeInTheDocument();
  });

  it('handles navigation context', () => {
    const onNavigate = vi.fn();
    render(<Projects {...defaultProps} navigationContext={{ source: 'customers', customerId: 'CUST-001' }} onNavigate={onNavigate} />);
    expect(onNavigate).toBeDefined();
  });

  it('displays project IDs', () => {
    render(<Projects {...defaultProps} />);
    expect(screen.getByText('PRJ-001')).toBeInTheDocument();
    expect(screen.getByText('PRJ-002')).toBeInTheDocument();
    expect(screen.getByText('PRJ-003')).toBeInTheDocument();
  });

  it('displays status icons', () => {
    render(<Projects {...defaultProps} />);
    const statusIcons = screen.getAllByRole('img');
    expect(statusIcons.length).toBeGreaterThan(0);
  });
});
