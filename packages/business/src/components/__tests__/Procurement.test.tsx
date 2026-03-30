import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Procurement } from './Procurement';

describe('Procurement', () => {
  const defaultProps = {
    currentLanguage: 'en',
  };

  it('renders correctly', () => {
    render(<Procurement {...defaultProps} />);
    expect(screen.getByText('Procurement Management')).toBeInTheDocument();
  });

  it('displays purchase order list', () => {
    render(<Procurement {...defaultProps} />);
    expect(screen.getByText('PO-2025-089')).toBeInTheDocument();
    expect(screen.getByText('PO-2025-088')).toBeInTheDocument();
    expect(screen.getByText('PO-2025-087')).toBeInTheDocument();
  });

  it('displays supplier names', () => {
    render(<Procurement {...defaultProps} />);
    expect(screen.getByText('Global Metal Supply')).toBeInTheDocument();
    expect(screen.getByText('Asian Scrap Traders')).toBeInTheDocument();
    expect(screen.getByText('Eastern Metals Co.')).toBeInTheDocument();
  });

  it('displays material names', () => {
    render(<Procurement {...defaultProps} />);
    expect(screen.getByText('Steel Scrap')).toBeInTheDocument();
    expect(screen.getByText('Aluminum Scrap')).toBeInTheDocument();
    expect(screen.getByText('Copper Wire')).toBeInTheDocument();
  });

  it('displays quantities', () => {
    render(<Procurement {...defaultProps} />);
    expect(screen.getByText('45,000 kg')).toBeInTheDocument();
    expect(screen.getByText('30,000 kg')).toBeInTheDocument();
    expect(screen.getByText('12,000 kg')).toBeInTheDocument();
  });

  it('displays unit prices', () => {
    render(<Procurement {...defaultProps} />);
    expect(screen.getByText('2.80')).toBeInTheDocument();
    expect(screen.getByText('16.50')).toBeInTheDocument();
    expect(screen.getByText('68.50')).toBeInTheDocument();
  });

  it('displays total amounts', () => {
    render(<Procurement {...defaultProps} />);
    expect(screen.getByText('126,000')).toBeInTheDocument();
    expect(screen.getByText('495,000')).toBeInTheDocument();
    expect(screen.getByText('822,000')).toBeInTheDocument();
  });

  it('displays order dates', () => {
    render(<Procurement {...defaultProps} />);
    expect(screen.getByText('2025-02-01')).toBeInTheDocument();
    expect(screen.getByText('2025-01-30')).toBeInTheDocument();
    expect(screen.getByText('2025-01-28')).toBeInTheDocument();
  });

  it('displays expected delivery dates', () => {
    render(<Procurement {...defaultProps} />);
    expect(screen.getByText('2025-02-15')).toBeInTheDocument();
    expect(screen.getByText('2025-02-10')).toBeInTheDocument();
    expect(screen.getByText('2025-02-12')).toBeInTheDocument();
  });

  it('displays order status', () => {
    render(<Procurement {...defaultProps} />);
    expect(screen.getByText('Approved')).toBeInTheDocument();
    expect(screen.getByText('Delivered')).toBeInTheDocument();
    expect(screen.getByText('In Transit')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('displays priority levels', () => {
    render(<Procurement {...defaultProps} />);
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Low')).toBeInTheDocument();
  });

  it('handles search input', () => {
    render(<Procurement {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText('Search orders...');
    fireEvent.change(searchInput, { target: { value: 'PO-089' } });
    expect(searchInput).toHaveValue('PO-089');
  });

  it('has create PO button', () => {
    render(<Procurement {...defaultProps} />);
    expect(screen.getByText('Create PO')).toBeInTheDocument();
  });

  it('has export button', () => {
    render(<Procurement {...defaultProps} />);
    expect(screen.getByText('Export')).toBeInTheDocument();
  });

  it('renders in Chinese language', () => {
    render(<Procurement {...defaultProps} currentLanguage="zh" />);
    expect(screen.getByText('采购管理')).toBeInTheDocument();
    expect(screen.getByText('全球金属供应')).toBeInTheDocument();
    expect(screen.getByText('亚洲废料贸易')).toBeInTheDocument();
  });

  it('displays AI risk indicators', () => {
    render(<Procurement {...defaultProps} />);
    expect(screen.getByText('AI Risk')).toBeInTheDocument();
  });

  it('displays procurement trends chart', () => {
    render(<Procurement {...defaultProps} />);
    expect(screen.getByText('Procurement Trends')).toBeInTheDocument();
  });

  it('displays status icons', () => {
    render(<Procurement {...defaultProps} />);
    const statusIcons = screen.getAllByRole('img');
    expect(statusIcons.length).toBeGreaterThan(0);
  });

  it('has filter button', () => {
    render(<Procurement {...defaultProps} />);
    const filterButton = screen.getByText('Filter');
    expect(filterButton).toBeInTheDocument();
  });
});
