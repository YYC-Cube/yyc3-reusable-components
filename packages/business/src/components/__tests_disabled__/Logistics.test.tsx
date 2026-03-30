import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Logistics } from './Logistics';

describe('Logistics', () => {
  const defaultProps = {
    currentLanguage: 'en',
  };

  it('renders correctly', () => {
    render(<Logistics {...defaultProps} />);
    expect(screen.getByText('Logistics Management')).toBeInTheDocument();
  });

  it('displays shipment list', () => {
    render(<Logistics {...defaultProps} />);
    expect(screen.getByText('SHP-2025-001')).toBeInTheDocument();
    expect(screen.getByText('SHP-2025-002')).toBeInTheDocument();
    expect(screen.getByText('SHP-2025-003')).toBeInTheDocument();
  });

  it('displays origin locations', () => {
    render(<Logistics {...defaultProps} />);
    expect(screen.getByText('Shanghai Port')).toBeInTheDocument();
    expect(screen.getByText('Guangzhou Industrial')).toBeInTheDocument();
    expect(screen.getByText('Tokyo Port')).toBeInTheDocument();
  });

  it('displays destination locations', () => {
    render(<Logistics {...defaultProps} />);
    expect(screen.getByText('Beijing Warehouse')).toBeInTheDocument();
    expect(screen.getByText('Shenzhen Hub')).toBeInTheDocument();
    expect(screen.getByText('Shanghai Port')).toBeInTheDocument();
  });

  it('displays shipment status', () => {
    render(<Logistics {...defaultProps} />);
    expect(screen.getByText('In Transit')).toBeInTheDocument();
    expect(screen.getByText('Loading')).toBeInTheDocument();
    expect(screen.getByText('Customs')).toBeInTheDocument();
    expect(screen.getByText('Arrived')).toBeInTheDocument();
  });

  it('displays ETA', () => {
    render(<Logistics {...defaultProps} />);
    expect(screen.getByText('2h 15m')).toBeInTheDocument();
    expect(screen.getByText('5h 30m')).toBeInTheDocument();
    expect(screen.getByText('1d 4h')).toBeInTheDocument();
  });

  it('displays drivers', () => {
    render(<Logistics {...defaultProps} />);
    expect(screen.getByText('Li Wei')).toBeInTheDocument();
    expect(screen.getByText('Zhang Wei')).toBeInTheDocument();
    expect(screen.getByText('Global Logistics')).toBeInTheDocument();
  });

  it('displays cargo information', () => {
    render(<Logistics {...defaultProps} />);
    expect(screen.getByText('Steel Scrap (20T)')).toBeInTheDocument();
    expect(screen.getByText('Copper Wire (5T)')).toBeInTheDocument();
    expect(screen.getByText('Electronics Scrap')).toBeInTheDocument();
  });

  it('displays progress', () => {
    render(<Logistics {...defaultProps} />);
    expect(screen.getByText('75%')).toBeInTheDocument();
    expect(screen.getByText('10%')).toBeInTheDocument();
    expect(screen.getByText('40%')).toBeInTheDocument();
  });

  it('displays map view', () => {
    render(<Logistics {...defaultProps} />);
    expect(screen.getByText('Map View')).toBeInTheDocument();
  });

  it('has add shipment button', () => {
    render(<Logistics {...defaultProps} />);
    expect(screen.getByText('Add Shipment')).toBeInTheDocument();
  });

  it('handles search input', () => {
    render(<Logistics {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText('Search shipments...');
    fireEvent.change(searchInput, { target: { value: 'SHP-001' } });
    expect(searchInput).toHaveValue('SHP-001');
  });

  it('has export button', () => {
    render(<Logistics {...defaultProps} />);
    expect(screen.getByText('Export')).toBeInTheDocument();
  });

  it('renders in Chinese language', () => {
    render(<Logistics {...defaultProps} currentLanguage="zh" />);
    expect(screen.getByText('物流管理')).toBeInTheDocument();
    expect(screen.getByText('上海港')).toBeInTheDocument();
    expect(screen.getByText('北京中央仓库')).toBeInTheDocument();
  });

  it('displays logistics statistics', () => {
    render(<Logistics {...defaultProps} />);
    expect(screen.getByText('Total Shipments')).toBeInTheDocument();
    expect(screen.getByText('In Transit')).toBeInTheDocument();
    expect(screen.getByText('Delivered')).toBeInTheDocument();
  });

  it('has filter button', () => {
    render(<Logistics {...defaultProps} />);
    const filterButton = screen.getByText('Filter');
    expect(filterButton).toBeInTheDocument();
  });

  it('displays status icons', () => {
    render(<Logistics {...defaultProps} />);
    const statusIcons = screen.getAllByRole('img');
    expect(statusIcons.length).toBeGreaterThan(0);
  });

  it('displays route information', () => {
    render(<Logistics {...defaultProps} />);
    expect(screen.getByText(/Route/)).toBeInTheDocument();
  });
});
