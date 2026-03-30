import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Warehouse } from './Warehouse';

describe('Warehouse', () => {
  const defaultProps = {
    currentLanguage: 'en',
  };

  it('renders correctly', () => {
    render(<Warehouse {...defaultProps} />);
    expect(screen.getByText('Warehouse Management')).toBeInTheDocument();
  });

  it('displays warehouse list', () => {
    render(<Warehouse {...defaultProps} />);
    expect(screen.getByText('WH-RYD-001')).toBeInTheDocument();
    expect(screen.getByText('WH-JED-002')).toBeInTheDocument();
    expect(screen.getByText('WH-DAM-003')).toBeInTheDocument();
  });

  it('displays warehouse names', () => {
    render(<Warehouse {...defaultProps} />);
    expect(screen.getByText('Riyadh Main Warehouse')).toBeInTheDocument();
    expect(screen.getByText('Jeddah Storage Center')).toBeInTheDocument();
    expect(screen.getByText('Dammam Logistics Hub')).toBeInTheDocument();
  });

  it('displays locations', () => {
    render(<Warehouse {...defaultProps} />);
    expect(screen.getByText('Riyadh Industrial City')).toBeInTheDocument();
    expect(screen.getByText('Jeddah Industrial Zone')).toBeInTheDocument();
    expect(screen.getByText('Dammam Port Area')).toBeInTheDocument();
  });

  it('displays capacities', () => {
    render(<Warehouse {...defaultProps} />);
    expect(screen.getByText('50,000')).toBeInTheDocument();
    expect(screen.getByText('35,000')).toBeInTheDocument();
    expect(screen.getByText('40,000')).toBeInTheDocument();
  });

  it('displays occupied spaces', () => {
    render(<Warehouse {...defaultProps} />);
    expect(screen.getByText('38,500')).toBeInTheDocument();
    expect(screen.getByText('28,900')).toBeInTheDocument();
    expect(screen.getByText('31,200')).toBeInTheDocument();
  });

  it('displays utilization percentages', () => {
    render(<Warehouse {...defaultProps} />);
    expect(screen.getByText('77%')).toBeInTheDocument();
    expect(screen.getByText('83%')).toBeInTheDocument();
    expect(screen.getByText('78%')).toBeInTheDocument();
  });

  it('displays warehouse status', () => {
    render(<Warehouse {...defaultProps} />);
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Maintenance')).toBeInTheDocument();
  });

  it('displays zone counts', () => {
    render(<Warehouse {...defaultProps} />);
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('displays material counts', () => {
    render(<Warehouse {...defaultProps} />);
    expect(screen.getByText('45')).toBeInTheDocument();
    expect(screen.getByText('38')).toBeInTheDocument();
    expect(screen.getByText('52')).toBeInTheDocument();
  });

  it('handles search input', () => {
    render(<Warehouse {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText('Search warehouses...');
    fireEvent.change(searchInput, { target: { value: 'Riyadh' } });
    expect(searchInput).toHaveValue('Riyadh');
  });

  it('has add warehouse button', () => {
    render(<Warehouse {...defaultProps} />);
    expect(screen.getByText('Add Warehouse')).toBeInTheDocument();
  });

  it('has export button', () => {
    render(<Warehouse {...defaultProps} />);
    expect(screen.getByText('Export')).toBeInTheDocument();
  });

  it('renders in Chinese language', () => {
    render(<Warehouse {...defaultProps} currentLanguage="zh" />);
    expect(screen.getByText('仓库管理')).toBeInTheDocument();
    expect(screen.getByText('利雅得主仓库')).toBeInTheDocument();
    expect(screen.getByText('吉达仓储中心')).toBeInTheDocument();
  });

  it('displays warehouse statistics', () => {
    render(<Warehouse {...defaultProps} />);
    expect(screen.getByText('Total Capacity')).toBeInTheDocument();
    expect(screen.getByText('Total Occupied')).toBeInTheDocument();
    expect(screen.getByText('Average Utilization')).toBeInTheDocument();
  });

  it('has filter button', () => {
    render(<Warehouse {...defaultProps} />);
    const filterButton = screen.getByText('Filter');
    expect(filterButton).toBeInTheDocument();
  });

  it('displays status icons', () => {
    render(<Warehouse {...defaultProps} />);
    const statusIcons = screen.getAllByRole('img');
    expect(statusIcons.length).toBeGreaterThan(0);
  });

  it('displays utilization alerts', () => {
    render(<Warehouse {...defaultProps} />);
    expect(screen.getByText('High Utilization')).toBeInTheDocument();
  });
});
