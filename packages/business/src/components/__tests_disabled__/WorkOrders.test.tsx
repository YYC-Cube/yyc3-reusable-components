import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { WorkOrders } from './WorkOrders';

describe('WorkOrders', () => {
  const defaultProps = {
    currentLanguage: 'en',
  };

  it('renders correctly', () => {
    render(<WorkOrders {...defaultProps} />);
    expect(screen.getByText('Work Order Management')).toBeInTheDocument();
  });

  it('displays work order list', () => {
    render(<WorkOrders {...defaultProps} />);
    expect(screen.getByText(/WO-\d+/)).toBeInTheDocument();
  });

  it('displays work order titles', () => {
    render(<WorkOrders {...defaultProps} />);
    expect(screen.getByText(/Work Order/)).toBeInTheDocument();
  });

  it('displays work order status', () => {
    render(<WorkOrders {...defaultProps} />);
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Review')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('Cancelled')).toBeInTheDocument();
  });

  it('displays priority levels', () => {
    render(<WorkOrders {...defaultProps} />);
    expect(screen.getByText('Urgent')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Low')).toBeInTheDocument();
  });

  it('displays assignees', () => {
    render(<WorkOrders {...defaultProps} />);
    expect(screen.getByText(/Assignee/)).toBeInTheDocument();
  });

  it('displays departments', () => {
    render(<WorkOrders {...defaultProps} />);
    expect(screen.getByText(/Department/)).toBeInTheDocument();
  });

  it('displays due dates', () => {
    render(<WorkOrders {...defaultProps} />);
    expect(screen.getByText(/Due Date/)).toBeInTheDocument();
  });

  it('displays progress', () => {
    render(<WorkOrders {...defaultProps} />);
    expect(screen.getByText(/Progress/)).toBeInTheDocument();
  });

  it('displays tags', () => {
    render(<WorkOrders {...defaultProps} />);
    expect(screen.getByText(/Tags/)).toBeInTheDocument();
  });

  it('has board view', () => {
    render(<WorkOrders {...defaultProps} />);
    expect(screen.getByText('Board')).toBeInTheDocument();
  });

  it('has list view', () => {
    render(<WorkOrders {...defaultProps} />);
    expect(screen.getByText('List')).toBeInTheDocument();
  });

  it('has statistics view', () => {
    render(<WorkOrders {...defaultProps} />);
    expect(screen.getByText('Stats')).toBeInTheDocument();
  });

  it('has add work order button', () => {
    render(<WorkOrders {...defaultProps} />);
    expect(screen.getByText('Add Work Order')).toBeInTheDocument();
  });

  it('handles search input', () => {
    render(<WorkOrders {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText('Search work orders...');
    fireEvent.change(searchInput, { target: { value: 'Maintenance' } });
    expect(searchInput).toHaveValue('Maintenance');
  });

  it('renders in Chinese language', () => {
    render(<WorkOrders {...defaultProps} currentLanguage="zh" />);
    expect(screen.getByText('工单管理')).toBeInTheDocument();
  });

  it('displays work order statistics', () => {
    render(<WorkOrders {...defaultProps} />);
    expect(screen.getByText('Total Work Orders')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('has filter button', () => {
    render(<WorkOrders {...defaultProps} />);
    const filterButton = screen.getByText('Filter');
    expect(filterButton).toBeInTheDocument();
  });

  it('displays status icons', () => {
    render(<WorkOrders {...defaultProps} />);
    const statusIcons = screen.getAllByRole('img');
    expect(statusIcons.length).toBeGreaterThan(0);
  });

  it('displays action buttons', () => {
    render(<WorkOrders {...defaultProps} />);
    const actionButtons = screen.getAllByRole('button');
    expect(actionButtons.length).toBeGreaterThan(0);
  });
});
