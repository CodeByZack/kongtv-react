import { render, fireEvent } from '@testing-library/react';
import ChipList, { YearChipList, AreaChipList } from '../src/components/ChipList';

describe('ChipList', () => {
  test('默认ChipList组件', () => {
    const mockClick = jest.fn();

    const renderResult = render(<ChipList onChange={mockClick} now="2020" />);

    expect(renderResult.getByText('年代：')).toBeInTheDocument();

    expect(renderResult.getAllByRole('button').length).toEqual(10);

    expect(renderResult.getByText('2020').parentElement).toHaveClass('MuiChip-outlinedDefault');

    expect(renderResult.getByText('2021').parentElement).not.toHaveClass('MuiChip-outlinedDefault');

    fireEvent.click(renderResult.getByText('2021'));

    expect(mockClick.mock.calls.length).toEqual(1);

    expect(mockClick.mock.calls[0][0]).toEqual('2021');
  });

  test('年份ChipList组件', () => {
    const mockClick = jest.fn();

    const renderResult = render(<YearChipList onChange={mockClick} nowShow="2020" />);

    expect(renderResult.getByText('年代：')).toBeInTheDocument();

    expect(renderResult.getAllByRole('button').length).toEqual(10);

    expect(renderResult.getByText('2020').parentElement).toHaveClass('MuiChip-outlinedDefault');

    expect(renderResult.getByText('2021').parentElement).not.toHaveClass('MuiChip-outlinedDefault');

    fireEvent.click(renderResult.getByText('2014'));

    expect(mockClick.mock.calls.length).toEqual(1);

    expect(mockClick.mock.calls[0][0]).toEqual('2014');
  });

  test('地区ChipList组件', () => {
    const mockClick = jest.fn();

    const renderResult = render(<AreaChipList onChange={mockClick} nowShow="大陆" />);

    expect(renderResult.getByText('地区：')).toBeInTheDocument();

    expect(renderResult.getAllByRole('button').length).toEqual(16);

    expect(renderResult.getByText('大陆').parentElement).toHaveClass('MuiChip-outlinedDefault');

    expect(renderResult.getByText('法国').parentElement).not.toHaveClass('MuiChip-outlinedDefault');

    fireEvent.click(renderResult.getByText('意大利'));

    expect(mockClick.mock.calls.length).toEqual(1);

    expect(mockClick.mock.calls[0][0]).toEqual('意大利');
  });
});
